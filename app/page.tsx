"use client"; // Enables client-side rendering in Next.js App Router

// Import Builder component registry (where we register custom components)
import "../builder-registry";

// Import Builder.io SDK and React renderer
import { builder } from "@builder.io/sdk";
import { BuilderComponent } from "@builder.io/react";

// Import React hooks and utilities
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Import custom locale selector component
import LocaleSelector from "../components/LocaleSelector";

// Initialize Builder with the public API key from environment variables
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// This component handles fetching and rendering Builder content
function PageContent() {
  const builderModelName = "page"; // The name of the Builder model we're pulling content from
  const [content, setContent] = useState<any>(null); // Store fetched Builder content in state
  const searchParams = useSearchParams(); // Access URL query parameters
  const locale = searchParams.get("locale") || "en"; // Get locale from URL, default to 'en'

  useEffect(() => {
    // Fetch Builder content when the locale changes
    async function fetchContent() {
      const result = await builder
        .get(builderModelName, {
          userAttributes: {
            urlPath: "/", // Currently hardcoded to root path (could be made dynamic)
          },
          options: {
            locale: locale, // Pass the selected locale to Builder
          },
        })
        .toPromise();

      setContent(result); // Save content to state for rendering
    }

    fetchContent(); // Initial fetch on mount or when locale changes
  }, [locale]);

  return (
    <>
      {/* Static page title */}
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Welcome to SaaS4U
      </h1>

      {/* Locale selector appears on all pages */}
      <LocaleSelector />

      {/* Render the Builder content if available, otherwise show loading state */}
      {content ? (
        <BuilderComponent model={builderModelName} content={content} />
      ) : (
        <p style={{ textAlign: "center" }}>
          Loading content for <strong>{locale}</strong>...
        </p>
      )}
    </>
  );
}

// Exported page component with Suspense fallback for async rendering
export default function Page() {
  return (
    <main>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading page...</p>}>
        <PageContent />
      </Suspense>
    </main>
  );
}
