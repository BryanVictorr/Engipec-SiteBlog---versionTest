/**
 * Página Sobre
 * Apresenta informações sobre a empresa, sua história,
 * valores e equipe.
 */

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: "Carlos Silva",
      position: "Diretor Geral",
      bio: "Com mais de 20 anos no setor de materiais de construção, Carlos é especialista em gestão de suprimentos e logística.",
      imageSrc: "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
    },
    {
      name: "Ana Oliveira",
      position: "Gerente Comercial",
      bio: "Ana possui vasta experiência na área comercial e é responsável pelo relacionamento com grandes construtoras.",
      imageSrc: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764"
    },
    {
      name: "Roberto Santos",
      position: "Consultor Técnico",
      bio: "Engenheiro civil com especialização em materiais, Roberto orienta clientes sobre as melhores soluções.",
      imageSrc: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b"
    }
  ];

  return (
    <>
      <Header />
      <main>
        {/* About Hero */}
        <section className="bg-gradient-to-r from-construction-800 to-construction-700 text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre a Bloco Construção</h1>
              <p className="text-xl text-gray-100">
                Há mais de 15 anos no mercado, fornecendo materiais de qualidade
                e soluções completas para construção civil.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
                <p className="text-gray-700 mb-4">
                  A Bloco Construção nasceu em 2008, com a missão de oferecer materiais de construção de qualidade a preços justos. 
                  O que começou como uma pequena loja familiar, hoje se tornou referência no setor, com uma ampla variedade de produtos 
                  e serviços para atender desde o pequeno reformador até grandes construtoras.
                </p>
                <p className="text-gray-700 mb-4">
                  Ao longo dos anos, investimos constantemente na expansão do nosso catálogo de produtos, na capacitação da nossa equipe
                  e na melhoria dos nossos serviços. Acreditamos que o sucesso dos projetos dos nossos clientes está diretamente 
                  relacionado à qualidade dos materiais utilizados.
                </p>
                <p className="text-gray-700">
                  Hoje, com orgulho, podemos dizer que fazemos parte da história de milhares de construções em toda a região, 
                  contribuindo para a realização de sonhos e para o desenvolvimento da infraestrutura local.
                </p>
              </div>
              <div className="order-first lg:order-last">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1524230572899-a752b3835840" 
                    alt="Nossa história" 
                    className="rounded-lg shadow-xl w-full h-auto"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-orange-500 text-white py-4 px-6 rounded-lg shadow-lg">
                    <p className="text-2xl font-bold">15+</p>
                    <p className="text-sm uppercase">Anos de mercado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-6">Missão, Visão e Valores</h2>
              <p className="text-gray-700">
                Nossos princípios fundamentais guiam todas as nossas decisões e ações no dia a dia
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 bg-construction-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-construction-700 text-2xl font-bold">M</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Missão</h3>
                <p className="text-gray-700">
                  Oferecer materiais de construção de qualidade superior, contribuindo para o sucesso 
                  dos projetos de nossos clientes com atendimento especializado e preços justos.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 bg-construction-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-construction-700 text-2xl font-bold">V</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Visão</h3>
                <p className="text-gray-700">
                  Ser reconhecida como a principal referência em materiais de construção na região, 
                  expandindo nossa presença e mantendo a excelência em produtos e serviços.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 bg-construction-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-construction-700 text-2xl font-bold">V</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Valores</h3>
                <ul className="text-gray-700 space-y-2 text-left">
                  <li>• Qualidade em tudo que fazemos</li>
                  <li>• Integridade nas relações comerciais</li>
                  <li>• Responsabilidade socioambiental</li>
                  <li>• Inovação constante</li>
                  <li>• Valorização das pessoas</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-6">Nossa Equipe</h2>
              <p className="text-gray-700">
                Profissionais experientes e apaixonados pelo que fazem, prontos para atender suas necessidades
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.imageSrc}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-orange-600 mb-3">{member.position}</p>
                    <p className="text-gray-700">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-construction-800 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Faça parte da nossa história</h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Venha conhecer nossa loja e descubra por que tantos clientes confiam em nós 
              para fornecer os melhores materiais para suas construções.
            </p>
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600"
              asChild
            >
              <Link to="/contact">Entre em contato</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
