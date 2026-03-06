import { getAvailableSongs, submitVote } from '$lib/server/voting';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const pieces = await getAvailableSongs();

	return {
		pieces
	};
};

const MAX_VOTE_VALUE = 10;

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name')?.toString() ?? '';
		formData.delete('name');

		if (!name.trim()) {
			return fail(400, { error: 'Name ist erforderlich', values: { name, votes: {} } });
		}

		// Convert form data to votes object, validating 0–MAX_VOTE_VALUE integer range
		const votes: Record<string, number> = {};
		for (const [piece, value] of formData.entries()) {
			const numValue = Number(value);
			if (!Number.isInteger(numValue) || numValue < 0 || numValue > MAX_VOTE_VALUE) {
				return fail(400, { error: 'Ungültiger Stimmwert', values: { name, votes } });
			}
			votes[piece] = numValue;
		}

		const result = await submitVote(name, votes);

		if (!result.success) {
			return fail(400, { error: result.error, values: { name, votes } });
		}

		// Return success - client will navigate to results page
		return { success: true };
	}
} satisfies Actions;
