import { getAvailableSongs, submitVote } from '$lib/server/voting';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const pieces = await getAvailableSongs();

	return {
		pieces
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name')?.toString() ?? '';
		formData.delete('name');

		// Convert form data to votes object
		const votes: Record<string, number> = {};
		for (const [piece, value] of formData.entries()) {
			votes[piece] = Number(value);
		}

		if (!name.trim()) {
			return fail(400, { error: 'Name ist erforderlich', values: { name, votes } });
		}

		const result = await submitVote(name, votes);

		if (!result.success) {
			return fail(400, { error: result.error, values: { name, votes } });
		}

		// Return success - client will navigate to results page
		return { success: true };
	}
} satisfies Actions;
