<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';
	let { children } = $props();

	export const csr = false; // Currently, we don't need client-side rendering
	console.log(page.data)
</script>

<nav class="sticky flex justify-between items-center h-14 top-0 z-40 w-full px-6 py-1 backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/70 supports-backdrop-blur:bg-white/60">
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
<div class="flex-1 w-full flex flex-col items-center mx-auto mt-6">
{@render children()}
</div>

<footer class="mt-12 p-4 px flex justify-center gap-8 bg-gray-100">
	<a href="/impressum">Impressum</a>
	<a href="/datenschutz">Datenschutz</a>
</footer>
