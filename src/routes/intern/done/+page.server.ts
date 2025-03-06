import { download } from '$lib/server/blob';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const { pieces } = await download('results.json');
    const sorted = Object.entries(pieces).sort((p1, p2) => p2[1] - p1[1]);

	return {
		pieces: sorted
	};
};
