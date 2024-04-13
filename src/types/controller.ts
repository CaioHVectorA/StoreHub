import type { ReqResCallback } from "./router-type"

export interface Controller {
    [key: string]: ReqResCallback
}