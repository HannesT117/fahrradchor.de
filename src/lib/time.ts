const formatter = new Intl.DateTimeFormat('de-DE', {
	timeStyle: 'short',
	dateStyle: 'long'
});

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
	dateStyle: 'long'
});

const timeFormatter = new Intl.DateTimeFormat('de-DE', {
	timeStyle: 'short'
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

/**
 *
 * @param start The Start Date in the format YYYY-MM-DDTHH:MM
 * @param end The End Date in the format YYYY-MM-DDTHH:MM
 * @returns an object with separate date and time strings
 */
export const createDateTimeStrings = (start: string, end: string) => {
	const startDate = withoutTimezone(start);
	const endDate = withoutTimezone(end);

	return {
		date: dateFormatter.formatRange(startDate, endDate),
		time: timeFormatter.formatRange(startDate, endDate)
	};
};
