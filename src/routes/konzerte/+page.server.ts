import { createTimeString } from '$lib/time';
import type { PageServerLoad } from './$types';
import path from 'path';

export const prerender = true;
const files = import.meta.glob('$lib/konzerte/*.{md,svx,svelte.md}');
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

		return {
			...metadata,
			time: createTimeString(metadata.start, metadata.end),
			slug: path.parse(k.path).name
		};
	})
	.sort((k) => new Date(k.end).getDate());

const present = new Date();
const past = konzerte.filter((konzert) => new Date(konzert.end) < present);
const future = konzerte.filter((konzert) => new Date(konzert.end) > present);

export const load: PageServerLoad = async () => {
	return {
		pastKonzerte: past,
		futureKonzerte: future
	};
};
