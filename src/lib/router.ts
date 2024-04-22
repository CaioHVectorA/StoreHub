import type { RouterInterface, Route, ReqResCallback } from "@/types/router-type"

export class Router implements RouterInterface {
    routes: Route[] = []
    constructor() {}
    public get(pathname: string, ...handler: ReqResCallback[]) {
         this.routes.push({
            method: 'GET',
            callback: handler,
            pathname: pathname
         })
    }
    public post(pathname: string, ...handler: ReqResCallback[]) {
        this.routes.push({
            method: 'POST',
            callback: handler,
            pathname: pathname
         })
    }
    public put(pathname: string, ...handler: ReqResCallback[]) {
        this.routes.push({
            method: 'PUT',
            callback: handler,
            pathname: pathname
         })
    }
    public del(pathname: string, ...handler: ReqResCallback[]) {
        this.routes.push({
            method: 'DELETE',
            callback: handler,
            pathname: pathname
         })
    }
    public use(handle: RouterInterface | Route, pathname?: string) {
        if ((handle as Route).callback) {
            return this.routes.push(handle as Route);
        } 
        return ((routerInterface: RouterInterface) => {
            let routes = routerInterface.routes
            if (pathname) routes.map((route) => route.pathname = `${pathname}${route.pathname}`)
            this.routes.push(...routes)
        })(handle as RouterInterface)
    }
}