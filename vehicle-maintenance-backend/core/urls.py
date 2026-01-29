from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    VehicleViewSet, ServiceViewSet, ServiceRecordViewSet, UserViewSet,
    DashboardStatsView, ReportsStatsView, RemindersView, OwnerDashboardStatsView,
    RegisterView, LoginView, UserDetailView
)

router = DefaultRouter()
router.register(r'vehicles', VehicleViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'service-records', ServiceRecordViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/user/', UserDetailView.as_view(), name='user-detail'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('dashboard/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('reports/stats/', ReportsStatsView.as_view(), name='reports-stats'),
    path('reminders/', RemindersView.as_view(), name='reminders'),
    path('owner/dashboard/stats/', OwnerDashboardStatsView.as_view(), name='owner-dashboard-stats'),
]
