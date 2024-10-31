import { ReactNode } from 'react';

import Navbar from '../Navbar/Navbar';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

const AppLayout = ({ children, title }: AppLayoutProps) => {
  return <Navbar title={title}>{children}</Navbar>;
};

export default AppLayout;
