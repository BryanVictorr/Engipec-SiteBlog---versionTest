/**
 * Componente EmployeeLayout
 * Layout base para as páginas da área do funcionário
 * com navbar e footer.
 */

import { ReactNode } from 'react';
import EmployeeNavbar from './EmployeeNavbar';
import Footer from './Footer';

interface EmployeeLayoutProps {
  children: ReactNode;
}

const EmployeeLayout = ({ children }: EmployeeLayoutProps) => {
  return (
    <>
      <EmployeeNavbar />
      {children}
      <Footer />
    </>
  );
};

export default EmployeeLayout; 