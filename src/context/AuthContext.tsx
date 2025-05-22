/**
 * Contexto de Autenticação
 * Gerencia o estado de autenticação do usuário
 * e fornece funções para login/logout.
 */

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipos
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'employee';
  phone?: string;
  position?: string;
  department?: string;
  imageSrc?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  employees: User[];
  addEmployee: (employee: Omit<User, 'id' | 'role'>) => void;
  updateEmployee: (id: number, data: Partial<User>) => void;
  removeEmployee: (id: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin padrão
const DEFAULT_ADMIN: User = {
  id: 1,
  name: 'Administrador',
  email: 'admin@engipec.com.br',
  password: 'admin123',
  role: 'admin'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [employees, setEmployees] = useState<User[]>(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  // Carregar funcionários do localStorage ao iniciar
  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  // Salvar funcionários no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const login = async (email: string, password: string) => {
    // Verificar admin
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      setUser(DEFAULT_ADMIN);
      localStorage.setItem('user', JSON.stringify(DEFAULT_ADMIN));
      return true;
    }

    // Verificar funcionários
    const employee = employees.find(emp => emp.email === email && emp.password === password);
    if (employee) {
      setUser(employee);
      localStorage.setItem('user', JSON.stringify(employee));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Se for um funcionário, atualizar também na lista de funcionários
      if (user.role === 'employee') {
        const updatedEmployees = employees.map(emp =>
          emp.id === user.id ? updatedUser : emp
        );
        setEmployees(updatedEmployees);
      }
    }
  };

  const addEmployee = (employeeData: Omit<User, 'id' | 'role'>) => {
    const newEmployee: User = {
      ...employeeData,
      id: employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 2,
      role: 'employee',
      imageSrc: `https://api.dicebear.com/7.x/avatars/svg?seed=${employeeData.email}`
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id: number, data: Partial<User>) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === id ? { ...emp, ...data } : emp
    );
    setEmployees(updatedEmployees);
  };

  const removeEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  // Recuperar usuário do localStorage ao recarregar a página
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    updateProfile,
    employees,
    addEmployee,
    updateEmployee,
    removeEmployee
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 