import type { ApplicationProps } from "../types/application"
import type { Request } from "../types/request";
import type { RouterInterface } from "../types/router-type";

export function app({ request, response }: ApplicationProps, mainRouter: RouterInterface) {
    const req = { ...request, params: {}, query: {} } satisfies Request 
    switch(request.method) {
        case 'GET':{
            const route = mainRouter.routes.find((route) => route.pathname == request.pathname && route.method == 'GET')
            // todo - catch route error
            route?.callback(request as Request, response )
            break;
            }
            case 'POST':{
                const route = mainRouter.routes.find((route) => route.pathname == request.pathname && route.method == 'POST')
                // todo - catch route error
                route?.callback(request as Request, response )
                break;
                }
            case 'PUT':{
                const route = mainRouter.routes.find((route) => route.pathname == request.pathname && route.method == 'PUT')
                // todo - catch route error
                route?.callback(request as Request, response )
                break;
                }
            case 'DELETE':{
                const route = mainRouter.routes.find((route) => route.pathname == request.pathname && route.method == 'DELETE')
                // todo - catch route error
                route?.callback(request as Request, response )
                break;
                }
    }
}
