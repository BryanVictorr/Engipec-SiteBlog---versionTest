/**
 * Componente HeroSection
 * Seção principal da página inicial com destaque
 * visual e chamadas para ação.
 */

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building, ArrowRight } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-construction-800 via-construction-700 to-construction-800 text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400 opacity-10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
      
      <div className="container-custom py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Building className="text-orange-400 w-5 h-5" />
              <span className="text-sm font-medium text-orange-100">Qualidade em cada detalhe</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">Materiais de Qualidade para</span>
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text block mt-2">Sua Construção</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-100 max-w-xl">
              Fornecemos os melhores materiais de construção para seu projeto, 
              com atendimento especializado e preços competitivos em todo o Brasil.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 group transition-all duration-300 h-14 px-8 text-base" asChild>
                <Link to="/blog" className="inline-flex items-center gap-2">
                  Conheça Nossos Produtos
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="border-white bg-white text-construction-800 hover:bg-construction-800 hover:text-white hover:border-white border-2 h-14 px-8 text-base"
                asChild
              >
                <Link to="/contact">Entre em Contato</Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-2xl z-10"></div>
            <div className="absolute inset-0 backdrop-blur-sm bg-black/5 rounded-2xl z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
              alt="Equipe de construção" 
              className="rounded-2xl shadow-2xl object-cover w-full h-[500px] object-center relative z-0 transform hover:scale-105 transition-transform duration-700 ease-in-out" 
            />
            <div className="absolute -bottom-5 -right-5 bg-orange-500 text-white p-4 rounded-xl shadow-xl z-20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <p className="font-bold text-lg">20+ anos</p>
              <p className="text-sm">de experiência</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
