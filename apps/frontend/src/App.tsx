import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import AuthGuard from '@/auth/AuthGuard';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AppDetailPage = lazy(() => import('@/pages/AppDetailPage'));
const CitizenDevsPage = lazy(() => import('@/pages/CitizenDevsPage'));
const AdminLoginPage = lazy(() => import('@/pages/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-aegea-600 border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
        <Route path="/app/:slug" element={<PageLayout><AppDetailPage /></PageLayout>} />
        <Route path="/citizen-developers" element={<PageLayout><CitizenDevsPage /></PageLayout>} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/*"
          element={
            <AuthGuard requiredRole="ADMIN">
              <AdminDashboardPage />
            </AuthGuard>
          }
        />
      </Routes>
    </Suspense>
  );
}
