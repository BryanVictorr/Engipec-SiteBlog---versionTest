import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageSrc: string;
  featured: boolean;
  createdAt: string;
  updatedAt?: string;
  authorId: number;
  authorName: string;
}

interface BlogContextType {
  articles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'createdAt'>) => void;
  removeArticle: (id: number) => void;
  updateArticle: (id: number, article: Omit<Article, 'id' | 'createdAt'>) => void;
  getArticleById: (id: number) => Article | undefined;
  featuredArticle: Article | undefined;
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}

// Sample blog data
const sampleArticles: Article[] = [];

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>(sampleArticles);
  const [categories, setCategories] = useState<string[]>(() => {
    // Inicializar categorias únicas a partir dos artigos existentes
    const uniqueCategories = Array.from(
      new Set(sampleArticles.map(article => article.category.toLowerCase()))
    );
    return uniqueCategories;
  });

  // Atualiza o artigo em destaque sempre que os artigos mudarem
  const [featuredArticle, setFeaturedArticle] = useState<Article | undefined>(
    articles.find((article) => article.featured)
  );

  useEffect(() => {
    const featured = articles.find((article) => article.featured);
    setFeaturedArticle(featured);
  }, [articles]);

  // Função para ordenar artigos por data mais recente
  const sortArticlesByDate = (articlesToSort: Article[]) => {
    return [...articlesToSort].sort((a, b) => {
      const [diaA, mesA, anoA] = a.createdAt.split('/');
      const [diaB, mesB, anoB] = b.createdAt.split('/');
      const dateA = new Date(Number(anoA), Number(mesA) - 1, Number(diaA));
      const dateB = new Date(Number(anoB), Number(mesB) - 1, Number(diaB));
      return dateB.getTime() - dateA.getTime();
    });
  };

  console.log('BlogContext - Current articles:', articles);

  const addArticle = (article: Omit<Article, 'id' | 'createdAt'>) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Normaliza a categoria antes de adicionar
    const normalizedCategory = article.category.trim();
    const capitalizedCategory = normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1).toLowerCase();

    const newArticle = {
      ...article,
      id: articles.length ? Math.max(...articles.map(a => a.id)) + 1 : 1,
      createdAt: formattedDate,
      category: capitalizedCategory
    };

    // Se o novo artigo for destacado, remove o destaque dos outros
    if (article.featured) {
      setArticles(prevArticles => 
        sortArticlesByDate(
          prevArticles.map(a => ({ ...a, featured: false }))
        )
      );
    }

    setArticles(prevArticles => sortArticlesByDate([...prevArticles, newArticle]));
    
    // Adiciona a categoria se ela não existir
    if (!categories.includes(capitalizedCategory)) {
      setCategories(prev => [...prev, capitalizedCategory]);
    }

    if (article.featured) {
      setFeaturedArticle(newArticle);
    }
  };

  const removeArticle = (id: number) => {
    setArticles(prevArticles => sortArticlesByDate(prevArticles.filter(article => article.id !== id)));
  };

  const updateArticle = (id: number, updatedArticle: Omit<Article, 'id' | 'createdAt'>) => {
    setArticles(prevArticles => {
      const existingArticle = prevArticles.find(a => a.id === id);
      if (!existingArticle) return prevArticles;

      // Normaliza a categoria antes de atualizar
      const normalizedCategory = updatedArticle.category.trim();
      const capitalizedCategory = normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1).toLowerCase();

      const hasContentChanged = 
        existingArticle.title !== updatedArticle.title ||
        existingArticle.excerpt !== updatedArticle.excerpt ||
        existingArticle.content !== updatedArticle.content ||
        existingArticle.category !== capitalizedCategory;

      const today = new Date();
      const formattedDate = today.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      // Se o artigo atualizado for destacado, remove o destaque dos outros
      if (updatedArticle.featured) {
        prevArticles = prevArticles.map(a => ({ ...a, featured: false }));
      }

      // Adiciona a nova categoria se ela não existir
      if (!categories.includes(capitalizedCategory)) {
        setCategories(prev => [...prev, capitalizedCategory]);
      }

      return sortArticlesByDate(
        prevArticles.map(article => 
          article.id === id
            ? {
                ...article,
                ...updatedArticle,
                category: capitalizedCategory,
                createdAt: article.createdAt,
                updatedAt: hasContentChanged ? formattedDate : article.updatedAt
              }
            : article
        )
      );
    });
  };

  // Inicializar os artigos ordenados
  useEffect(() => {
    setArticles(sortArticlesByDate(articles));
  }, []);

  const getArticleById = (id: number) => {
    return articles.find(article => article.id === id);
  };

  const addCategory = (category: string) => {
    const normalizedCategory = category.trim();
    const capitalizedCategory = normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1).toLowerCase();
    if (!categories.includes(capitalizedCategory)) {
      setCategories(prev => [...prev, capitalizedCategory]);
    }
  };

  const removeCategory = (category: string) => {
    setCategories(prev => prev.filter(cat => cat !== category));
  };

  const value = {
    articles,
    addArticle,
    removeArticle,
    updateArticle,
    getArticleById,
    featuredArticle,
    categories,
    addCategory,
    removeCategory,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
