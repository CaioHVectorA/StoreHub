import { AppError } from "../middlewares/appError";
import type { ApplicationProps } from "../types/application"
import type { Request } from "../types/request";
import type { Route, RouterInterface } from "../types/router-type";

// function getParams(request: Omit<Omit<Request, "params">, "query">, router: RouterInterface): { params: { [key: string]: string }, route?: Route } {
//     let params = {} satisfies { [key: string]: string }
//     const filtered = router.routes.filter((route) => route.pathname.includes(':') && route.method == request.method)
//     if (filtered.length == 0) return { params }
//     console.log(request.pathname, router.routes)

//     const routeFound = filtered.find((route) => {
//         return route.pathname.split('/').length === request.pathname.split('/').length
//     })
//     console.log({routeFound})
//     if (!routeFound) return { params }
//     const keys = routeFound.pathname.replaceAll(':','').split('/').slice(1)
//     const values = request.pathname.split('/').slice(1)
//     keys.forEach((i, index) => {
//         //@ts-ignore
//         params[i] = values[index]
//     })
//     return { params, route: routeFound }
// }

function getParams(request: Omit<Omit<Request, "params">, "query">, router: RouterInterface): { params: { [key: string]: string }, route?: Route } {
    let params: { [key: string]: string } = {} // Add index signature to params object
    let route: Route | undefined
    const splittedPathname = request.pathname.split('/').slice(1)
    const splittedRoute = router.routes.filter(route => route.method == request.method).map(route => route.pathname.split('/').slice(1))
    for (let x = 0; x < splittedRoute.length; x++) {
        if (route) break
        for (let y = 0; y < splittedRoute[x].length; y++) {
            if (!splittedRoute[x][y].includes(':') && splittedRoute[x][y] != splittedPathname[y]) break
            if (splittedRoute[x][y] == splittedPathname[y]) {
                if (y == splittedRoute[x].length - 1) {
                    route = router.routes[x]
                }
                continue
            }
            const key = splittedRoute[x][y].slice(1)
            params[key] = splittedPathname[y]
            if (y == splittedRoute[x].length - 1) {
                route = router.routes.filter(route => route.method == request.method)[x]
            }
        }
    }
    return { params, route }
}

export async function app({ request, response }: ApplicationProps, mainRouter: RouterInterface) {
    // implement params, query logic
    let { params, route: routeFound } = getParams(request, mainRouter)
    const req = { ...request, params, query: {} } satisfies Request
    const route = mainRouter.routes.find(route => route.pathname == req.pathname && route.method == req.method) || routeFound
    // todo catch route not found error!
    try {
        if (!route) {
            const file = Bun.file(`${process.cwd()}/public/${request.pathname}`)
            const exists = await file.exists()
            if (exists) {
                return response.file(file)
            }
            throw new AppError(`Route ${request.pathname} not found`, 404)
        }

        for (const callback of route.callback) {
            const result = await callback(req, response)
            if (result) {
                return result
            }
        }
    } catch (error) {
        if (error instanceof AppError) {
            return response.status(error.statusCode || 400, {
            status: "error",
            message: error.message,
          })
        }
        console.log(error)
        return response.status(500, {
            status: "error",
            message: `Internal server error - ${error.message}`,
        })
    }
}
