"use client"; // ✅ This tells Next.js to render this as a client component

import { builder, BuilderComponent } from "@builder.io/react";
import { useEffect, useState } from "react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function Home() {
  const builderModelName = "page";
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function fetchContent() {
      const result = await builder
        .get(builderModelName, {
          userAttributes: {
            urlPath: "/",
          },
        })
        .toPromise();

      setContent(result);
    }

    fetchContent();
  }, []);

  return (
    <>
      <h1>Welcome to SaaS4U</h1>
      {content ? (
        <BuilderComponent model={builderModelName} content={content} />
      ) : (
        <p>Loading content...</p>
      )}
    </>
  );
}
