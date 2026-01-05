interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

export const OrganizationSchema = ({
  name = "Blue Forge",
  url = "https://blueforge.dev",
  logo = "https://blueforge.dev/logo.png",
  description = "Web Development Studio + AI Builder Platform. Mobile-first websites, web apps, and AI-powered products.",
  sameAs = []
}: OrganizationSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@blueforge.dev"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface WebsiteSchemaProps {
  name?: string;
  url?: string;
}

export const WebsiteSchema = ({
  name = "Blue Forge",
  url = "https://blueforge.dev"
}: WebsiteSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider?: string;
}

export const ServiceSchema = ({
  name,
  description,
  provider = "Blue Forge"
}: ServiceSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
