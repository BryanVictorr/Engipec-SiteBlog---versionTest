/**
 * Página de Gerenciamento de Funcionários
 * Interface para gerenciar informações
 * dos funcionários da empresa.
 */

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Mail, Phone, Trash, User, UserPlus, Plus, Lock, Pencil, Search, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatPhoneNumber, unformatPhoneNumber } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  phone: z.string().optional(),
  position: z.string().min(2, { message: "Cargo é obrigatório" }),
  department: z.string().min(2, { message: "Departamento é obrigatório" }),
});

type FormValues = z.infer<typeof formSchema>;

const AdminEmployees = () => {
  const { employees, addEmployee, updateEmployee, removeEmployee } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [positions, setPositions] = useState<string[]>(() => {
    const saved = localStorage.getItem('positions');
    return saved ? JSON.parse(saved) : ['Engenheiro Civil', 'Arquiteto', 'Técnico'];
  });
  const [departments, setDepartments] = useState<string[]>(() => {
    const saved = localStorage.getItem('departments');
    return saved ? JSON.parse(saved) : ['Projetos', 'Obras', 'Administrativo'];
  });
  const [selectedPosition, setSelectedPosition] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [isAddingPosition, setIsAddingPosition] = useState(false);
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [newPosition, setNewPosition] = useState("");
  const [newDepartment, setNewDepartment] = useState("");

  // Salvar cargos e departamentos no localStorage
  useEffect(() => {
    localStorage.setItem('positions', JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      position: "",
      department: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (isEditMode && editingEmployee !== null) {
      updateEmployee(editingEmployee, {
        ...data,
        phone: data.phone ? formatPhoneNumber(data.phone) : "",
      });
      toast.success("Funcionário atualizado com sucesso!");
    } else {
      const newEmployee = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone ? formatPhoneNumber(data.phone) : "",
        position: data.position,
        department: data.department,
      };
      addEmployee(newEmployee);
      toast.success("Funcionário criado com sucesso!");
    }
    
    form.reset();
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingEmployee(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    form.setValue("phone", formatted);
  };

  const handleAddPosition = () => {
    if (newPosition.trim() && !positions.includes(newPosition.trim())) {
      setPositions([...positions, newPosition.trim()]);
      form.setValue("position", newPosition.trim());
      setNewPosition("");
      setIsAddingPosition(false);
    }
  };

  const handleAddDepartment = () => {
    if (newDepartment.trim() && !departments.includes(newDepartment.trim())) {
      setDepartments([...departments, newDepartment.trim()]);
      form.setValue("department", newDepartment.trim());
      setNewDepartment("");
      setIsAddingDepartment(false);
    }
  };

  const handleEdit = (employee: any) => {
    setEditingEmployee(employee.id);
    setIsEditMode(true);
    
    form.reset({
      name: employee.name,
      email: employee.email,
      password: employee.password,
      phone: employee.phone || "",
      position: employee.position || "",
      department: employee.department || "",
    });
    
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    removeEmployee(id);
    toast.success("Funcionário removido com sucesso!");
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPosition = selectedPosition === "all" || employee.position === selectedPosition;
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
    
    return matchesSearch && matchesPosition && matchesDepartment;
  });

  return (
    <>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Gerenciar Funcionários</h1>
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) {
                  form.reset();
                  setEditingEmployee(null);
                  setIsEditMode(false);
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Funcionário
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {isEditMode ? "Editar Funcionário" : "Criar Novo Funcionário"}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome completo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@exemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(00) 00000-0000" 
                                onChange={handlePhoneChange}
                                value={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cargo</FormLabel>
                            <div className="space-y-2">
                              {!isAddingPosition ? (
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione um cargo" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {positions.map((pos) => (
                                      <SelectItem key={pos} value={pos}>
                                        {pos}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="Novo cargo"
                                    value={newPosition}
                                    onChange={(e) => setNewPosition(e.target.value)}
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleAddPosition}
                                  >
                                    Adicionar
                                  </Button>
                                </div>
                              )}
                              <Button
                                type="button"
                                variant="ghost"
                                className="text-sm"
                                onClick={() => setIsAddingPosition(!isAddingPosition)}
                              >
                                {isAddingPosition ? "Cancelar" : "Adicionar novo cargo"}
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Departamento</FormLabel>
                            <div className="space-y-2">
                              {!isAddingDepartment ? (
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione um departamento" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {departments.map((dep) => (
                                      <SelectItem key={dep} value={dep}>
                                        {dep}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="Novo departamento"
                                    value={newDepartment}
                                    onChange={(e) => setNewDepartment(e.target.value)}
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleAddDepartment}
                                  >
                                    Adicionar
                                  </Button>
                                </div>
                              )}
                              <Button
                                type="button"
                                variant="ghost"
                                className="text-sm"
                                onClick={() => setIsAddingDepartment(!isAddingDepartment)}
                              >
                                {isAddingDepartment ? "Cancelar" : "Adicionar novo departamento"}
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsDialogOpen(false);
                            form.reset();
                            setEditingEmployee(null);
                            setIsEditMode(false);
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                          {isEditMode ? "Atualizar" : "Criar"} Funcionário
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar funcionários..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrar por cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os cargos</SelectItem>
                        {positions.map((pos) => (
                          <SelectItem key={pos} value={pos}>
                            {pos}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrar por departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os departamentos</SelectItem>
                        {departments.map((dep) => (
                          <SelectItem key={dep} value={dep}>
                            {dep}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Employees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {employee.imageSrc ? (
                        <img 
                          src={employee.imageSrc} 
                          alt={employee.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-orange-600" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold">{employee.name}</h3>
                        <p className="text-sm text-gray-500">{employee.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {employee.phone && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Telefone:</span> {employee.phone}
                        </p>
                      )}
                      {employee.position && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Cargo:</span> {employee.position}
                        </p>
                      )}
                      {employee.department && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Departamento:</span> {employee.department}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(employee)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirmar exclusão</DialogTitle>
                            <DialogDescription>
                              Tem certeza que deseja excluir o funcionário "{employee.name}"?
                              Esta ação não pode ser desfeita.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end gap-3 mt-4">
                            <DialogClose asChild>
                              <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(employee.id)}
                              >
                                Excluir
                              </Button>
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}

              {filteredEmployees.length === 0 && (
                <div className="col-span-full">
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <User className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Nenhum funcionário encontrado</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm
                        ? "Tente ajustar os termos da busca"
                        : "Comece adicionando seu primeiro funcionário"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminEmployees;
