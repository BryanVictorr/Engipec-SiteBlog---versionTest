/**
 * Componente PrivateRoute
 * Protege rotas que requerem autenticação,
 * redirecionando para a página de login se necessário.
 */

import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const PrivateRoute = ({ children, requireAdmin = false }: PrivateRouteProps) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se a rota requer admin e o usuário não é admin, redireciona para a área de funcionário
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/employee/articles" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 