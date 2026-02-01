from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import User, Vehicle, Service, ServiceRecord


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model - used for response data"""
    
    vehicles = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone', 'city', 'role', 'date_joined', 'vehicles']
        read_only_fields = ['id', 'date_joined']

    def get_vehicles(self, obj):
        return [{'license_plate': v.license_plate, 'vehicle_type': v.vehicle_type} for v in obj.vehicles.all()]

    def validate_name(self, value):
        """Check that the name is at least 2 characters long and contains only letters and spaces."""
        import re
        stripped_name = value.strip()
        if len(stripped_name) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        if not re.match(r'^[a-zA-Z\s]+$', stripped_name):
            raise serializers.ValidationError("Name should not contain numbers or special characters.")
        return stripped_name

    def validate_phone(self, value):
        """Basic phone number validation (digits and some separators)."""
        if value:
            import re
            clean_phone = re.sub(r'[\s\-\(\)]', '', value)
            if not clean_phone.isdigit():
                raise serializers.ValidationError("Phone number must contain only digits.")
            if len(clean_phone) < 10 or len(clean_phone) > 15:
                raise serializers.ValidationError("Phone number must be between 10 and 15 digits.")
        return value


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = User
        fields = ['email', 'name', 'phone', 'city', 'password', 'role']
        extra_kwargs = {
            'role': {'default': 'owner'},
            'phone': {'required': True, 'allow_blank': False},
            'city': {'required': True, 'allow_blank': False}
        }
    
    def validate_name(self, value):
        """Check that the name is at least 2 characters long and contains only letters and spaces."""
        import re
        stripped_name = value.strip()
        if len(stripped_name) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        if not re.match(r'^[a-zA-Z\s]+$', stripped_name):
            raise serializers.ValidationError("Name should not contain numbers or special characters.")
        return stripped_name

    def validate_phone(self, value):
        """Basic phone number validation (digits and some separators)."""
        if value:
            # Remove common separators
            import re
            clean_phone = re.sub(r'[\s\-\(\)]', '', value)
            if not clean_phone.isdigit():
                raise serializers.ValidationError("Phone number must contain only digits.")
            if len(clean_phone) < 10 or len(clean_phone) > 15:
                raise serializers.ValidationError("Phone number must be between 10 and 15 digits.")
        return value

    def validate_email(self, value):
        """Ensure email is unique and valid."""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email already exists.")
        return value.lower()
    
    def create(self, validated_data):
        """Create user with hashed password"""
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            phone=validated_data.get('phone', ''),
            city=validated_data.get('city', ''),
            role=validated_data.get('role', 'owner')
        )
        return user


class LoginSerializer(serializers.Serializer):
    """Serializer for user login"""
    
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )
    
    def validate(self, data):
        """Validate user credentials"""
        email = data.get('email')
        password = data.get('password')
        
        if email and password:
            # Authenticate user
            user = authenticate(
                request=self.context.get('request'),
                username=email,
                password=password
            )
            
            if not user:
                raise serializers.ValidationError(
                    "Invalid email or password.",
                    code='authorization'
                )
            
            if not user.is_active:
                raise serializers.ValidationError(
                    "User account is disabled.",
                    code='authorization'
                )
            
            data['user'] = user
        else:
            raise serializers.ValidationError(
                "Must include 'email' and 'password'.",
                code='authorization'
            )
        
        return data


class VehicleSerializer(serializers.ModelSerializer):
    """Serializer for Vehicle model"""
    owner_name = serializers.ReadOnlyField(source='owner.name')
    
    class Meta:
        model = Vehicle
        fields = ['id', 'license_plate', 'brand', 'model', 'vehicle_type', 'fuel_type', 'owner', 'owner_name', 'created_at']
        read_only_fields = ['id', 'created_at', 'owner']


class ServiceSerializer(serializers.ModelSerializer):
    """Serializer for Service (catalog) model"""
    
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'base_cost']
        read_only_fields = ['id']


class ServiceRecordSerializer(serializers.ModelSerializer):
    """Serializer for ServiceRecord model"""
    vehicle_plate = serializers.ReadOnlyField(source='vehicle.license_plate')
    vehicle_type = serializers.ReadOnlyField(source='vehicle.vehicle_type')
    service_name = serializers.ReadOnlyField(source='service.name')
    
    class Meta:
        model = ServiceRecord
        fields = [
            'id', 'vehicle', 'vehicle_plate', 'vehicle_type', 'service', 'service_name', 
            'date', 'kilometers', 'cost', 'notes', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
