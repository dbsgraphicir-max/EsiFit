import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import Landing from '@/pages/Landing';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import Dashboard from '@/pages/Dashboard';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <Landing />
                  </PublicLayout>
                }
              />

              {/* Auth routes (no navbar/footer) */}
              <Route
                path="/sign-in"
                element={
                  <AuthLayout>
                    <SignIn />
                  </AuthLayout>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <AuthLayout>
                    <SignUp />
                  </AuthLayout>
                }
              />

              {/* Dashboard (authenticated) */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
