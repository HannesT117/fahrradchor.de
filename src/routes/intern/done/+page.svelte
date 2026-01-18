<script lang="ts">
	import type { PageData } from './$types';
	import { PUBLIC_HIGHLIGHT_COUNT } from '$env/static/public';

	// Configuration: Number of pieces to show in top/bottom sections
	const HIGHLIGHT_COUNT = Number(PUBLIC_HIGHLIGHT_COUNT) || 5;

	interface Props {
		data: PageData;
	}
	const { data }: Props = $props();

	// Calculate max absolute score for bar width scaling
	const maxAbsScore = $derived(Math.max(...data.pieces.map(([_, score]) => Math.abs(score)), 1));

	// Get bar width as percentage
	function getBarWidth(score: number): number {
		return (Math.abs(score) / maxAbsScore) * 100;
	}
</script>

<div class="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:px-8">
	<h1 class="text-cpc-500 text-6xl font-bold">Vielen Dank</h1>
	<p>Deine Antwort ist gespeichert. Bisher haben <strong>{data.numberOfParticipants} Personen</strong> abgestimmt.
	</p>

	<div class="mx-auto w-full max-w-4xl space-y-6">
		<!-- Top Section -->
		{#if data.pieces.length >= HIGHLIGHT_COUNT}
			<div>
				<h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
					Top {HIGHLIGHT_COUNT} Stücke
				</h2>
				<div class="space-y-1.5 rounded-lg bg-green-50 p-3">
					{#each data.pieces.slice(0, HIGHLIGHT_COUNT) as [piece, score], index}
						<div
							class="flex flex-col gap-1 rounded p-2 sm:flex-row sm:items-center sm:gap-4"
						>
							<!-- Piece name -->
							<div class="flex-shrink-0 text-sm sm:w-2/5 sm:text-base">
								{piece}
							</div>

							<!-- Bar visualization -->
							<div class="relative h-6 flex-1 overflow-hidden rounded bg-white">
								{#if score !== 0}
									<div
										class="h-full rounded bg-green-600"
										style="width: {getBarWidth(score)}%"
									></div>
								{/if}
							</div>

							<!-- Score -->
							<div class="flex-shrink-0 text-right text-sm font-medium text-green-700 sm:w-16">
								{score > 0 ? '+' : ''}{score}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if data.pieces.length > HIGHLIGHT_COUNT * 2}
			<div>
				<h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
					Das graue Mittelfeld
				</h2>
				<div class="space-y-1.5">
					{#each data.pieces.slice(HIGHLIGHT_COUNT, -HIGHLIGHT_COUNT) as [piece, score]}
						<div
							class="flex flex-col gap-1 rounded p-2 sm:flex-row sm:items-center sm:gap-4"
						>
							<!-- Piece name -->
							<div class="flex-shrink-0 text-sm sm:w-2/5 sm:text-base">
								{piece}
							</div>

							<!-- Bar visualization -->
							<div class="relative h-6 flex-1 overflow-hidden rounded bg-gray-100">
								{#if score !== 0}
									<div
										class="h-full rounded"
										class:bg-green-600={score > 0}
										class:bg-red-600={score < 0}
										style="width: {getBarWidth(score)}%"
									></div>
								{/if}
							</div>

							<!-- Score -->
							<div
								class="flex-shrink-0 text-right text-sm font-medium sm:w-16"
								class:text-green-700={score > 0}
								class:text-red-700={score < 0}
								class:text-gray-500={score === 0}
							>
								{score > 0 ? '+' : ''}{score}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if data.pieces.length >= HIGHLIGHT_COUNT}
			<div>
				<h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
					Die unpopulärsten {HIGHLIGHT_COUNT} Stücke
				</h2>
				<div class="space-y-1.5 rounded-lg bg-red-50 p-3">
					{#each data.pieces.slice(-HIGHLIGHT_COUNT) as [piece, score]}
						<div
							class="flex flex-col gap-1 rounded p-2 sm:flex-row sm:items-center sm:gap-4"
						>
							<!-- Piece name -->
							<div class="flex-shrink-0 text-sm sm:w-2/5 sm:text-base">
								{piece}
							</div>

							<!-- Bar visualization -->
							<div class="relative h-6 flex-1 overflow-hidden rounded bg-white">
								{#if score !== 0}
									<div
										class="h-full rounded bg-red-600"
										style="width: {getBarWidth(score)}%"
									></div>
								{/if}
							</div>

							<!-- Score -->
							<div class="flex-shrink-0 text-right text-sm font-medium text-red-700 sm:w-16">
								{score > 0 ? '+' : ''}{score}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
