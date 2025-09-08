import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScoreTicker from './ScoreTicker';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  console.log('render Layout()');
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScoreTicker />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
