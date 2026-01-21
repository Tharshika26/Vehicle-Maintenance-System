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


class UserDetailView(generics.RetrieveAPIView):
    """
    GET /api/auth/user/
    
    Retrieve authenticated user's information.
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
