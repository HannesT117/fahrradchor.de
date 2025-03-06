import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { list } from '@vercel/blob';

export const download = async (name: string) => {
    const { blobs } = await list({ token: BLOB_READ_WRITE_TOKEN});
    const url = blobs.find(blob => blob.pathname.endsWith(name))?.downloadUrl;
    if(!url) {
        throw Error('Results could not be downloaded.');
    }

    return await fetch(url).then(stringified => stringified.json());
}