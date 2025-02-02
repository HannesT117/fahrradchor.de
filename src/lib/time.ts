const formatter = new Intl.DateTimeFormat('de-DE', {
	timeStyle: 'short',
	dateStyle: 'long'
});

const withoutTimezone = (date: string) =>
	new Date(new Date(date).getTime() - new Date().getTimezoneOffset());

/**
 *
 * @param start The Start Date in the format YYYY-MM-DDTHH:MM
 * @param end The End Date in the format YYYY-MM-DDTHH:MM
 * @returns a German string representation of the given time range
 */
export const createTimeString = (start: string, end: string) =>
	formatter.formatRange(withoutTimezone(start), withoutTimezone(end));
