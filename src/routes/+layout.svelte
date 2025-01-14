<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="robots" content="index,follow" />
</svelte:head>

<nav
	class="supports-backdrop-blur:bg-white/60 sticky top-0 z-40 flex h-14 w-full items-center justify-between bg-white/70 px-6 py-1 backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10"
>
	<a href="/" class="h-full" aria-label="Zur Startseite">
		<!-- svelte-ignore a11y_missing_attribute -->
		<img class="h-full" src="/logo.svg" aria-hidden="true" />
	</a>
	<div class="flex-end flex gap-4">
		{#if page.url.pathname !== '/'}
			<a href="/">Home</a>
		{/if}
		<a href="/konzerte">Konzerte</a>
		<a href="/chronik">Chronik</a>
	</div>
</nav>
<div class="mx-auto mt-6 flex w-full flex-1 flex-col items-center">
	{@render children?.()}
</div>

<footer class="px mt-12 flex justify-center gap-8 bg-gray-100 p-4">
	<a href="/impressum">Impressum</a>
	<a href="/datenschutz">Datenschutz</a>
</footer>
