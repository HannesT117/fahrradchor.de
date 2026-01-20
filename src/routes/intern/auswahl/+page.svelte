<script lang="ts">
	import type { ActionData, PageData } from './$types';

	interface Props {
		data: PageData;
		form: ActionData;
	}
	const { data, form }: Props = $props();

	// Vote value constants
	const VOTE_YES = 1;
	const VOTE_NEUTRAL = 0;
	const VOTE_NO = -1;

	let isSubmitting = $state(false);

	// Reset submitting state when form response comes back
	$effect(() => {
		if (form) {
			isSubmitting = false;
		}
	});
</script>

<div class="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:px-8">
	<h1 class="text-cpc-500 text-5xl font-bold sm:text-6xl">Voting Lieder 2024</h1>

	<form method="POST" class="flex flex-col gap-6" onsubmit={() => (isSubmitting = true)}>
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
				class="focus:border-cpc-500 focus:ring-cpc-500 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:outline-none"
				placeholder="Vor- und Nachname"
				required
			/>
		</div>

		<!-- Song Voting Items -->
		<div class="space-y-6">
			{#each data.pieces as piece}
				<fieldset>
					<legend class="mb-2 font-medium">{piece}</legend>
					<div class="flex">
						<label class="flex-1 cursor-pointer rounded-l-md border border-gray-300 px-3 py-2.5 text-center transition-colors has-[:checked]:border-green-500 has-[:checked]:bg-green-100 has-[:checked]:text-green-700 has-[:focus]:z-10 has-[:focus]:ring-2 has-[:focus]:ring-green-500 sm:px-4 sm:py-3">
							<input type="radio" name={piece} value={VOTE_YES} class="sr-only" /> Singen
						</label>
						<label class="-ml-px flex-1 cursor-pointer border border-gray-300 px-3 py-2.5 text-center transition-colors has-[:checked]:border-gray-400 has-[:checked]:bg-gray-100 has-[:focus]:z-10 has-[:focus]:ring-2 has-[:focus]:ring-gray-400 sm:px-4 sm:py-3">
							<input type="radio" name={piece} value={VOTE_NEUTRAL} class="sr-only" /> Neutral
						</label>
						<label class="-ml-px flex-1 cursor-pointer rounded-r-md border border-gray-300 px-3 py-2.5 text-center transition-colors has-[:checked]:border-red-500 has-[:checked]:bg-red-100 has-[:checked]:text-red-700 has-[:focus]:z-10 has-[:focus]:ring-2 has-[:focus]:ring-red-500 sm:px-4 sm:py-3">
							<input type="radio" name={piece} value={VOTE_NO} class="sr-only" /> Nicht singen
						</label>
					</div>
				</fieldset>
			{/each}
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			class="bg-cpc-500 cursor-pointer hover:bg-cpc-700 w-full rounded-lg px-6 py-3 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200 sm:mx-auto sm:w-auto sm:min-w-64"
			disabled={isSubmitting}
		>
			{isSubmitting ? 'Wird gesendet...' : 'Abschicken'}
		</button>
	</form>
</div>
