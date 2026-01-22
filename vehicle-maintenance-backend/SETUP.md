# Backend Authentication System - Quick Start Guide

## Prerequisites
- Python 3.8+ installed
- MySQL Server running
- pip package manager

## Step-by-Step Setup

### 1. Navigate to Backend Directory
```bash
cd d:\Vehicle-Maintenance-System\vehicle-maintenance-backend
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
Edit `.env` file and update your database password:
```env
DB_PASSWORD=your_mysql_password_here
```

### 4. Create Database

**Windows PowerShell:**
```powershell
# Start MySQL and create database
# Option 1: Use MySQL Workbench GUI
# Option 2: Use command line (if mysql is in PATH):
mysql -u root -p -e "CREATE DATABASE vehicle_maintenance CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

**Alternative: Create database manually**
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Run this SQL:
   ```sql
   CREATE DATABASE vehicle_maintenance CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
   > **Note:** We use `utf8mb4` to support full Unicode characters. Ensure your MySQL server supports this.

### 5. Run Database Migrations
```bash
python manage.py migrate
```

### 6. Create Admin User (Optional)
```bash
python manage.py createsuperuser
```
Enter email and password when prompted.

### 7. Start Development Server
```bash
python manage.py runserver
```

Server will be available at: http://localhost:8000

## Quick Test

### Test Registration
```bash
curl -X POST http://localhost:8000/api/auth/register/ -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"TestPass123!\",\"role\":\"owner\"}"
```

### Test Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"TestPass123!\"}"
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register/` | POST | Register new user |
| `/api/auth/login/` | POST | Login user |
| `/api/auth/user/` | GET | Get current user (requires auth) |
| `/api/auth/token/refresh/` | POST | Refresh access token |
| `/admin/` | GET | Django admin panel |

## Troubleshooting

**Database Error:**
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists

**Module Not Found:**
```bash
pip install -r requirements.txt
```

**Port Already in Use:**
```bash
python manage.py runserver 8001
```

## Next Steps
1. ✅ Backend is ready
2. 📱 Update frontend to integrate with API
3. 🧪 Test end-to-end authentication flow

For detailed information, see `walkthrough.md`.
