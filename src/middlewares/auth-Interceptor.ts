import { getSession, restartSession, storeSession } from "@/lib/utils/auth";
import type { Request } from "@/types/request";
import type { ServerResponse } from "@/types/response";

export async function authenticate(req: Request, res: ServerResponse) {
    const key = req.headers.get('authorization')   
    if (!key) {
        return res.status(401, { message: 'Unauthorized' })
    }
    const session = await getSession(key)
    if (session === null) {
        return res.status(440, { message: 'Session Expired' })
    }
    await restartSession(key, 3)
}