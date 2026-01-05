import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
}

const BASE_URL = "https://blueforge.dev";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export const usePageMeta = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  keywords
}: PageMeta) => {
  useEffect(() => {
    // Set document title
    document.title = title.includes("Blue Forge") 
      ? title 
      : `${title} | Blue Forge`;

    // Helper to set or create meta tag
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Set meta tags
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    
    // Open Graph
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", ogType, true);
    setMeta("og:image", ogImage, true);
    if (canonical) setMeta("og:url", canonical, true);

    // Twitter
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Cleanup
    return () => {
      // Optionally reset to defaults on unmount
    };
  }, [title, description, canonical, ogImage, ogType, keywords]);
};

export default usePageMeta;
