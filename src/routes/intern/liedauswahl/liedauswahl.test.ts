import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the blob module
vi.mock('$lib/server/blob', () => ({
	getVotingResults: vi.fn(),
	getSonglist: vi.fn()
}));

// Mock @vercel/blob
vi.mock('@vercel/blob', () => ({
	put: vi.fn()
}));

// Mock environment variables
vi.mock('$env/static/private', () => ({
	BLOB_READ_WRITE_TOKEN: 'mock-token'
}));

import { getAvailableSongs, submitVote, getResults } from '$lib/server/voting';
import { getVotingResults, getSonglist } from '$lib/server/blob';
import { put } from '@vercel/blob';

const mockGetVotingResults = vi.mocked(getVotingResults);
const mockGetSonglist = vi.mocked(getSonglist);
const mockPut = vi.mocked(put);

describe('Liedauswahl voting flow integration', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockPut.mockResolvedValue({} as ReturnType<typeof put> extends Promise<infer T> ? T : never);
	});

	it('should complete full voting flow: get songs, submit vote, get updated results', async () => {
		// Setup: Initial state with some existing votes
		const initialResults = {
			pieces: { 'Song A': 5, 'Song B': 3 },
			people: ['Alice']
		};

		mockGetSonglist.mockResolvedValue({
			pieces: ['Song A', 'Song B', 'Song C']
		});
		mockGetVotingResults.mockResolvedValue(initialResults);

		// Step 1: Get available songs (simulates page load)
		const songs = await getAvailableSongs();
		expect(songs).toEqual(['Song A', 'Song B', 'Song C']);

		// Step 2: Submit vote
		const voteResult = await submitVote('Bob', {
			'Song A': 1,
			'Song B': -1,
			'Song C': 0
		});
		expect(voteResult.success).toBe(true);

		// Step 3: Verify vote was saved with correct tally
		expect(mockPut).toHaveBeenCalledWith('results.json', expect.any(String), expect.any(Object));

		// Parse the saved data to verify vote was tallied correctly
		const savedData = JSON.parse(mockPut.mock.calls[0][1] as string);
		expect(savedData.pieces['Song A']).toBe(6); // 5 + 1
		expect(savedData.pieces['Song B']).toBe(2); // 3 + (-1)
		expect(savedData.pieces['Song C']).toBe(0); // 0 + 0
		expect(savedData.people).toContain('Bob');

		// Step 4: Get results (simulates navigating to results page)
		// Update mock to return the new state
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 6, 'Song B': 2, 'Song C': 0 },
			people: ['Alice', 'Bob']
		});

		const results = await getResults();
		expect(results.participantCount).toBe(2);
		expect(results.pieces[0]).toEqual(['Song A', 6]); // Highest score first
	});

	it('should reject duplicate submission and not update results', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 5 },
			people: ['Alice']
		});

		// Try to vote again as Alice
		const result = await submitVote('Alice', { 'Song A': 1 });

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toContain('schon eine Person teilgenommen');
		}

		// Verify no data was saved
		expect(mockPut).not.toHaveBeenCalled();
	});

	it('should show results reflecting the new vote immediately after submission', async () => {
		// Initial state
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 0 },
			people: []
		});

		// Submit vote
		const voteResult = await submitVote('NewVoter', { 'Song A': 1 });
		expect(voteResult.success).toBe(true);

		// After successful vote, the results page fetches fresh data
		// Simulate what happens when navigating to /intern/liedauswahl/ergebnis
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 1 },
			people: ['NewVoter']
		});

		const results = await getResults();

		// The new vote should be reflected
		expect(results.pieces).toEqual([['Song A', 1]]);
		expect(results.participantCount).toBe(1);
	});

	it('should reject resubmission with same name after navigating back', async () => {
		// First submission succeeds
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 0 },
			people: []
		});

		const firstResult = await submitVote('ReturningUser', { 'Song A': 1 });
		expect(firstResult.success).toBe(true);

		// User navigates back and tries to submit again
		// Server now has the user in people list
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 1 },
			people: ['ReturningUser']
		});

		const secondResult = await submitVote('ReturningUser', { 'Song A': -1 });
		expect(secondResult.success).toBe(false);
		if (!secondResult.success) {
			expect(secondResult.error).toContain('schon eine Person teilgenommen');
		}
	});
});
