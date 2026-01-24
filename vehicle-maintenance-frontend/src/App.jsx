import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ServiceRecords from './pages/admin/ServiceRecords';
import AdminReports from './pages/admin/Reports';
import Services from './pages/admin/Services';
import Owners from './pages/admin/Owners';

// Owner Pages
import OwnerDashboard from './pages/owner/Dashboard';
import Vehicles from './pages/owner/Vehicles';
import AddVehicle from './pages/owner/AddVehicle';
import ServiceHistory from './pages/owner/ServiceHistory';
import Reminders from './pages/owner/Reminders';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Wrap authenticated routes in the DashboardLayout */}
                <Route element={<DashboardLayout />}>
                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/service-records" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ServiceRecords />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/reports" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminReports />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/services" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Services />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/owners" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Owners />
                        </ProtectedRoute>
                    } />

                    {/* Owner Routes */}
                    <Route path="/owner/dashboard" element={
                        <ProtectedRoute allowedRoles={['owner']}>
                            <OwnerDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/owner/vehicles" element={
                        <ProtectedRoute allowedRoles={['owner']}>
                            <Vehicles />
                        </ProtectedRoute>
                    } />
                    <Route path="/owner/add-vehicle" element={
                        <ProtectedRoute allowedRoles={['owner']}>
                            <AddVehicle />
                        </ProtectedRoute>
                    } />
                    <Route path="/owner/service-history" element={
                        <ProtectedRoute allowedRoles={['owner']}>
                            <ServiceHistory />
                        </ProtectedRoute>
                    } />
                    <Route path="/owner/reminders" element={
                        <ProtectedRoute allowedRoles={['owner']}>
                            <Reminders />
                        </ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
