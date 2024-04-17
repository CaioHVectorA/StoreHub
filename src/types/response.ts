import type { BunFile } from "bun";

export type ServerResponse = {
    json: (body?: any) => Response;
    status: (code: number, json?: any) => Response;
    file: (file: BunFile) => Response
    // cookie: (name: string, value: any, options?: any) => Response;
    // clearCookie: (name: string, options?: any) => Response;
    // redirect: (url: string, status?: number) => void;
    // todo: implement some methods
}