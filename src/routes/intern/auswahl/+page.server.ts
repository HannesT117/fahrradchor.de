import { getSonglist, getVotingResults, saveVotingResults } from '$lib/server/blob';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { pieces } = await getSonglist();

	return {
		pieces
	};
};

export const actions = {
	default: async ({ request }) => {
		try {
			const formData = await request.formData();

			const name = formData.get('name')?.toString();

			if (!name) {
				return fail(400, { error: 'Name ist erforderlich' });
			}

			formData.delete('name');

			const results = await getVotingResults();

			if (results.people.includes(name)) {
				return fail(400, {
					error: 'Unter diesem Namen hat leider schon eine Person teilgenommen.'
				});
			}

			const pieces = formData.entries();
			[...pieces].forEach(([piece, value]) => {
				results.pieces[piece] = (results.pieces[piece] ?? 0) + Number(value);
			});
			results.people.push(name);

			await saveVotingResults(results);
		} catch (e: any) {
			return fail(500, { error: e.message });
		}

		return redirect(302, '/intern/done');
	}
} satisfies Actions;
