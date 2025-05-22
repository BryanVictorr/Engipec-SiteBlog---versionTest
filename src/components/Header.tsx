/**
 * Componente Header
 * Barra de navegação principal do site com menu
 * e links para as principais seções.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="font-montserrat font-bold text-lg md:text-xl text-construction-800">
              Engipec
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/blog" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link to="/about" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Sobre Nós
            </Link>
            <Link to="/contact" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Contato
            </Link>
            <Button variant="default" size="sm">
              Orçamento
            </Button>
            <Link to="/login">
              <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-primary"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 bg-white">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="font-medium text-gray-700 hover:text-primary px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/blog"
                className="font-medium text-gray-700 hover:text-primary px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="font-medium text-gray-700 hover:text-primary px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nós
              </Link>
              <Link
                to="/contact"
                className="font-medium text-gray-700 hover:text-primary px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <div className="px-4">
                <Button variant="default" size="sm" className="w-full">
                  Orçamento
                </Button>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white w-full">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
