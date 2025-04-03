"use client";

import { useRouter, useSearchParams } from "next/navigation";

const locales = ["default", "en-CA", "fr-CA", "de-DE"];

export default function LocaleSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLocale = searchParams.get("locale") || "en";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("locale", newLocale);
    router.push(`?${params.toString()}`);
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
      <label htmlFor="locale" style={{ marginRight: "0.5rem" }}>
        Choose your locale:
      </label>
      <select id="locale" value={currentLocale} onChange={handleChange}>
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
