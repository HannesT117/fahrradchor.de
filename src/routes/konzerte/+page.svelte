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
<p class="mb-8 flex w-full flex-col justify-center gap-8 md:w-2/3 lg:w-1/2">
	Musik machen, Radfahren und Gutes tun: Das ist Herzenssache des Chores seit seiner Gründung im
	Jahr 1986. Jedes Jahr geht dieses A-Cappella Ensemble mit dem Fahrrad auf Reisen, um in ländlicher
	Gegend anspruchsvolle Konzerte in den Kirchen zu geben. Es erklingt vier- bis achtstimmige
	Chormusik von der Renaissance bis zum Jazz. Zum Ensemble gehören ca. 25 Sänger*innen.
</p>
<div class="flex w-full flex-col justify-center gap-8 md:w-2/3 lg:w-1/2">
	{#if data.futureKonzerte.length}
		<div class="w-full gap-6 rounded-lg p-2 md:p-6 md:shadow-md dark:bg-gray-800 dark:text-white">
			<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
				Bevorstehende Konzerte
			</h2>
			<ul>
				{#each data.futureKonzerte as konzert}
					<li class="hover:bg-cpc-100 border-solid border-gray-200 [&:not(:last-child)]:border-b-1">
						<a
							href="konzerte/{konzert.slug}"
							class="grid grid-cols-[2fr_1fr_auto] items-center gap-4 py-4 md:p-4"
						>
							<span class="font-light text-gray-500">{konzert.time}</span>
							<span>{konzert.place}</span>
							<ArrowRight />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	{#if data.pastKonzerte.length}
		<div class="w-full gap-6 rounded-lg bg-white p-6 md:shadow-md dark:bg-gray-800 dark:text-white">
			<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Vergangene Konzerte</h2>
			<ul>
				{#each data.pastKonzerte as konzert}
					<li class="hover:bg-cpc-100 border-solid border-gray-200 [&:not(:last-child)]:border-b-1">
						<a
							href="konzerte/{konzert.slug}"
							class="grid grid-cols-[2fr_1fr_auto] items-center gap-4 py-4 md:p-4"
						>
							<span class="font-light text-gray-500">{konzert.time}</span>
							<span>{konzert.place}</span>
							<ArrowRight />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
