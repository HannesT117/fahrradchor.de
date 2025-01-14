<script lang="ts">
	import CpcH2 from '$lib/components/CpcH2.svelte';
import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	const { data }: Props = $props();
	// console.log(data.konzerte);
</script>

<CpcH2 tag="h1">Konzerte</CpcH2>
<div class="flex flex-col w-full md:w-2/3 lg:w-1/2 justify-center gap-8">
	{#if data.futureKonzerte.length}
	<div class="w-full gap-6 rounded-lg bg-white p-6 md:shadow-md">
		<h2 class="mb-4 text-lg font-semibold text-gray-900">Bevorstehende Konzerte</h2>
		<ul>
			{#each data.futureKonzerte as konzert}
				<a href="konzerte/{konzert.slug}" class="[&:not(:last-child)>*]:border-b-2 border-gray-200 ">
					<li class="grid grid-cols-konzerte items-center gap-8 py-4">
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
	{#if data.pastKonzerte.length}
	<div class="w-full gap-6 rounded-lg bg-white p-6 md:shadow-md">
		<h2 class="mb-4 text-lg font-semibold text-gray-900">Vergangene Konzerte</h2>
		<ul>
			{#each data.pastKonzerte as konzert}
				<a href="konzerte/{konzert.slug}" class="[&:not(:last-child)>*]:border-b-2 ">
					<li class="border-gray-200 grid grid-cols-konzerte items-center gap-8">
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
