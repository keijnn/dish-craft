//import modules
import { ReactNode } from 'react';
//import widgets
import { Header } from '@/widgets/header';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-full">
      <Header />
      {children}
    </div>
  );
};
