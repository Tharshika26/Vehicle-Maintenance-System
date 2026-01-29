from rest_framework import status, generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    RegisterSerializer, LoginSerializer, UserSerializer,
    VehicleSerializer, ServiceSerializer, ServiceRecordSerializer
)
from .models import User, Vehicle, Service, ServiceRecord


def get_tokens_for_user(user):
    """Generate JWT tokens for a user"""
    refresh = RefreshToken.for_user(user)
    
    # Add custom claims to the token
    refresh['email'] = user.email
    refresh['role'] = user.role
    
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterView(APIView):
    """
    POST /api/auth/register/
    
    Register a new user and return JWT tokens.
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            user_data = UserSerializer(user).data
            
            return Response({
                'user': user_data,
                'access': tokens['access'],
                'refresh': tokens['refresh']
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    POST /api/auth/login/
    
    Authenticate user and return JWT tokens.
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            tokens = get_tokens_for_user(user)
            user_data = UserSerializer(user).data
            
            return Response({
                'user': user_data,
                'access': tokens['access'],
                'refresh': tokens['refresh']
            }, status=status.HTTP_200_OK)
        
        # Return 401 for authentication failures
        if 'non_field_errors' in serializer.errors or any(
            error.code == 'authorization' for errors in serializer.errors.values() 
            for error in (errors if isinstance(errors, list) else [errors])
        ):
            return Response(
                {'detail': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(generics.RetrieveUpdateAPIView):
    """
    GET /api/auth/user/ - Retrieve profile
    PATCH /api/auth/user/ - Update profile
    
    Requires: Authorization: Bearer <access_token>
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class VehicleViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing vehicle instances.
    """
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter vehicles by owner if the user is not an admin."""
        user = self.request.user
        if user.role == 'admin':
            return Vehicle.objects.all()
        return Vehicle.objects.filter(owner=user)

    def perform_create(self, serializer):
        """Set the owner to the current user if not provided or if the user is not an admin."""
        if self.request.user.role != 'admin' or 'owner' not in self.request.data:
            serializer.save(owner=self.request.user)
        else:
            serializer.save()


class ServiceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing service instances.
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    
    def get_permissions(self):
        """Allow read-only for owners, full CRUD for admins."""
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated(), permissions.IsAdminUser()]


class ServiceRecordViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing service record instances.
    """
    queryset = ServiceRecord.objects.all()
    serializer_class = ServiceRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter records by vehicle owner if the user is not an admin."""
        user = self.request.user
        if user.role == 'admin':
            return ServiceRecord.objects.all()
        return ServiceRecord.objects.filter(vehicle__owner=user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    

class DashboardStatsView(APIView):
    """
    GET /api/dashboard/stats/
    
    Retrieve dashboard statistics for admin.
    """
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get(self, request):
        total_vehicles = Vehicle.objects.count()
        total_services = ServiceRecord.objects.count()
        
        # Get recent 5 service records
        recent_records = ServiceRecord.objects.order_by('-date')[:5]
        recent_data = ServiceRecordSerializer(recent_records, many=True).data
        
        return Response({
            'total_vehicles': total_vehicles,
            'total_services': total_services,
            'recent_activity': recent_data
        })


class ReportsStatsView(APIView):
    """
    GET /api/reports/stats/
    
    Retrieve aggregated data for reports charts.
    """
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get(self, request):
        from django.db.models import Sum, Count
        from django.db.models.functions import TruncMonth
        
        # 1. Monthly Revenue (Last 12 months)
        monthly_revenue = ServiceRecord.objects.annotate(
            month=TruncMonth('date')
        ).values('month').annotate(
            revenue=Sum('cost')
        ).order_by('month')
        
        # Format for frontend
        revenue_data = [
            {
                'name': item['month'].strftime('%b'), # Jan, Feb, etc.
                'revenue': item['revenue']
            }
            for item in monthly_revenue
        ]

        # 2. Service Type Distribution
        # Group by service name. If service is null (deleted), label as 'Unknown'
        service_distribution = ServiceRecord.objects.values(
            'service__name'
        ).annotate(
            count=Count('id')
        ).order_by('-count')
        
        distribution_data = [
            {
                'name': item['service__name'] if item['service__name'] else 'Other',
                'value': item['count']
            }
            for item in service_distribution
        ]
        
        return Response({
            'monthly_revenue': revenue_data,
            'service_distribution': distribution_data
        })


class RemindersView(APIView):
    """
    GET /api/reminders/
    
    Calculate and return service reminders (6 months after service date).
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        from datetime import timedelta
        user = request.user
        
        # Get service records for owner's vehicles
        records = ServiceRecord.objects.filter(vehicle__owner=user).select_related('vehicle', 'service')
        
        reminders = []
        for record in records:
            # Calculate due date: 6 months (182 days) after service date
            due_date = record.date + timedelta(days=182)
            
            # Formatting proximity/status
            # Triggered one day before (we'll show it as "Urgent" if due tomorrow or earlier)
            from django.utils import timezone
            today = timezone.now().date()
            days_remaining = (due_date - today).days
            
            status = "Upcoming"
            if days_remaining <= 1:
                status = "Urgent"
            elif days_remaining <= 7:
                status = "Pending"
            
            # The user wants to see it on the page. 
            # We'll return it if it's upcoming or very recently past?
            # For now, return all records that have a future due date.
            if due_date >= today:
                reminders.append({
                    'id': record.id,
                    'vehicle_number': record.vehicle.license_plate,
                    'vehicle_type': record.vehicle.vehicle_type,
                    'service_name': record.service.name if record.service else 'General Service',
                    'due_date': due_date.strftime('%Y-%m-%d'),
                    'status': status
                })
        
        # Sort by due date
        reminders.sort(key=lambda x: x['due_date'])
        
        return Response(reminders)


class OwnerDashboardStatsView(APIView):
    """
    GET /api/owner/dashboard/stats/
    
    Retrieve dashboard statistics for vehicle owners.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        from django.db.models import Sum
        from datetime import timedelta
        user = request.user
        
        # 1. Total Vehicles
        total_vehicles = Vehicle.objects.filter(owner=user).count()
        
        # 2. Next Service Date
        # Logic: latest service date + 6 months
        latest_record = ServiceRecord.objects.filter(vehicle__owner=user).order_by('-date').first()
        next_service_date = None
        if latest_record:
            next_service_date = latest_record.date + timedelta(days=182)
        
        # 3. Total Spent
        total_spent = ServiceRecord.objects.filter(vehicle__owner=user).aggregate(total=Sum('cost'))['total'] or 0.00
        
        # 4. Last expense
        last_expense = float(latest_record.cost) if latest_record else 0.00
        
        return Response({
            'total_vehicles': total_vehicles,
            'next_service_date': next_service_date.strftime('%Y-%m-%d') if next_service_date else None,
            'total_spent': float(total_spent),
            'last_expense': last_expense
        })

