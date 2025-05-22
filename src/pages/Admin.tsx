/**
 * Página de Administração
 * Dashboard principal com visão geral do sistema.
 */

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { Mail, Phone, User, UserPlus, Lock } from "lucide-react";
import { useBlog } from "@/context/BlogContext";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const employeeFormSchema = z.object({
  name: z.string().min(3, { message: "Nome é obrigatório e deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "E-mail é obrigatório e deve ser válido" }),
  password: z.string().min(6, { message: "Senha é obrigatória e deve ter pelo menos 6 caracteres" }),
  phone: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

const Admin = () => {
  const { articles } = useBlog();
  const { employees } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Calculate stats
  const totalArticles = articles.length;
  const totalEmployees = employees.length;
  const featuredArticles = articles.filter(article => article.featured).length;

  return (
    <>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  Bem-vindo ao painel de administração
                </span>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total de artigos</p>
                    <h3 className="text-3xl font-bold text-construction-800 mt-1">{totalArticles}</h3>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    {featuredArticles} artigos em destaque
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Funcionários</p>
                    <h3 className="text-3xl font-bold text-construction-800 mt-1">{totalEmployees}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    {employees.length === 0 
                      ? "Nenhum funcionário cadastrado" 
                      : `Em ${new Set(employees.map(e => e.department)).size} departamentos diferentes`
                    }
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Categorias</p>
                    <h3 className="text-3xl font-bold text-construction-800 mt-1">
                      {new Set(articles.map(a => a.category)).size}
                    </h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Distribuídas em {totalArticles} artigos
                  </p>
                </div>
              </div>
            </div>
            
            {/* Add Employee Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-md border border-gray-100">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-construction-800">Funcionários Recentes</h2>
                    <Button variant="outline" asChild>
                      <Link to="/admin/employees">
                        Ver todos os funcionários
                      </Link>
                      </Button>
                  </div>
                  
                  <div className="p-6">
                    <ul className="divide-y divide-gray-100">
                      {employees.slice(-3).reverse().map((employee) => (
                        <li key={employee.id} className="py-4">
                          <div className="flex gap-4 items-center">
                            <img 
                              src={employee.imageSrc} 
                              alt={employee.name} 
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-medium text-gray-900">{employee.name}</h3>
                              <div className="text-sm text-gray-600">{employee.position} · {employee.department}</div>
                              <div className="mt-1 flex text-xs text-gray-500">
                                <span className="mr-4 flex items-center">
                                  <Mail className="mr-1 h-3 w-3" />
                                  {employee.email}
                                </span>
                                <span className="flex items-center">
                                  <Phone className="mr-1 h-3 w-3" />
                                  {employee.phone}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                      
                      {employees.length === 0 && (
                        <li className="py-8 px-4 text-center">
                          <p className="text-gray-500">Nenhum funcionário cadastrado ainda</p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Articles */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-construction-800">Artigos Recentes</h2>
              </div>
              
              <div className="p-6">
                <ul className="divide-y divide-gray-100">
                  {articles.slice(0, 5).map((article) => (
                    <li key={article.id} className="py-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{article.title}</h3>
                        <div className="flex justify-between mt-1">
                          <div className="text-xs text-gray-500">
                            <span>Criado em: {article.createdAt}</span>
                            {article.updatedAt && (
                              <span className="ml-2">· Atualizado em: {article.updatedAt}</span>
                            )}
                            <span className="ml-2">· {article.category}</span>
                          </div>
                          {article.featured && (
                            <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                              Destacado
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                  
                  {articles.length === 0 && (
                    <li className="py-8 px-4 text-center">
                      <p className="text-gray-500">Nenhum artigo publicado ainda</p>
                    </li>
                  )}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                  <Button variant="link" asChild>
                    <a href="/admin/articles">Gerenciar artigos</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
