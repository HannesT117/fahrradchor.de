import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { put } from '@vercel/blob';
import { getVotingResults, getSonglist, RESULTS_FILENAME } from './blob';
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
 * @param votes - Record of piece names to resistance values (0–10)
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

const MAX_VOTE_VALUE = 10;

/**
 * Get current voting results as resistance percentages, sorted ascending (lowest resistance first)
 */
export const getResults = async (): Promise<{
	pieces: [string, number][];
	participantCount: number;
}> => {
	const { pieces, people } = await getVotingResults();
	const participantCount = people.length;
	const sorted = Object.entries(pieces)
		.map(([name, sum]): [string, number] => [
			name,
			// resistance % = (average vote / max vote) × 100
			participantCount > 0 ? (sum / participantCount / MAX_VOTE_VALUE) * 100 : 0
		])
		.sort(([, a], [, b]) => a - b);

	return { pieces: sorted, participantCount };
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
	await put(RESULTS_FILENAME, JSON.stringify(results), {
		cacheControlMaxAge: 5,
		allowOverwrite: true,
		addRandomSuffix: false,
		access: 'public',
		token: BLOB_READ_WRITE_TOKEN
	});
}
