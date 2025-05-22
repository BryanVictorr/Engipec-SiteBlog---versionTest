/**
 * Página de Perfil do Funcionário
 * Interface para funcionários gerenciarem suas informações
 * e visualizarem seus dados.
 */

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { 
  User, 
  Mail, 
  Phone,
  Building,
  Users as UsersIcon,
  Camera,
  Lock
} from "lucide-react";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmployeeLayout from "@/components/EmployeeLayout";
import { useAuth } from '@/context/AuthContext';
import { formatPhoneNumber } from "@/lib/utils";

// Schema para atualização do perfil
const profileFormSchema = z.object({
  name: z.string().min(3, { message: "Nome é obrigatório e deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "E-mail é obrigatório e deve ser válido" }),
  phone: z.string().optional(),
});

// Schema para alteração de senha
const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, { message: "Senha atual é obrigatória" }),
  newPassword: z.string().min(6, { message: "Nova senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "Confirmação de senha é obrigatória" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const EmployeeProfile = () => {
  const { user, updateProfile } = useAuth();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(user?.imageSrc || null);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    const formattedData = {
      ...data,
      phone: data.phone ? formatPhoneNumber(data.phone) : "",
    };
    updateProfile(formattedData);
    toast.success("Perfil atualizado com sucesso!");
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    if (data.currentPassword !== user?.password) {
      toast.error("Senha atual incorreta!");
      return;
    }
    
    try {
      await updateProfile({ password: data.newPassword });
      toast.success("Senha alterada com sucesso!");
      setIsPasswordDialogOpen(false);
      passwordForm.reset();
    } catch (error) {
      toast.error("Erro ao alterar a senha");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        updateProfile({ imageSrc: base64String });
        toast.success("Foto atualizada com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <EmployeeLayout>
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      {selectedImage ? (
                        <img 
                          src={selectedImage} 
                          alt={user?.name || ""} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <label 
                      htmlFor="photo-upload" 
                      className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md cursor-pointer hover:bg-gray-50"
                    >
                      <Camera className="h-4 w-4 text-gray-600" />
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user?.name || "Carregando..."}</h1>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {user?.position || ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <UsersIcon className="h-4 w-4" />
                        {user?.department || ""}
                      </span>
                    </div>
                  </div>
                </div>

                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input placeholder="Seu nome" className="pl-11" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input placeholder="seu.email@empresa.com" className="pl-11" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input 
                                  placeholder="(00) 00000-0000" 
                                  className="pl-11" 
                                  onChange={(e) => {
                                    const formatted = formatPhoneNumber(e.target.value);
                                    field.onChange(formatted);
                                  }}
                                  value={field.value}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <FormLabel>Cargo</FormLabel>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input 
                            value={user?.position || ""} 
                            className="pl-11 bg-gray-50" 
                            disabled 
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Cargo não pode ser alterado pelo funcionário
                        </p>
                      </div>

                      <div>
                        <FormLabel>Departamento</FormLabel>
                        <div className="relative">
                          <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input 
                            value={user?.department || ""} 
                            className="pl-11 bg-gray-50" 
                            disabled 
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Departamento não pode ser alterado pelo funcionário
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline">
                            <Lock className="mr-2 h-4 w-4" />
                            Alterar Senha
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Alterar Senha</DialogTitle>
                            <DialogDescription>
                              Preencha os campos abaixo para alterar sua senha.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <Form {...passwordForm}>
                            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                              <FormField
                                control={passwordForm.control}
                                name="currentPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Senha Atual</FormLabel>
                                    <FormControl>
                                      <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Nova Senha</FormLabel>
                                    <FormControl>
                                      <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Confirmar Nova Senha</FormLabel>
                                    <FormControl>
                                      <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="flex justify-end gap-3 mt-6">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    setIsPasswordDialogOpen(false);
                                    passwordForm.reset();
                                  }}
                                >
                                  Cancelar
                                </Button>
                                <Button type="submit">
                                  Salvar Nova Senha
                                </Button>
                              </div>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                      <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                        Salvar Alterações
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </EmployeeLayout>
  );
};

export default EmployeeProfile;