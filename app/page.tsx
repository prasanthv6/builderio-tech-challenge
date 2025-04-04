"use client";

import "../builder-registry";

import { builder } from "@builder.io/sdk";
import { BuilderComponent } from "@builder.io/react";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LocaleSelector from "../components/LocaleSelector";

// Initialize Builder with public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

function PageContent() {
  const builderModelName = "page";
  const [content, setContent] = useState<any>(null);
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";

  useEffect(() => {
    async function fetchContent() {
      const result = await builder
        .get(builderModelName, {
          userAttributes: {
            urlPath: "/",
          },
          options: {
            locale: locale, 
          },
        })
        .toPromise();

      setContent(result);
    }

    fetchContent();
  }, [locale]);

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Welcome to SaaS4U
      </h1>

      {/* Always show locale selector on live and in Builder */}
      <LocaleSelector />

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

export default function Page() {
  return (
    <main>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading page...</p>}>
        <PageContent />
      </Suspense>
    </main>
  );
}
