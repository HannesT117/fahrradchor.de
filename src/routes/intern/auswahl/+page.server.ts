import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { getSonglist, getVotingResults } from '$lib/server/blob';
import { fail, redirect } from '@sveltejs/kit';
import { put } from '@vercel/blob';
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

			const name = formData.get('name');
			formData.delete('name');

			const results = await getVotingResults();

			if (results.people.includes(name?.valueOf() as string)) {
				return fail(400, { duplicate: true });
			}

			const pieces = formData.entries();
			[...pieces].forEach(([piece, value]) => {
				results.pieces[piece] = (results.pieces[piece] ?? 0) + Number(value);
			});
			results.people.push(name as string);

			await put('results.json', JSON.stringify(results), {
				cacheControlMaxAge: 5,
				addRandomSuffix: false,
				access: 'public',
				token: BLOB_READ_WRITE_TOKEN
			});
		} catch (e: any) {
			return fail(500, { error: e.message });
		}

		return redirect(302, '/intern/done');
	}
} satisfies Actions;
