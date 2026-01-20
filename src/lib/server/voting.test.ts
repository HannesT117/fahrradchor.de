import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the blob module
vi.mock('./blob', () => ({
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
		const result = await submitVote('', { 'Song A': 1 });

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe('Name ist erforderlich');
		}
	});

	it('should reject whitespace-only name', async () => {
		const result = await submitVote('   ', { 'Song A': 1 });

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

		const result = await submitVote('Alice', { 'Song A': 1 });

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

		const result = await submitVote('Bob', { 'Song A': 1, 'Song B': -1 });

		expect(result.success).toBe(true);
		expect(mockPut).toHaveBeenCalledWith(
			'results.json',
			expect.stringContaining('"Song A":6'),
			expect.any(Object)
		);
	});

	it('should handle vote value of 0 (neutral)', async () => {
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

	it('should handle negative votes correctly', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 5 },
			people: []
		});

		const result = await submitVote('Dave', { 'Song A': -1 });

		expect(result.success).toBe(true);
		expect(mockPut).toHaveBeenCalledWith(
			'results.json',
			expect.stringContaining('"Song A":4'),
			expect.any(Object)
		);
	});

	it('should add new song to pieces if not exists', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 5 },
			people: []
		});

		const result = await submitVote('Eve', { 'Song B': 1 });

		expect(result.success).toBe(true);
		expect(mockPut).toHaveBeenCalledWith(
			'results.json',
			expect.stringContaining('"Song B":1'),
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

	it('should return sorted results by vote count descending', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': 5, 'Song B': 10, 'Song C': 3 },
			people: ['Alice', 'Bob']
		});

		const results = await getResults();

		expect(results.pieces).toEqual([
			['Song B', 10],
			['Song A', 5],
			['Song C', 3]
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

	it('should handle negative vote totals', async () => {
		mockGetVotingResults.mockResolvedValue({
			pieces: { 'Song A': -5, 'Song B': 3 },
			people: ['Alice']
		});

		const results = await getResults();

		expect(results.pieces).toEqual([
			['Song B', 3],
			['Song A', -5]
		]);
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
