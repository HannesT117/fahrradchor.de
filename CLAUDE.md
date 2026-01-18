# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for Collegium Pedale Cantorum (fahrradchor.de), a German cycling choir that tours with bicycles each summer. The site is built with SvelteKit 5, uses Tailwind CSS 4 for styling, and is deployed on Vercel.

## Tech Stack

- **Framework**: SvelteKit 2 with Svelte 5 (modern runes syntax)
- **Styling**: Tailwind CSS 4 (using `@theme` directive, not traditional config file)
- **Content**: MDsveX for Markdown content with custom layouts
- **Images**: `@sveltejs/enhanced-img` for optimized image handling
- **Deployment**: Vercel with `@sveltejs/adapter-vercel`
- **Package Manager**: pnpm

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Type checking
pnpm check              # Single run
pnpm check:watch        # Watch mode

# Linting and formatting
pnpm lint               # Run prettier check and eslint
pnpm format             # Format all files with prettier

# Build
pnpm build              # Production build
pnpm preview            # Preview production build
```

## Architecture

### Directory Structure

- `src/routes/` - SvelteKit file-based routing
  - `+page.svelte` - Landing page
  - `+layout.svelte` - Root layout with navigation and footer
  - `konzerte/` - Concert listing and individual concert pages
  - `chronik/`, `impressum/`, `datenschutz/`, `intern/` - Other pages
- `src/lib/` - Reusable components and utilities
  - `components/` - Svelte components (prefixed with `Cpc`)
  - `konzerte/` - Concert Markdown files (`.md`)
  - `img/` - Images and gallery assets
  - `server/` - Server-side utilities (Vercel Blob integration)

### Content Management: Concert System

Concert information is managed through Markdown files in `src/lib/konzerte/`:

- Each concert is a `.md` file with frontmatter metadata
- Layout is defined as `konzert` in frontmatter, which maps to `KonzerteLayout.svelte`
- Frontmatter fields: `title`, `start`, `end`, `venue`, `street`, `plz`, `place`, `link`
- Files are loaded via `import.meta.glob()` in `konzerte/+page.server.ts`
- Concerts are automatically sorted and split into past/future events

### MDsveX Configuration

MDsveX is configured in `svelte.config.js` with custom layouts:
- `konzert` layout → `src/lib/KonzerteLayout.svelte`
- Default layout → `src/lib/MarkdownLayout.svelte`
- Supported extensions: `.md`, `.svx`

### Styling with Tailwind CSS 4

Tailwind configuration is in `src/app.css` using the new `@theme` directive:
- Custom color palette: `cpc-*` and `cpcAnalog-*` (100-900 shades)
- Custom font: Mulish (self-hosted in `/static/fonts/`)
- Typography and container-queries plugins enabled
- No separate `tailwind.config.js` file - all config in CSS

### Component Conventions

All reusable components are prefixed with `Cpc` (Collegium Pedale Cantorum):
- `CpcH2`, `CpcParagraph`, `CpcSection` - Layout components
- `CpcInfoBox`, `CpcImageTextBlock`, `CpcGalleryGrid` - Content components
- `CpcButtonLink`, `CpcAudio`, `CpcTimeRestricted` - Interactive components

Components use Svelte 5 runes syntax (`$props`, `$state`, `{@render children()}`).

### Image Handling

Images use `@sveltejs/enhanced-img`:
- Import with `?enhanced` query parameter for optimization
- Use `<enhanced:img>` component in templates
- Gallery images loaded via `import.meta.glob()` with `eager: true` and `query: { enhanced: true }`

### Server Integration

Vercel Blob storage integration in `src/lib/server/blob.ts`:
- Uses `BLOB_READ_WRITE_TOKEN` environment variable
- `download()` function fetches data from Vercel Blob storage

## Key Technical Details

### SvelteKit Configuration

- Adapter: Vercel (`@sveltejs/adapter-vercel`)
- CSP enabled with `script-src: ['self']`
- Prerendering enabled for concert pages

### TypeScript

- Strict mode enabled
- Extended from `.svelte-kit/tsconfig.json`
- Path aliases handled by SvelteKit (e.g., `$lib`)

### Vite Plugins

1. `@tailwindcss/vite` - Tailwind CSS 4 integration
2. `enhancedImages()` - Image optimization
3. `sveltekit()` - SvelteKit integration

### ESLint Configuration

Flat config format using:
- TypeScript ESLint
- Svelte plugin
- Prettier integration
- Includes `.gitignore` patterns
