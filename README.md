# 🚲 fahrradchor.de 🎶

This is a small page for Collegium Pedale Cantorum, a biking choir in the North East of Germany. The page is powered by [`sv`](https://github.com/sveltejs/cli), [`sveltekit`](https://svelte.dev/docs/kit/), [`tailwind`](https://tailwindcss.com/), and [`MDsveX`](https://github.com/pngwn/MDsveX).

It is available at [fahrradchor.de](https://www.fahrradchor.de) and [collegiumpedalecantorum.de](https://www.collegiumpedalecantorum.de).

## AI Contributions

Newer parts of this project are built by [Claude Code via Zed's agent panel](https://zed.dev/docs/ai/external-agents#claude-code). Goal is to treat it like an additional developer resource. My role is to specify requirements, provide code and architectural reviews, and test the application's logic - or, for all three points, nudge the AI to do it itself.

Unfortunately, I remembered too late to always commit the markdown containing the implementation plan with the actual implementation and for older commits, the plan is not included.

Key contributions include:

- Component extraction and refactoring of the landing page
- Internal voting system with Vercel Blob storage integration
- Test infrastructure setup with Vitest
- Progressive form enhancement and error handling
- UI improvements for voting results visualization
