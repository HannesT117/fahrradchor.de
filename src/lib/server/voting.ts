import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { put } from '@vercel/blob';
import { getVotingResults, getSonglist } from './blob';
import type { VotingResults } from './blob';

/**
 * Get the list of available songs for voting
 */
export const getAvailableSongs = async (): Promise<string[]> => {
	const { pieces } = await getSonglist();
	return pieces;
};

/**
 * Submit a vote for a user
 * @param name - The name of the voter
 * @param votes - Record of piece names to vote values (1, 0, -1)
 * @returns Success status or error message
 */
export const submitVote = async (
	name: string,
	votes: Record<string, number>
): Promise<{ success: true } | { success: false; error: string }> => {
	if (!name || name.trim() === '') {
		return { success: false, error: 'Name ist erforderlich' };
	}

	const results = await getVotingResults();

	// Check for duplicate voter
	if (results.people.includes(name)) {
		return {
			success: false,
			error: 'Unter diesem Namen hat leider schon eine Person teilgenommen.'
		};
	}

	// Tally the votes
	const updatedResults = tallyVotes(results, votes);
	updatedResults.people.push(name);

	// Save to blob storage
	try {
		await saveResults(updatedResults);
		return { success: true };
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Fehler beim Speichern der Stimme'
		};
	}
};

/**
 * Get current voting results
 */
export const getResults = async (): Promise<{
	pieces: [string, number][];
	participantCount: number;
}> => {
	const { pieces, people } = await getVotingResults();
	const sorted = Object.entries(pieces).sort(([, a], [, b]) => b - a);

	return {
		pieces: sorted,
		participantCount: people.length
	};
};

// Private helper functions

/**
 * Apply new votes to existing results
 */
function tallyVotes(results: VotingResults, newVotes: Record<string, number>): VotingResults {
	const pieces = { ...results.pieces };

	for (const [piece, value] of Object.entries(newVotes)) {
		pieces[piece] = (pieces[piece] ?? 0) + value;
	}

	return {
		pieces,
		people: [...results.people]
	};
}

/**
 * Save voting results to blob storage
 */
async function saveResults(results: VotingResults): Promise<void> {
	await put('results.json', JSON.stringify(results), {
		cacheControlMaxAge: 5,
		addRandomSuffix: false,
		access: 'public',
		token: BLOB_READ_WRITE_TOKEN
	});
}
