import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SkipToContent } from "./SkipToContent";
import { ScrollProgress } from "./ScrollProgress";
import { BackToTop } from "./BackToTop";
import { PageTransition } from "./PageTransition";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export const Layout = ({ children, hideFooter = false }: LayoutProps): React.ReactNode => {
  return (
    <div className="min-h-screen bg-black">
      <SkipToContent />
      <Navbar />
      <ScrollProgress />
      <PageTransition>
        <main id="main-content" className="pt-16 md:pt-20" tabIndex={-1}>
          {children}
        </main>
      </PageTransition>
      {!hideFooter && <Footer />}
      <BackToTop />
    </div>
  );
};
