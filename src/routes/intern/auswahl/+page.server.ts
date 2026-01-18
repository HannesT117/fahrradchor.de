import { getAvailableSongs, submitVote } from '$lib/server/voting';
import { fail, redirect } from '@sveltejs/kit';
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

		const name = formData.get('name')?.toString();
		if (!name) {
			return fail(400, { error: 'Name ist erforderlich' });
		}

		formData.delete('name');

		// Convert form data to votes object
		const votes: Record<string, number> = {};
		for (const [piece, value] of formData.entries()) {
			votes[piece] = Number(value);
		}

		const result = await submitVote(name, votes);

		if (!result.success) {
			return fail(400, { error: result.error });
		}

		return redirect(302, '/intern/done');
	}
} satisfies Actions;
