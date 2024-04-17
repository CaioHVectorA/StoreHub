import { AppError } from "../middlewares/appError";
import type { ApplicationProps } from "../types/application"
import type { Request } from "../types/request";
import type { Route, RouterInterface } from "../types/router-type";

function getParams(request: Omit<Omit<Request, "params">, "query">, router: RouterInterface): { params: { [key: string]: string }, route?: Route } {
    let params = {} satisfies { [key: string]: string }
    const filtered = router.routes.filter((route) => route.pathname.includes(':') && route.method == request.method)
    if (filtered.length == 0) return { params }
    const routeFound = filtered.find((route) => {
        return route.pathname.split('/').length === request.pathname.split('/').length
    })
    if (!routeFound) return { params }
    const keys = routeFound.pathname.replaceAll(':','').split('/').slice(1)
    const values = request.pathname.split('/').slice(1)
    keys.forEach((i, index) => {
        //@ts-ignore
        params[i] = values[index]
    })
    return { params, route: routeFound }
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
            console.log(exists)
            if (exists) {
                return response.file(file)
            }
            throw new AppError(`Route ${request.pathname} not found`, 404)
        } 
        await route.callback(req, response)
    } catch (error) {
        if (error instanceof AppError) {
            return response.status(error.statusCode || 400, {
            status: "error",
            message: error.message,
          })
        }
        return response.status(500, {
            status: "error",
            message: `Internal server error - ${error.message}`,
        })
    }
}
