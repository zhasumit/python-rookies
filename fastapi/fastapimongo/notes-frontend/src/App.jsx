// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { SearchProvider } from './SearchContext';
import Navbar from './components/Navbar';
import NotesPage from './components/NotesPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Navbar />
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
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
