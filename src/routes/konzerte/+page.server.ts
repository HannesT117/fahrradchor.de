import type { Config } from '@sveltejs/adapter-vercel';
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

// Keep the past/future split current without redeploying: ISR refreshes daily.
// Mutually exclusive with the root layout's prerender=true for this route.
export const prerender = false;

export const config: Config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const load: PageServerLoad = async () => {
	const mapped = Object.entries(files).map(async ([, res]) => {
		const { metadata } = await res();
		const { date, time } = createDateTimeStrings(metadata.start, metadata.end);
		return { ...metadata, date, time };
	});

	const konzerte = await Promise.all(mapped);

	const present = new Date();

	return {
		pastKonzerte: konzerte
			.filter((k) => new Date(k.end) < present)
			.sort((a, b) => new Date(b.end).getTime() - new Date(a.end).getTime()),
		futureKonzerte: konzerte
			.filter((k) => new Date(k.end) > present)
			.sort((a, b) => new Date(a.end).getTime() - new Date(b.end).getTime())
	};
};
