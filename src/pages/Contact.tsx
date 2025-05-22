/**
 * Página de Contato
 * Formulário de contato e informações para
 * comunicação com a empresa.
 */

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Header />
      <main>
        {/* Contact Header */}
        <section className="bg-gradient-to-r from-construction-800 to-construction-700 text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h1>
              <p className="text-xl text-gray-100">
                Estamos aqui para ajudar. Tire suas dúvidas, solicite orçamentos ou compartilhe seu feedback conosco.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info and Form */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 h-10 w-10 flex items-center justify-center rounded-full bg-construction-100 text-construction-700">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Endereço</h3>
                      <address className="not-italic text-gray-700">
                        Rua da Construção, 123<br />
                        Bairro Centro, São Paulo - SP<br />
                        CEP: 01234-567
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 h-10 w-10 flex items-center justify-center rounded-full bg-construction-100 text-construction-700">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Telefones</h3>
                      <p className="text-gray-700">
                        <a href="tel:+551198765432" className="hover:text-construction-700">+55 11 9876-5432</a> (Vendas)<br />
                        <a href="tel:+551198765433" className="hover:text-construction-700">+55 11 9876-5433</a> (Suporte Técnico)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 h-10 w-10 flex items-center justify-center rounded-full bg-construction-100 text-construction-700">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-gray-700">
                        <a href="mailto:contato@blococonstrucao.com" className="hover:text-construction-700">
                          contato@blococonstrucao.com
                        </a><br />
                        <a href="mailto:vendas@blococonstrucao.com" className="hover:text-construction-700">
                          vendas@blococonstrucao.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 h-10 w-10 flex items-center justify-center rounded-full bg-construction-100 text-construction-700">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Horário de Funcionamento</h3>
                      <p className="text-gray-700">
                        Segunda a Sexta: 8h às 18h<br />
                        Sábado: 8h às 13h<br />
                        Domingo: Fechado
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-6">Encontre-nos</h3>
                  <div className="h-64 rounded-lg overflow-hidden shadow-md border border-gray-200">
                    {/* Replace with actual map embed */}
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-600 text-center">Mapa da localização<br/>Aqui entraria um iframe do Google Maps</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Envie-nos uma mensagem</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Qual é o prazo de entrega dos materiais?</h3>
                <p className="text-gray-700">
                  O prazo de entrega varia conforme a disponibilidade do produto e sua localização. 
                  Para a região metropolitana, geralmente entregamos em até 48 horas após a confirmação do pagamento.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Vocês oferecem assessoria técnica?</h3>
                <p className="text-gray-700">
                  Sim! Nossa equipe de especialistas está disponível para orientar sobre a escolha dos melhores 
                  materiais para seu projeto, bem como fornecer dicas de aplicação e uso.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Quais formas de pagamento são aceitas?</h3>
                <p className="text-gray-700">
                  Aceitamos cartões de crédito e débito, transferências bancárias, PIX e, para clientes cadastrados, 
                  oferecemos opções de parcelamento e faturamento.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Como solicitar um orçamento?</h3>
                <p className="text-gray-700">
                  Você pode solicitar um orçamento através do formulário de contato nesta página, por telefone, 
                  email ou visitando nossa loja física com sua lista de materiais.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
