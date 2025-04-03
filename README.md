# Builder.io Technical Challenge – Sales Engineer

This is my completed technical challenge for the Builder.io Sales Engineer role.

## Live Demo

[https://builderio-tech-challenge.vercel.app](https://builderio-tech-challenge.vercel.app)

## Overview

This Next.js 14 app is fully integrated with Builder.io and demonstrates:

- Integration of Builder.io content via their SDK
- A reusable page template created with Builder's visual editor
- Locale support with dynamically rendered content
- A custom `LocaleSelector` component registered and used in Builder
- Deployment to Vercel with live Preview URL support for Builder editors

## Tech Stack

- Next.js 14 (App Router)
- Builder.io SDK
- TypeScript
- Vercel (for deployment)

## Locale Support

The app supports multiple locales:

- English (`en`)
- French Canadian (`fr-CA`)
- German (`de-DE`)

Content is dynamically fetched from Builder.io based on the user's selected locale using `userAttributes.locale`.

### Example URLs

- `/` → `?locale=en`
- `/` → `?locale=fr-CA`
- `/` → `?locale=de-DE`

## Custom Component

A reusable `<LocaleSelector />` component is:

- Built in React
- Registered with Builder.io
- Drag-and-droppable in the visual editor
- Connected to the page via `useSearchParams` and query string logic

## Builder.io Content

- A reusable "Case Study / Landing Page" template was created
- The template includes sections like hero, body copy, image, and CTA
- Localized versions of the homepage were created directly inside Builder for each supported locale

## How It Works

- The app fetches Builder.io content based on:
  - `urlPath: "/"` (same for all locales)
  - `locale: "en" | "fr-CA" | "de-DE"`
- Localized content is created and managed in Builder using their built-in localization system
- The frontend is wrapped in `<Suspense>` to support client-side hooks like `useSearchParams`

## How to Run Locally

1. Clone the repo
2. Create a `.env.local` with your Builder.io public API key:
