from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    """Custom user manager for email-based authentication"""
    
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a regular user with email and password"""
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Automatically hashes the password
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser with admin privileges"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom User model with email as the unique identifier.
    Matches frontend registration form fields exactly.
    """
    
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('owner', 'Owner'),
    )
    
    email = models.EmailField(unique=True, db_index=True, max_length=191)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='owner')
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-date_joined']
    
    def __str__(self):
        return self.email
    
    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name


class Vehicle(models.Model):
    """Model representing a vehicle owned by a user."""
    license_plate = models.CharField(max_length=20, unique=True)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    VEHICLE_TYPES = (
        ('Car', 'Car'),
        ('Bike', 'Bike'),
        ('Van', 'Van'),
    )
    vehicle_type = models.CharField(max_length=10, choices=VEHICLE_TYPES, default='Car')
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vehicles')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'vehicles'

    def __str__(self):
        return f"{self.license_plate} ({self.brand} {self.model})"


class Service(models.Model):
    """Model representing a type of service (e.g., Oil Change, Brake Inspection)."""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    base_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    class Meta:
        db_table = 'services'

    def __str__(self):
        return self.name


class ServiceRecord(models.Model):
    """Model representing an actual service performed on a vehicle."""
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='service_records')
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, related_name='records')
    date = models.DateField()
    kilometers = models.IntegerField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'service_records'
        ordering = ['-date']

    def __str__(self):
        return f"{self.vehicle.license_plate} - {self.service.name if self.service else 'General'} on {self.date}"
