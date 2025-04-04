"use client";

import { builder, BuilderComponent } from "@builder.io/react";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LocaleSelector from "../components/LocaleSelector";

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
            locale,
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
