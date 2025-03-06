import { INTERNAL_TOKEN } from '$env/static/private';
import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ cookies, url }) => {
    if(url.searchParams.get('token') !== INTERNAL_TOKEN && cookies.get('token') !== INTERNAL_TOKEN) {
        redirect(307, '/');
    }

    cookies.set('token', INTERNAL_TOKEN, { path: url.host });
};
