import { describe, it, expect } from 'vitest';
import { createTimeString, createDateTimeStrings } from './time';

// Unicode characters used by Intl.DateTimeFormat
const THIN_SPACE = '\u2009'; // char code 8201
const EN_DASH = '\u2013'; // char code 8211

describe('createTimeString', () => {
	it('should format a same-day time range correctly', () => {
		const result = createTimeString('2024-06-15T14:00', '2024-06-15T16:00');
		expect(result).toBe('15. Juni 2024, 14:00–16:00 Uhr');
	});

	it('should format a multi-day time range correctly', () => {
		const result = createTimeString('2024-06-15T14:00', '2024-06-17T16:00');
		expect(result).toBe(
			`15. Juni 2024 um 14:00${THIN_SPACE}${EN_DASH}${THIN_SPACE}17. Juni 2024 um 16:00`
		);
	});

	it('should handle dates spanning months', () => {
		const result = createTimeString('2024-06-30T14:00', '2024-07-02T16:00');
		expect(result).toBe(
			`30. Juni 2024 um 14:00${THIN_SPACE}${EN_DASH}${THIN_SPACE}2. Juli 2024 um 16:00`
		);
	});

	it('should handle dates spanning years', () => {
		const result = createTimeString('2024-12-31T20:00', '2025-01-01T02:00');
		expect(result).toBe(
			`31. Dezember 2024 um 20:00${THIN_SPACE}${EN_DASH}${THIN_SPACE}1. Januar 2025 um 02:00`
		);
	});
});

describe('createDateTimeStrings', () => {
	it('should return separate date and time strings for same-day event', () => {
		const result = createDateTimeStrings('2024-06-15T14:00', '2024-06-15T16:00');

		expect(result).toEqual({
			date: '15. Juni 2024',
			time: '14:00–16:00 Uhr'
		});
	});

	it('should return date range for multi-day event', () => {
		const result = createDateTimeStrings('2024-06-15T14:00', '2024-06-17T16:00');

		// Multi-day events show full date+time in the time field
		expect(result).toEqual({
			date: '15.–17. Juni 2024',
			time: `15.6.2024, 14:00${THIN_SPACE}${EN_DASH}${THIN_SPACE}17.6.2024, 16:00`
		});
	});

	it('should handle midnight times correctly', () => {
		const result = createDateTimeStrings('2024-06-15T00:00', '2024-06-15T23:59');

		expect(result).toEqual({
			date: '15. Juni 2024',
			time: '00:00–23:59 Uhr'
		});
	});

	it('should handle noon times correctly', () => {
		const result = createDateTimeStrings('2024-06-15T12:00', '2024-06-15T13:00');

		expect(result).toEqual({
			date: '15. Juni 2024',
			time: '12:00–13:00 Uhr'
		});
	});
});

describe('edge cases', () => {
	it('should handle start and end being the same time', () => {
		const result = createTimeString('2024-06-15T14:00', '2024-06-15T14:00');
		expect(result).toBe('15. Juni 2024 um 14:00');
	});

	it('should handle end before start gracefully', () => {
		// This is an invalid case but should not crash
		const result = createTimeString('2024-06-15T16:00', '2024-06-15T14:00');
		expect(typeof result).toBe('string');
	});

	it('should handle ISO date strings with seconds', () => {
		const result = createTimeString('2024-06-15T14:00:00', '2024-06-15T16:00:00');
		expect(result).toBe('15. Juni 2024, 14:00–16:00 Uhr');
	});

	it('should handle ISO date strings with timezone offset', () => {
		// The function uses withoutTimezone which adjusts for local timezone
		const result = createTimeString('2024-06-15T14:00+02:00', '2024-06-15T16:00+02:00');
		expect(typeof result).toBe('string');
		expect(result.length).toBeGreaterThan(0);
	});
});
