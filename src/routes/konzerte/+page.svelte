<script lang="ts">
	import CpcH2 from '$lib/components/CpcH2.svelte';
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
					<li class="border-solid border-gray-200 py-4 md:px-4 [&:not(:last-child)]:border-b-1">
						<div class="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr] md:gap-4">
							<div class="flex flex-row gap-1 md:flex-col md:gap-0">
								<span class="font-light text-gray-500">{konzert.date}</span>
								<span class="font-light text-gray-500">{konzert.time}</span>
							</div>
							<div>
								<div class="font-semibold">{konzert.venue}</div>
								<div class="text-gray-600 dark:text-gray-400">{konzert.street}</div>
								<div class="text-gray-600 dark:text-gray-400">{konzert.plz} {konzert.place}</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
			<p class="mt-4 text-sm text-gray-500">Eintritt frei - Spenden erbeten</p>
		</div>
	{/if}
	{#if data.pastKonzerte.length}
		<div class="w-full gap-6 rounded-lg bg-white p-6 md:shadow-md dark:bg-gray-800 dark:text-white">
			<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Vergangene Konzerte</h2>
			<ul>
				{#each data.pastKonzerte as konzert}
					<li class="border-solid border-gray-200 py-4 md:px-4 [&:not(:last-child)]:border-b-1">
						<div class="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr] md:gap-4">
							<div class="flex flex-row gap-1 md:flex-col md:gap-0">
								<span class="font-light text-gray-500">{konzert.date}</span>
								<span class="font-light text-gray-500">{konzert.time}</span>
							</div>
							<div>
								<div class="font-semibold">{konzert.venue}</div>
								<div class="text-gray-600 dark:text-gray-400">{konzert.street}</div>
								<div class="text-gray-600 dark:text-gray-400">{konzert.plz} {konzert.place}</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
