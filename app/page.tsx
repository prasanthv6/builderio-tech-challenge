"use client";

import { builder, BuilderComponent } from "@builder.io/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // 🆕 For reading the locale param
import LocaleSelector from "../components/LocaleSelector"; // 🆕 Make sure this file exists

// Initialize Builder.io with your public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function Home() {
  const builderModelName = "page";
  const [content, setContent] = useState<any>(null);
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en"; // default to "en"

  useEffect(() => {
    async function fetchContent() {
      const result = await builder
        .get(builderModelName, {
          userAttributes: {
            urlPath: `/${locale}`, // dynamic locale-based path
          },
        })
        .toPromise();

      setContent(result);
    }

    fetchContent();
  }, [locale]); // refetch when locale changes

  return (
    <main>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Welcome to SaaS4U
      </h1>

      {/* 👇 Locale selector dropdown component */}
      <LocaleSelector />

      {content ? (
        <BuilderComponent model={builderModelName} content={content} />
      ) : (
        <p style={{ textAlign: "center" }}>
          Loading content for <strong>{locale}</strong>...
        </p>
      )}
    </main>
  );
}
