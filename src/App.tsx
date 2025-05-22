import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BlogProvider } from '@/context/BlogContext';
import { AuthProvider } from '@/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import ArticleDetail from '@/pages/ArticleDetail';
import Admin from '@/pages/Admin';
import AdminArticles from '@/pages/AdminArticles';
import AdminEmployees from '@/pages/AdminEmployees';
import EmployeeProfile from '@/pages/EmployeeProfile';
import EmployeeArticles from '@/pages/EmployeeArticles';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BlogProvider>
      <Router>
        <AuthProvider>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<ArticleDetail />} />
              <Route path="/login" element={<Login />} />
              
              {/* Rotas Administrativas */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute requireAdmin>
                    <Admin />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/articles"
                element={
                  <PrivateRoute requireAdmin>
                    <AdminArticles />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/employees"
                element={
                  <PrivateRoute requireAdmin>
                    <AdminEmployees />
                  </PrivateRoute>
                }
              />

              {/* Rotas de Funcionários */}
              <Route
                path="/employee/profile"
                element={
                  <PrivateRoute>
                    <EmployeeProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employee/articles"
                element={
                  <PrivateRoute>
                    <EmployeeArticles />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </Router>
    </BlogProvider>
  </QueryClientProvider>
);

export default App;
