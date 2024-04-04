import type { Methods } from "./methods"

export type ApplicationProps = {
    params: {[key: string]: any},
    pathname: string,
    method: Methods,
    body: any
    searchParams: URLSearchParams
    // todo: More props
}
