<script lang="ts">
	import CpcH2 from "./components/CpcH2.svelte";

	const { children, title } = $props();
</script>

{#if title}
	<CpcH2 tag='h1' align="left">{ title }</CpcH2>
{/if}
<article class="prose p-4 md:p-0">
	{@render children()}
</article>
