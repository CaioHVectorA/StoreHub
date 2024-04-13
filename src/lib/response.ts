import type { ServerResponse } from "../types/response"
export const getResponse = (response: Response) => {
    return { 
        json: (data) => {
            response = new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' }, status: 200 })
            return response
        },
        status: (status, json?: any) => {
            response = new Response(JSON.stringify(json), { status: status })
            return response
        }
    } satisfies ServerResponse
}
