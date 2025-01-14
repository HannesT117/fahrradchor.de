<script lang="ts">
	import CpcH2 from './components/CpcH2.svelte';

	const { children, title } = $props();
</script>

<article>
	{#if title}
		<CpcH2 tag="h1" align="left">{title}</CpcH2>
	{/if}
	<div class="prose">
		{@render children()}
	</div>
</article>
