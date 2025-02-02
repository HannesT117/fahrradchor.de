import { createTimeString } from '$lib/time';
import type { PageLoad } from './$types';

const files = import.meta.glob('$lib/konzerte/*.{md,svx,svelte.md}');
const konzerte = new Map(Object.entries(files));

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;
	try {
		const konzert = konzerte.get(`/src/lib/konzerte/${slug}.md`);
		if (!konzert) {
			return;
		}

		const file = await konzert();

		return {
			MDComponent: file.default,
			meta: {
				...file.metadata,
				time: createTimeString(file.metadata.start, file.metadata.end)
			}
		};
	} catch (err) {
		console.error('Error loading the post:', err);
		return {
			status: 500,
			error: `Could not load the post: ${err.message || err}`
		};
	}
};
