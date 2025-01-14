<script lang="ts">
	import CpcH2 from '$lib/components/CpcH2.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	const { data }: Props = $props();
	const { MDComponent, meta } = data;
</script>

<article class="flex flex-grow flex-col">
	<div class="flex flex-col gap-4">
		<CpcH2 tag="h1">{meta.title}</CpcH2>
		<p>{meta.date}</p>
		{#if MDComponent}
			<MDComponent />
		{/if}
		<div>
			<h2>Ort</h2>
			<strong>{meta.venue}</strong><br />
			<span>{meta.street}</span><br />
			<span>{meta.plz} {meta.place}</span>
		</div>

		<div>
			{meta.entry || 'Eintritt frei - Spenden erbeten'}
		</div>
	</div>
</article>
