<script lang="ts">
	import type { PageData } from './$types';
	import { PUBLIC_HIGHLIGHT_COUNT } from '$env/static/public';
	import CpcH2 from '$lib/components/CpcH2.svelte';

	// Configuration: Number of pieces to show in top/bottom sections
	const HIGHLIGHT_COUNT = Number(PUBLIC_HIGHLIGHT_COUNT) || 5;
	// Midpoint on the 0–100% resistance scale (equivalent to an average vote of 5)
	const NEUTRAL_RESISTANCE_PCT = 50;

	interface Props {
		data: PageData;
	}
	const { data }: Props = $props();
</script>

<div class="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:px-8">
	<CpcH2 tag="h1">Erfolgreich abgestimmt</CpcH2>
	<p>
		Deine Antwort ist gespeichert. Bisher haben <strong>{data.numberOfParticipants} Personen</strong
		> abgestimmt.
	</p>

	<div class="mx-auto w-full max-w-4xl space-y-6">
		<!-- Top Section -->
		{#if data.pieces.length >= HIGHLIGHT_COUNT}
			<div>
				<h2 class="mb-2 text-sm font-semibold tracking-wide text-gray-600 uppercase">
					Die {HIGHLIGHT_COUNT} beliebtesten Stücke (geringster Widerstand)
				</h2>
				<div class="space-y-1.5 rounded-lg bg-green-50 p-3 dark:bg-inherit">
					{#each data.pieces.slice(0, HIGHLIGHT_COUNT) as [piece, resistancePct]}
						<div class="flex flex-col gap-1 rounded p-2 sm:flex-row sm:items-center sm:gap-4">
							<!-- Piece name -->
							<div class="flex-shrink-0 text-sm sm:w-2/5 sm:text-base">
								{piece}
							</div>

							<!-- Bar visualization -->
							<div class="relative h-6 flex-1 overflow-hidden rounded bg-white">
								{#if resistancePct > 0}
									<div class="h-full rounded bg-green-600" style="width: {resistancePct}%"></div>
								{/if}
							</div>

							<!-- Score -->
							<div class="flex-shrink-0 text-right text-sm font-medium text-green-700 sm:w-16">
								{resistancePct.toFixed(0)}%
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if data.pieces.length > HIGHLIGHT_COUNT * 2}
			<div>
				<h2 class="mb-2 text-sm font-semibold tracking-wide text-gray-600 uppercase">
					Das graue Mittelfeld
				</h2>
				<div class="space-y-1.5">
					{#each data.pieces.slice(HIGHLIGHT_COUNT, -HIGHLIGHT_COUNT) as [piece, resistancePct]}
						<div class="flex flex-col gap-1 rounded p-2 sm:flex-row sm:items-center sm:gap-4">
							<!-- Piece name -->
							<div class="flex-shrink-0 text-sm sm:w-2/5 sm:text-base">
								{piece}
							</div>

							<!-- Bar visualization -->
							<div class="relative h-6 flex-1 overflow-hidden rounded bg-gray-100">
								{#if resistancePct > 0}
									<div
										class="h-full rounded"
										class:bg-green-600={resistancePct <= NEUTRAL_RESISTANCE_PCT}
										class:bg-red-600={resistancePct > NEUTRAL_RESISTANCE_PCT}
										style="width: {resistancePct}%"
									></div>
								{/if}
							</div>

							<!-- Score -->
							<div
								class="flex-shrink-0 text-right text-sm font-medium sm:w-16"
								class:text-green-700={resistancePct <= NEUTRAL_RESISTANCE_PCT}
								class:text-red-700={resistancePct > NEUTRAL_RESISTANCE_PCT}
							>
								{resistancePct.toFixed(0)}%
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if data.pieces.length >= HIGHLIGHT_COUNT}
			<div>
				<h2 class="mb-2 text-sm font-semibold tracking-wide text-gray-600 uppercase">
					Die {HIGHLIGHT_COUNT} unbeliebtesten Stücke (größter Widerstand)
				</h2>
				<div class="space-y-1.5 rounded-lg bg-red-50 p-3 dark:bg-inherit">
					{#each data.pieces.slice(-HIGHLIGHT_COUNT) as [piece, resistancePct]}
						<div class="flex flex-col gap-1 rounded p-2 sm:flex-row sm:items-center sm:gap-4">
							<!-- Piece name -->
							<div class="flex-shrink-0 text-sm sm:w-2/5 sm:text-base">
								{piece}
							</div>

							<!-- Bar visualization -->
							<div class="relative h-6 flex-1 overflow-hidden rounded bg-white">
								{#if resistancePct > 0}
									<div class="h-full rounded bg-red-600" style="width: {resistancePct}%"></div>
								{/if}
							</div>

							<!-- Score -->
							<div class="flex-shrink-0 text-right text-sm font-medium text-red-700 sm:w-16">
								{resistancePct.toFixed(0)}%
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
