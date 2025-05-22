/**
 * Página de Gerenciamento de Artigos do Funcionário
 * Interface para criar, editar e excluir
 * artigos do blog.
 */

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "@/components/Footer";
import EmployeeLayout from "@/components/EmployeeLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/RichTextEditor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { FileText, Plus, Trash, Pencil, Search, Star } from "lucide-react";
import { useBlog } from "@/context/BlogContext";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(5, { message: "Título deve ter no mínimo 5 caracteres" }),
  excerpt: z.string().min(10, { message: "Resumo deve ter no mínimo 10 caracteres" }),
  content: z.string().min(30, { message: "Conteúdo deve ter no mínimo 30 caracteres" }),
  category: z.string().min(2, { message: "Categoria é obrigatória" }),
  imageSrc: z.string().min(1, { message: "Imagem é obrigatória" }),
  featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const EmployeeArticles = () => {
  const { articles, addArticle, removeArticle, updateArticle, categories, addCategory } = useBlog();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editingArticle, setEditingArticle] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      imageSrc: "",
      featured: false,
    },
  });

  useEffect(() => {
    if (!isEditMode) {
      form.reset({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        imageSrc: "",
        featured: false,
      });
      setSelectedImage(null);
      setEditingArticle(null);
    }
  }, [isEditMode, form]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      form.setValue("imageSrc", imageUrl);
    }
  };

  const onSubmit = (data: FormValues) => {
    if (isEditMode && editingArticle !== null) {
      updateArticle(editingArticle, {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        imageSrc: data.imageSrc,
        featured: data.featured,
        authorId: user?.id || 0,
        authorName: user?.name || "Funcionário"
      });

      toast.success("Artigo atualizado com sucesso!");
    } else {
      addArticle({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        imageSrc: data.imageSrc,
        featured: data.featured,
        authorId: user?.id || 0,
        authorName: user?.name || "Funcionário"
      });

      toast.success("Artigo criado com sucesso!");
    }
    
    form.reset();
    setSelectedImage(null);
    setIsDialogOpen(false);
    setIsEditMode(false);
  };

  const handleEdit = (article: any) => {
    setEditingArticle(article.id);
    setIsEditMode(true);
    
    form.reset({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      imageSrc: article.imageSrc || "",
      featured: article.featured,
    });
    
    setSelectedImage(article.imageSrc || null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    removeArticle(id);
    toast.success("Artigo removido com sucesso!");
    
    if (editingArticle === id) {
      setIsEditMode(false);
      setIsDialogOpen(false);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      form.setValue("category", newCategory.trim().toLowerCase());
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  // Filtra apenas os artigos do funcionário logado
  const employeeArticles = articles.filter(article => article.authorId === user?.id);

  // Filter articles safely
  const filteredArticles = employeeArticles.filter(article => {
    try {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
      const matchesFeatured = !showFeaturedOnly || article.featured;
      return matchesSearch && matchesCategory && matchesFeatured;
    } catch (error) {
      console.error('Error filtering article:', error);
      return false;
    }
  });

  return (
    <EmployeeLayout>
      <main className="flex-1 p-8">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Meus Artigos</h1>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                form.reset({
                  title: "",
                  excerpt: "",
                  content: "",
                  category: "",
                  imageSrc: "",
                  featured: false,
                });
                setSelectedImage(null);
                setEditingArticle(null);
                setIsEditMode(false);
              }
            }}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Artigo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[95vw] lg:max-w-[80vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {isEditMode ? "Editar Artigo" : "Criar Novo Artigo"}
                  </DialogTitle>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                    <div className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Título</FormLabel>
                              <FormControl>
                                <Input placeholder="Digite o título do artigo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="excerpt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Resumo</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Digite um breve resumo do artigo"
                                  className="resize-none h-[38px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-center mb-2">Conteúdo</FormLabel>
                            <FormControl>
                              <RichTextEditor 
                                content={field.value} 
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <div className="flex gap-2">
                              {!isAddingCategory ? (
                                <>
                                  <FormControl>
                                    <Select
                                      value={field.value}
                                      onValueChange={field.onChange}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione uma categoria" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {categories.map((category) => (
                                          <SelectItem 
                                            key={category} 
                                            value={category}
                                            className="hover:bg-blue-50 cursor-pointer"
                                          >
                                            {category}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsAddingCategory(true)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Input
                                    placeholder="Nova categoria"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                  />
                                  <Button
                                    type="button"
                                    onClick={() => setIsAddingCategory(false)}
                                    variant="outline"
                                  >
                                    Cancelar
                                  </Button>
                                  <Button
                                    type="button"
                                    onClick={handleAddCategory}
                                    className="bg-orange-500 hover:bg-orange-600"
                                  >
                                    Adicionar
                                  </Button>
                                </>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                            </FormControl>
                            <FormLabel className="!mt-0">Destacar artigo</FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <FormLabel className="flex items-center">
                          Imagem
                          <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormField
                          control={form.control}
                          name="imageSrc"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const imageUrl = URL.createObjectURL(file);
                                      setSelectedImage(imageUrl);
                                      field.onChange(imageUrl);
                                    }
                                  }}
                                  className="mt-1"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {selectedImage && (
                          <div className="mt-2 relative w-full h-[200px]">
                            <img
                              src={selectedImage}
                              alt="Preview"
                              className="rounded-md object-cover w-full h-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsDialogOpen(false);
                          form.reset();
                          setSelectedImage(null);
                          setEditingArticle(null);
                          setIsEditMode(false);
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                        {isEditMode ? "Atualizar" : "Criar"} Artigo
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar artigos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todas categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant={showFeaturedOnly ? "default" : "outline"}
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className={showFeaturedOnly ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Destacados
                </Button>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {article.imageSrc && (
                  <div className="relative h-48">
                    <img
                      src={article.imageSrc}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    {article.featured && (
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                          <Star className="mr-1 h-3 w-3" />
                          Destacado
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{article.category}</span>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 block">
                        Criado em: {article.createdAt}
                      </span>
                      {article.updatedAt && (
                        <span className="text-sm text-gray-500 block">
                          Atualizado em: {article.updatedAt}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(article)}
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
                            Tem certeza que deseja excluir o artigo "{article.title}"?
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
                              onClick={() => handleDelete(article.id)}
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

            {filteredArticles.length === 0 && (
              <div className="col-span-full">
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">Nenhum artigo encontrado</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm || selectedCategory || showFeaturedOnly
                      ? "Tente ajustar os filtros de busca"
                      : "Comece criando seu primeiro artigo"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </EmployeeLayout>
  );
};

export default EmployeeArticles; 