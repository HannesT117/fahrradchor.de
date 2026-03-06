import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the blob module
vi.mock('./blob', () => ({
	getVotingResults: vi.fn(),
	getSonglist: vi.fn(),
	RESULTS_FILENAME: 'results.json'
}));

// Mock @vercel/blob
vi.mock('@vercel/blob', () => ({
	put: vi.fn()
}));

// Mock environment variables
vi.mock('$env/static/private', () => ({
	BLOB_READ_WRITE_TOKEN: 'mock-token'
}));

import { getAvailableSongs, submitVote, getResults } from './voting';
import { getVotingResults, getSonglist } from './blob';
import { put } from '@vercel/blob';

const mockGetVotingResults = vi.mocked(getVotingResults);
const mockGetSonglist = vi.mocked(getSonglist);
const mockPut = vi.mocked(put);

describe('getAvailableSongs', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return list of available songs', async () => {
		mockGetSonglist.mockResolvedValue({
			pieces: ['Song A', 'Song B', 'Song C']
		});

		const songs = await getAvailableSongs();

		expect(songs).toEqual(['Song A', 'Song B', 'Song C']);
		expect(mockGetSonglist).toHaveBeenCalledOnce();
	});

	it('should return empty array when no songs available', async () => {
		mockGetSonglist.mockResolvedValue({ pieces: [] });

		const songs = await getAvailableSongs();

		expect(songs).toEqual([]);
	});
});

describe('submitVote', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockPut.mockResolvedValue({} as ReturnType<typeof put> extends Promise<infer T> ? T : never);
	});

	it('should reject empty name', async () => {
		const result = await submitVote('', { 'Song A': 5 });

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe('Name ist erforderlich');
		}
	});

	it('should reject whitespace-only name', async () => {
		const result = await submitVote('   ', { 'Song A': 5 });

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe('Name ist erforderlich');
		}
	});

	it('should reject duplicate voter', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 5 },
			people: ['Alice', 'Bob']
		});

		const result = await submitVote('Alice', { 'Song A': 5 });

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toContain('schon eine Person teilgenommen');
		}
	});

	it('should accept new voter and tally votes correctly', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 5, 'Song B': 3 },
			people: ['Alice']
		});

		// Bob votes: Song A = 3 (low resistance), Song B = 7 (higher resistance)
		const result = await submitVote('Bob', { 'Song A': 3, 'Song B': 7 });

		expect(result.success).toBe(true);
		expect(mockPut).toHaveBeenCalledWith(
			'results.json',
			expect.stringContaining('"Song A":8'),
			expect.any(Object)
		);
	});

	it('should handle vote value of 0 (kein Widerstand)', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 5 },
			people: []
		});

		const result = await submitVote('Charlie', { 'Song A': 0 });

		expect(result.success).toBe(true);
		expect(mockPut).toHaveBeenCalledWith(
			'results.json',
			expect.stringContaining('"Song A":5'),
			expect.any(Object)
		);
	});

	it('should handle vote value of 10 (absolutes Veto)', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 5 },
			people: []
		});

		const result = await submitVote('Dave', { 'Song A': 10 });

		expect(result.success).toBe(true);
		expect(mockPut).toHaveBeenCalledWith(
			'results.json',
			expect.stringContaining('"Song A":15'),
			expect.any(Object)
		);
	});

	it('should add new song to pieces if not exists', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 5 },
			people: []
		});

		const result = await submitVote('Eve', { 'Song B': 5 });

		expect(result.success).toBe(true);
		expect(mockPut).toHaveBeenCalledWith(
			'results.json',
			expect.stringContaining('"Song B":5'),
			expect.any(Object)
		);
	});

	it('should handle blob storage failure', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: {},
			people: []
		});
		mockPut.mockRejectedValue(new Error('Network error'));

		const result = await submitVote('Frank', { 'Song A': 1 });

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe('Network error');
		}
	});

	it('should add voter name to people list', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: {},
			people: ['Alice']
		});

		await submitVote('Bob', {});

		expect(mockPut).toHaveBeenCalledWith(
			'results.json',
			expect.stringContaining('"people":["Alice","Bob"]'),
			expect.any(Object)
		);
	});
});

describe('getResults', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return results as resistance % sorted ascending (lowest resistance first)', async () => {
		// 2 participants
		// Song A: sum=10, resistance = 10*10/2 = 50%
		// Song B: sum=4,  resistance = 4*10/2  = 20%
		// Song C: sum=16, resistance = 16*10/2 = 80%
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 10, 'Song B': 4, 'Song C': 16 },
			people: ['Alice', 'Bob']
		});

		const results = await getResults();

		expect(results.pieces).toEqual([
			['Song B', 20],
			['Song A', 50],
			['Song C', 80]
		]);
		expect(results.participantCount).toBe(2);
	});

	it('should handle empty results', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: {},
			people: []
		});

		const results = await getResults();

		expect(results.pieces).toEqual([]);
		expect(results.participantCount).toBe(0);
	});

	it('should return 0% resistance when no participants', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 0 },
			people: []
		});

		const results = await getResults();

		expect(results.pieces).toEqual([['Song A', 0]]);
		expect(results.participantCount).toBe(0);
	});
});

describe('duplicate voter edge cases', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should allow different case names (case-sensitive check)', async () => {
		// Note: This test documents current behavior - the check IS case-sensitive
		// This may be a bug that should be fixed
		mockGetVotingResults.mockResolvedValue({
			pieces: {},
			people: ['alice']
		});
		mockPut.mockResolvedValue({} as ReturnType<typeof put> extends Promise<infer T> ? T : never);

		const result = await submitVote('Alice', {});

		// Current implementation allows this - documenting the behavior
		expect(result.success).toBe(true);
	});

	it('should detect exact duplicate names', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: {},
			people: ['Alice']
		});

		const result = await submitVote('Alice', {});

		expect(result.success).toBe(false);
	});
});
