<script lang="ts">
	import CpcH2 from './components/CpcH2.svelte';

	const { children, title } = $props();
</script>

<div class="px-4 md:px-0">
	{#if title}
		<CpcH2 tag="h1" align="left">{title}</CpcH2>
	{/if}
	<article class="prose dark:prose-invert">
		{@render children()}
	</article>
</div>
