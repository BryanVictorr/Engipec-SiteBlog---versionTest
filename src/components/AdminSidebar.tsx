import { Link, useLocation } from "react-router-dom";
import { FileText, Home, LogOut, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "./ui/sonner";

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    // In a real app, you would handle logout logic here
  };

  return (
    <aside className="w-64 bg-construction-800 text-white min-h-full p-6 hidden md:block">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Painel Admin</h2>
          <p className="text-sm text-gray-300 mt-1">Gerencie seu conteúdo</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link 
            to="/admin" 
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive("/admin") && !isActive("/admin/articles") && !isActive("/admin/employees")
                ? "bg-white/10 text-white"
                : "text-gray-300 hover:bg-white/5 hover:text-white"
            )}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/admin/articles" 
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive("/admin/articles")
                ? "bg-white/10 text-white"
                : "text-gray-300 hover:bg-white/5 hover:text-white"
            )}
          >
            <FileText size={20} />
            <span>Artigos</span>
          </Link>
          
          <Link 
            to="/admin/employees" 
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive("/admin/employees")
                ? "bg-white/10 text-white"
                : "text-gray-300 hover:bg-white/5 hover:text-white"
            )}
          >
            <Users size={20} />
            <span>Funcionários</span>
          </Link>

          <Link to="/login">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 mt-2"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
