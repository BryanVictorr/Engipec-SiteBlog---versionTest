/**
 * Página de Login Unificada
 * Interface para autenticação de administrador e funcionários
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Mail, Lock, Building } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast.success("Login realizado com sucesso!");
        navigate("/admin");
      } else {
        toast.error("Credenciais inválidas");
      }
    } catch (error) {
      toast.error("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom max-w-md">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-construction-800 text-white p-8 text-center relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 opacity-10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
              
              <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 mb-4">
                <Building className="text-orange-400 w-8 h-8" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Bem-vindo</h1>
              <p className="text-gray-200">Acesse sua conta para continuar</p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="password"
                      placeholder="••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Entrando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Lock className="w-5 h-5" />
                      <span>Entrar</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Credenciais de teste:</p>
                <p className="font-medium">Admin: admin@engipec.com.br / admin123</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
