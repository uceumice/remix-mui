# 𝙍𝙚𝙢𝙞𝙭 𝙒𝙞𝙩𝙝 | ℛℯ𝒶𝒸𝓉 ℳ𝒰𝐼

- [𝙍𝙚𝙢𝙞𝙭 𝙒𝙞𝙩𝙝 | ℛℯ𝒶𝒸𝓉 ℳ𝒰𝐼](#𝙍𝙚𝙢𝙞𝙭-𝙒𝙞𝙩𝙝--ℛℯ𝒶𝒸𝓉-ℳ𝒰𝐼)
  - [Purpose](#purpose)
  - [Installation](#installation)
    - [npm](#npm)
    - [pnpm](#pnpm)
    - [yarn](#yarn)
  - [Conventions](#conventions)
    - [entry.client.tsx](#entryclienttsx)
    - [entry.server.tsx](#entryservertsx)
    - [root.tsx](#roottsx)
  - [Collaboration](#collaboration)
  - [LICENSE](#license)

## Purpose

Helps to integrate MUI/Emotion into your Remix Run project.

## Installation

### npm

```bash
npm install "@remix.w/mui@latest"
```

### pnpm

```bash
pnpm add "@remix.w/mui@latest"
```

### yarn

```bash
yarn isntall "@remix.w/mui@latest"
```

## Conventions

Use the template below or modify your code to include the relevant bits.

### entry.client.tsx

```tsx
import { hydrateRoot as hydrate } from 'react-dom/client';
import { RemixBrowser } from '@remix-run/react';
import { StrictMode } from 'react';

// ----
import { MUIEmotionProvider } from '@remix.w/mui/out/cache/provider.client';

// ---- JSX APP
function App() {
    return (
        <StrictMode>
            <MUIEmotionProvider>
                <RemixBrowser />
            </MUIEmotionProvider>
        </StrictMode>
    );
}

// ---- CLIENT HYDRATION
hydrate(document, <App />);
```

### entry.server.tsx

```tsx
import { renderToString as render } from 'react-dom/server';
import { EntryContext } from '@remix-run/cloudflare';
import CssBaseline from '@mui/material/CssBaseline';
import { RemixServer } from '@remix-run/react';

// ----
import { withMUI } from "@remix.w/mui/out/cache/provider.server";

export default async function handle(request: Request, status: number, headers: Headers, context: EntryContext) {
    const { MUIEmotionProvider, withMUIStyles } = withMUI();

    // ---- JSX APP
    function App() {
        return (
            <MUIEmotionProvider>
                <CssBaseline />
                <RemixServer context={context} url={request.url} />
            </MUIEmotionProvider>
        );
    }

    // ---- HTML RENDER
    const html = withMUIStyles(render(<App />));

    // ---- RESPONSE HEADERS
    headers.set('Content-Type', 'text/html');

    // ----
    return new Response(`<!DOCTYPE html>${html}`, { status, headers });
}
```

### root.tsx

```tsx
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { MetaFunctionArgs } from "@remix.w/types";
import { CssBaseline } from '@mui/material';

// ----
import { MUIStylesProvider } from "@remix.w/mui";

// ----
export function meta({ data }: MetaFunctionArgs<RootLoaderData>) {
    return ({
        charSet: "utf-8",
        viewport: "width=device-width,initial-scale=1"
    });
}

// ----
export default function Root() {
    return (
        <MUIStylesProvider>
            <html lang="en">
                <head>
                    <Meta />
                    <Links />

                    {/** ---- IMPORTANT ----**/}
                    <meta name="emotion-insertion-point" content="emotion-insertion-point" />
                </head>
                <body>
                    <CssBaseline />
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        </MUIStylesProvider>
    );
}

// ---- Don't forget to include the styles provider in your Catch and Error boundaries

export function CatchBoundary() {
    return (
        <MUIStylesProvider>
            <html lang="en">
                <head>
                    {/** ---- IMPORTANT ----**/}
                    <meta name="emotion-insertion-point" content="emotion-insertion-point" />
                </head>
                <body>
                    <...>
                </body>
            </html>
        </MUIStylesProvider>
    );
}
```

## Collaboration

You are welcome to contribute ≧◡≦

## LICENSE

MIT
