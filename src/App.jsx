import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import { initializeStorageData } from './lib/storage';

// Page Imports (to be created)
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Custom Private Route
const PrivateRoute = ({ children, roleRequired }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth" />;
  if (roleRequired && user.role !== roleRequired) return <Navigate to="/" />;

  return children;
};

function App() {
  useEffect(() => {
    // Seed the mock database on first load
    initializeStorageData();
  }, []);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        {/* Student Routes */}
        <Route path="/student/*" element={
          <PrivateRoute roleRequired="student">
            <StudentDashboard />
          </PrivateRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <PrivateRoute roleRequired="admin">
            <AdminDashboard />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
