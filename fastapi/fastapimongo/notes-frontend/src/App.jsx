import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { SearchProvider } from './SearchContext';
import Navbar from './components/Navbar';
import NotesPage from './components/NotesPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Breadcrumb from './components/Breadcrumb';

function AppContent() {
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const breadcrumbItems = pathnames.map((value, index) => {
      const link = `/${pathnames.slice(0, index + 1).join('/')}`;
      return { name: value.charAt(0).toUpperCase() + value.slice(1), link };
    });

    return [{ name: 'Home', link: '/' }, ...breadcrumbItems];
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar />
      <Breadcrumb items={getBreadcrumbItems()} />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <ProfileEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupForm />
              </PublicRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <AppContent />
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
