/**
 * Página Inicial
 * Apresenta a landing page principal do site com hero section,
 * produtos em destaque e chamadas para ação.
 */

import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import ProductCategory from '@/components/ProductCategory';
import ArticleCard from '@/components/ArticleCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useBlog } from '@/context/BlogContext';

const Index = () => {
  const { articles } = useBlog();
  
  // Get the latest 3 articles
  const latestArticles = articles.slice(0, 3);

  const categories = [
    {
      title: "Materiais Básicos",
      description: "Cimento, areia, tijolos e tudo que você precisa para a base da sua obra.",
      imageSrc: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      link: "#"
    },
    {
      title: "Ferramentas",
      description: "As melhores ferramentas para profissionais e amadores.",
      imageSrc: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764",
      link: "#"
    },
    {
      title: "Acabamentos",
      description: "Dê o toque final perfeito com nossa linha de acabamentos.",
      imageSrc: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
      link: "#"
    },
    {
      title: "Hidráulica e Elétrica",
      description: "Tudo para instalações elétricas e hidráulicas da sua obra.",
      imageSrc: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
      link: "#"
    }
  ];

  return (
    <>
      <Header />
      <main>
        <HeroSection />

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossas Categorias</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore nossa ampla seleção de materiais de construção para qualquer tipo de projeto
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <ProductCategory key={index} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Por que escolher a Bloco Construção?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-500 text-xl font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Qualidade Garantida</h3>
                      <p className="text-gray-600">Trabalhamos apenas com os melhores fornecedores e marcas reconhecidas no mercado.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-500 text-xl font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
                      <p className="text-gray-600">Entregamos seus materiais diretamente na obra, com pontualidade e segurança.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-500 text-xl font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Suporte Técnico</h3>
                      <p className="text-gray-600">Nossa equipe de especialistas está pronta para tirar suas dúvidas e oferecer orientações.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-500 text-xl font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Preços Competitivos</h3>
                      <p className="text-gray-600">Oferecemos o melhor custo-benefício do mercado, sem comprometer a qualidade.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-96 overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1524230572899-a752b3835840"
                  alt="Equipe Bloco Construção" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Latest Blog Posts */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Dicas e Novidades</h2>
                <p className="text-lg text-gray-600">
                  Artigos informativos sobre construção e reforma
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4 md:mt-0">
                <Link to="/blog">Ver todos os artigos</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.length > 0 ? (
                latestArticles.map((article) => (
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
                  <h3 className="text-2xl font-semibold mb-2">Nenhum artigo publicado</h3>
                  <p className="text-gray-600">
                    Em breve teremos novos artigos disponíveis.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-construction-800 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para iniciar ou continuar seu projeto?
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco hoje mesmo para um orçamento personalizado 
              ou visite nossa loja física para conhecer todos os nossos produtos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600"
                asChild
              >
                <Link to="/contact">Entre em contato</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white bg-white text-construction-800 hover:bg-construction-800 hover:text-white"
              >
                Conheça nossa loja
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
