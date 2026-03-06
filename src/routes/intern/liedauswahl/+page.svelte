<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import CpcH2 from '$lib/components/CpcH2.svelte';
	import type { ActionData, PageData } from './$types';

	interface Props {
		data: PageData;
		form: ActionData;
	}
	const { data, form }: Props = $props();

	const MAX_VOTE_VALUE = 10;
	const DEFAULT_RESISTANCE = 5;
	const RESISTANCE_LEVELS = Array.from({ length: MAX_VOTE_VALUE + 1 }, (_, i) => i);

	let isSubmitting = $state(false);
	const currentYear = new Date().getFullYear();

	// Helper to get saved vote value from form error response
	function getSavedVote(piece: string): number | undefined {
		if (form && 'values' in form && form.values?.votes) {
			return form.values.votes[piece];
		}
		return undefined;
	}
</script>

<div class="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:px-8">
	<CpcH2 tag="h1">Liederauswahl {currentYear}</CpcH2>

	<form
		method="POST"
		class="flex flex-col gap-6"
		use:enhance={() => {
			isSubmitting = true;
			return async ({ result, update }) => {
				isSubmitting = false;
				if (result.type === 'success') {
					// Use replaceState to prevent back navigation to form
					goto('/intern/liedauswahl/ergebnis', { replaceState: true });
				} else {
					// Update form state (preserves error + form values) and scroll to top
					await update({ reset: false });
					window.scrollTo({ top: 0, behavior: 'instant' });
				}
			};
		}}
	>
		{#if form?.error}
			<div class="rounded-lg border border-red-400 bg-red-50 px-4 py-3 text-red-700">
				<p><strong>Fehler:</strong> {form.error}</p>
			</div>
		{/if}

		<!-- Name Input -->
		<div>
			<label for="name" class="mb-2 block">Dein Name</label>
			<input
				type="text"
				id="name"
				name="name"
				value={form && 'values' in form ? (form.values?.name ?? '') : ''}
				class="focus:border-cpc-500 focus:ring-cpc-500 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:outline-none"
				required
			/>
		</div>

		<!-- Song Voting Items -->
		<div class="space-y-6">
			{#each data.pieces as piece}
				{@const savedVote = getSavedVote(piece)}
				<fieldset>
					<legend class="mb-2 font-medium">{piece}</legend>
					<div class="flex">
						{#each RESISTANCE_LEVELS as n}
							<label
								class="
									flex-1 cursor-pointer border border-gray-300 py-2.5 text-center text-sm transition-colors has-[:focus]:z-10
									{n === 0 ? 'rounded-l-md' : '-ml-px'}
									{n === MAX_VOTE_VALUE ? 'rounded-r-md' : ''}
									{n <= 3
									? 'has-[:checked]:border-green-500 has-[:checked]:bg-green-100 has-[:checked]:text-green-700 has-[:focus]:ring-2 has-[:focus]:ring-green-500'
									: ''}
									{n >= 4 && n <= 6
									? 'has-[:checked]:border-gray-400 has-[:checked]:bg-gray-100 has-[:checked]:text-gray-700 has-[:focus]:ring-2 has-[:focus]:ring-gray-400'
									: ''}
									{n >= 7
									? 'has-[:checked]:border-red-500 has-[:checked]:bg-red-100 has-[:checked]:text-red-700 has-[:focus]:ring-2 has-[:focus]:ring-red-500'
									: ''}
								"
							>
								<input
									type="radio"
									name={piece}
									value={n}
									checked={savedVote === n || (savedVote === undefined && n === DEFAULT_RESISTANCE)}
									class="sr-only"
								/>
								{n}
							</label>
						{/each}
					</div>
					<div class="mt-1 flex justify-between text-xs text-gray-500">
						<span>Kein Widerstand</span>
						<span>Neutral</span>
						<span>Absolutes Veto</span>
					</div>
				</fieldset>
			{/each}
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			class="bg-cpc-500 hover:bg-cpc-700 w-full cursor-pointer rounded-lg px-6 py-3 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200 sm:mx-auto sm:w-auto sm:min-w-64"
			disabled={isSubmitting}
		>
			{isSubmitting ? 'Wird gesendet...' : 'Abschicken'}
		</button>
	</form>
</div>
