"use client";

import { builder, BuilderComponent } from "@builder.io/react";
import { useEffect, useState } from "react";

// Initialize Builder.io with your public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function Home() {
  const builderModelName = "page";
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function fetchContent() {
      const result = await builder
        .get(builderModelName, {
          userAttributes: {
            urlPath: "/", // homepage
          },
        })
        .toPromise();

      setContent(result);
    }

    fetchContent();
  }, []);

  return (
    <main>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Welcome to SaaS4U
      </h1>

      {content ? (
        <BuilderComponent model={builderModelName} content={content} />
      ) : (
        <p style={{ textAlign: "center" }}>Loading content...</p>
      )}
    </main>
  );
}
