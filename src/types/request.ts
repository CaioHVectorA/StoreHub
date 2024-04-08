import type { Methods } from "./methods";

export type Request = {
    body: any;
    params: { [key: string]: string };
    query: { [key: string]: string };
    headers: Headers;
    method: Methods;
    url: string;
    pathname: string;
    cookies: string | null;
}