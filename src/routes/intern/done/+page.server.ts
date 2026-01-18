import { getResults } from '$lib/server/voting';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { pieces, participantCount } = await getResults();

	return {
		pieces,
		numberOfParticipants: participantCount
	};
};
