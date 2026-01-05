import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export const Layout = ({ children, hideFooter = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};
