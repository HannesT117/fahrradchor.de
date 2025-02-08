<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	const { data }: Props = $props();
	const { MDComponent, meta } = data;
</script>

<svelte:head>
	<title>{meta.title}</title>
</svelte:head>

<div class="flex grow flex-col px-4 md:px-0">
	<div class="flex flex-col gap-4">
		<p>{meta.time} in {meta.place}</p>
		{#if MDComponent}
			<MDComponent />
		{/if}
		<div class="prose">
			<h2>Ort</h2>
			<strong>{meta.venue}</strong><br />
			<span>{meta.street}</span><br />
			<span>{meta.plz} {meta.place}</span>
		</div>

		<div>
			{meta.entry || 'Eintritt frei - Spenden erbeten'}
		</div>
	</div>
</div>
