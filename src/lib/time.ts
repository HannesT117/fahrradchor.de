const formatter = new Intl.DateTimeFormat('de-DE', {
	timeStyle: 'short',
	dateStyle: 'long'
});

export const createTimeString = (start: string, end: string) =>
	formatter.formatRange(new Date(start), new Date(end));
