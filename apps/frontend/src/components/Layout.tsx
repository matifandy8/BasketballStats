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
    <div className="">
      <Navbar />
      <ScoreTicker />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
