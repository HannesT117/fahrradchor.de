import { createDateTimeStrings } from '$lib/time';
import type { PageServerLoad } from './$types';

interface KonzertMetadata {
	title: string;
	start: string;
	end: string;
	venue: string;
	street: string;
	plz: string;
	place: string;
	link?: string;
}

const files = import.meta.glob<{ metadata: KonzertMetadata }>('$lib/konzerte/*.{md,svx,svelte.md}');
const mapped = Object.entries(files).map(async ([path, res]) => {
	const module = await res();

	return {
		module,
		path
	};
});
const konzerte = (await Array.fromAsync(mapped))
	.map((k) => {
		const { metadata } = k.module;
		const { date, time } = createDateTimeStrings(metadata.start, metadata.end);

		return {
			...metadata,
			date,
			time
		};
	})
	.sort((a, b) => new Date(a.end).getTime() - new Date(b.end).getTime());

const present = new Date();
const past = konzerte.filter((konzert) => new Date(konzert.end) < present);
const future = konzerte.filter((konzert) => new Date(konzert.end) > present);

export const load: PageServerLoad = async () => {
	return {
		pastKonzerte: past,
		futureKonzerte: future
	};
};
