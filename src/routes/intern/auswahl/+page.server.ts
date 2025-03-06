import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { download } from '$lib/server/blob';
import { fail, redirect } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { pieces } = await download('songlist.json');

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

			const results = await download('results.json');

			if (results.people.includes(name?.valueOf())) {
				return fail(400, { duplicate: true });
			}

			const pieces = formData.entries();
			pieces.forEach(([piece, value]) => {
				results.pieces[piece] = +(results.pieces[piece] ?? 0) + +value;
			});
			results['people'].push(name);

			await put('results.json', JSON.stringify(results), {
				cacheControlMaxAge: 5,
				addRandomSuffix: false,
				access: 'public',
				token: BLOB_READ_WRITE_TOKEN
			});
		} catch (e: any) {
			return fail(500, e);
		}

		return redirect(303, '/intern/done');
	}
} satisfies Actions;
