/**
 * Página de Detalhes do Artigo
 * Exibe o conteúdo completo de um artigo específico
 * com navegação para artigos relacionados.
 */

import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useBlog } from '@/context/BlogContext';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getArticleById, articles } = useBlog();
  
  const article = getArticleById(Number(id));
  
  // Get related articles (same category, excluding current)
  const relatedArticles = article ? articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3) : [];

  if (!article) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-16">
          <div className="container-custom">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">Artigo não encontrado</h1>
              <p className="text-gray-600 mb-6">O artigo que você está procurando não existe ou foi removido.</p>
              <Button asChild>
                <Link to="/blog">Voltar ao Blog</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {/* Article Header */}
        <section className="bg-construction-800 text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{article.title}</h1>
              <div className="flex items-center justify-center text-gray-300 text-sm gap-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <time dateTime={article.createdAt}>Criado em: {article.createdAt}</time>
                </div>
                {article.updatedAt && (
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <time dateTime={article.updatedAt}>Atualizado em: {article.updatedAt}</time>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-construction-700 mb-8 hover:text-construction-900">
                <ArrowLeft size={16} className="mr-2" />
                Voltar ao blog
              </Link>

              {article.imageSrc && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img
                    src={article.imageSrc}
                    alt={article.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div 
                className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 overflow-hidden"
              >
                <div 
                  className="whitespace-pre-wrap break-words"
                  dangerouslySetInnerHTML={{ __html: article.content }} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-2xl font-bold mb-8">Artigos relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map(related => (
                  <div key={related.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {related.imageSrc && (
                      <Link to={`/blog/${related.id}`}>
                        <img
                          src={related.imageSrc}
                          alt={related.title}
                          className="w-full h-48 object-cover"
                        />
                      </Link>
                    )}
                    <div className="p-6">
                      <span className="inline-block bg-gray-100 text-construction-700 text-xs font-medium px-2 py-1 rounded mb-3">
                        {related.category}
                      </span>
                      <Link to={`/blog/${related.id}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-construction-700">
                          {related.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 line-clamp-2">{related.excerpt}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        {related.createdAt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ArticleDetail;
