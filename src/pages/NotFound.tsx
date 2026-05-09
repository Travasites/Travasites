import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center bg-black">
        <div className="text-center px-6">
          <h1 className="text-8xl md:text-9xl font-display font-bold text-primary/20 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-300"
          >
            Back to Home <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
