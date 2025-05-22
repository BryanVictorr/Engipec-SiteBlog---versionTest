/**
 * Componente EmployeeNavbar
 * Barra de navegação para a área do funcionário
 * com links para artigos e perfil.
 */

import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { FileText, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const EmployeeNavbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-construction-800 text-white py-4">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
              <span className="text-construction-800 font-bold">E</span>
            </div>
            <span className="font-montserrat font-bold text-lg md:text-xl">
              Engipec
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/employee/articles" 
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                isActive("/employee/articles")
                  ? "bg-white/10"
                  : "hover:bg-white/5"
              )}
            >
              <FileText size={20} />
              <span>Artigos</span>
            </Link>

            <Link 
              to="/employee/profile" 
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                isActive("/employee/profile")
                  ? "bg-white/10"
                  : "hover:bg-white/5"
              )}
            >
              <User size={20} />
              <span>Perfil</span>
            </Link>

            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EmployeeNavbar; 