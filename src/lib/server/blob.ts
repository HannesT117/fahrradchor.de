import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { list } from '@vercel/blob';

// Type definitions for blob storage data structures
export interface Songlist {
	pieces: string[];
}

export interface VotingResults {
	pieces: Record<string, number>;
	people: string[];
}

export const download = async (name: string) => {
	const { blobs } = await list({ token: BLOB_READ_WRITE_TOKEN });
	const url = blobs.find((blob) => blob.pathname.endsWith(name))?.downloadUrl;
	if (!url) {
		throw Error('Results could not be downloaded.');
	}

	return await fetch(url).then((stringified) => stringified.json());
};

// Typed wrapper functions
export const getSonglist = async (): Promise<Songlist> => {
	return await download('songlist.json');
};

export const getVotingResults = async (): Promise<VotingResults> => {
	return await download('results.json');
};
