/**
 * Componente Footer
 * Rodapé do site com links úteis, informações de contato
 * e redes sociais.
 */

import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-construction-800 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
                <span className="text-construction-800 font-bold">E</span>
              </div>
              <span className="font-montserrat font-bold text-lg">Engipec</span>
            </div>
            <p className="text-gray-300 mb-4">
              Sua parceira em materiais de construção e soluções para obras de todos os tamanhos.
            </p>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Materiais Básicos
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Ferramentas
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Acabamentos
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Hidráulica e Elétrica
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Contato</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>Rua da Construção, 123</p>
              <p>São Paulo, SP - Brasil</p>
              <p>CEP: 01234-567</p>
              <p className="pt-2">
                <a href="tel:+551198765432" className="hover:text-white transition-colors">
                  +55 11 9876-5432
                </a>
              </p>
              <p>
                <a href="mailto:contato@blococonstrucao.com" className="hover:text-white transition-colors">
                  contato@blococonstrucao.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Bloco Construção. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
