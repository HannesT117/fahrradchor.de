<script lang="ts">
	import CpcH2 from '$lib/components/CpcH2.svelte';
	import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	const { data }: Props = $props();
</script>

<svelte:head>
	<title>Konzerte des Collegium Pedale Cantorum</title>
</svelte:head>

<CpcH2 tag="h1">Konzerte</CpcH2>
<div class="flex w-full flex-col justify-center gap-8 md:w-2/3 lg:w-1/2">
	{#if data.futureKonzerte.length}
		<div class="w-full gap-6 rounded-lg bg-white p-6 md:shadow-md">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Bevorstehende Konzerte</h2>
			<ul>
				{#each data.futureKonzerte as konzert}
					<li class="gap-8 hover:bg-cpc-100">
						<a
							href="konzerte/{konzert.slug}"
							class="flex justify-between border-gray-200 p-4 [&:not(:last-child)>*]:border-b-2"
						>
							<div class="text-sm text-gray-500">{konzert.time}</div>
							<div>{konzert.place}</div>
							<ArrowRight />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	{#if data.pastKonzerte.length}
		<div class="w-full gap-6 rounded-lg bg-white p-6 md:shadow-md">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Vergangene Konzerte</h2>
			<ul>
				{#each data.pastKonzerte as konzert}
					<a href="konzerte/{konzert.slug}" class="[&:not(:last-child)>*]:border-b-2">
						<li class="grid grid-cols-konzerte items-center gap-8 border-gray-200">
							<div>
								<div class="text-sm text-gray-500">{konzert.time}</div>
								<div>{konzert.place}</div>
							</div>
							<ArrowRight />
						</li>
					</a>
				{/each}
			</ul>
		</div>
	{/if}
</div>
