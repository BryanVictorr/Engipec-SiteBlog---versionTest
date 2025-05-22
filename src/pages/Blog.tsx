/**
 * Página do Blog
 * Lista todos os artigos do blog com paginação
 * e filtros por categoria.
 */

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import FeaturedArticle from '@/components/FeaturedArticle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBlog } from '@/context/BlogContext';

const Blog = () => {
  const { articles, featuredArticle } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get all categories from articles
  const categories = Array.from(new Set(articles.map(article => article.category)));

  // Filter articles by search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Remove featured article from the regular list if it exists
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <>
      <Header />
      <main>
        {/* Blog Header */}
        <section className="bg-construction-800 text-white py-12">
          <div className="container-custom">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog da Construção</h1>
              <p className="text-xl text-gray-200 max-w-2xl">
                Dicas, novidades e conhecimento técnico sobre construção e reforma
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="py-8">
            <div className="container-custom">
              <FeaturedArticle 
                id={featuredArticle.id}
                title={featuredArticle.title}
                excerpt={featuredArticle.excerpt}
                date={featuredArticle.createdAt}
                imageSrc={featuredArticle.imageSrc || "https://images.unsplash.com/photo-1487958449943-2429e8be8625"}
                category={featuredArticle.category}
              />
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="py-8 bg-gray-50">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <Input
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="">Todas as categorias</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                variant="outline"
              >
                Limpar filtros
              </Button>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.length > 0 ? (
                regularArticles.map(article => (
                  <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    date={article.createdAt}
                    imageSrc={article.imageSrc}
                    category={article.category}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <h3 className="text-2xl font-semibold mb-2">Nenhum artigo encontrado</h3>
                  <p className="text-gray-600">
                    Tente ajustar seus filtros de busca para encontrar o que procura.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
