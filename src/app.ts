import http, { IncomingMessage, ServerResponse } from "node:http";
import { Handler, Middleware, Route } from "./types";

export function createApp() {
  const routes: Route[] = [];
  const middleware: Middleware[] = [];

  const app = (req: IncomingMessage, res: ServerResponse) => {
    let index = 0;
    //JSON helper
    (res as any).json = (data: any) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    };

    const next = () => {
      const mw = middleware[index++];
      if (mw) {
        return mw(req, res, next);
      }
      const route = routes.find(
        (r) => r.method === req.method && r.path === req.url
      );

      if (route) {
        return route.handler(req, res);
      }

      res.statusCode = 404;
      res.end("Not Found");
    };

    next();
  };

  app.use = (mw: Middleware) => {
    middleware.push(mw);
  };

  app.get = (path: string, handler: Route["handler"]) => {
    routes.push({ method: "GET", path, handler });
  };

  app.post = (path: string, handler: Route["handler"]) => {
    routes.push({ method: "POST", path, handler });
  };

  app.listen = (port: number, callback?: () => void) => {
    const server = http.createServer(app);
    server.listen(port, callback);
  };

  return app as typeof app & {
    use: (mw: Middleware) => void;
    get: (path: string, handler: Route["handler"]) => void;
    post: (path: string, handler: Route["handler"]) => void;
    listen: (port: number, callback?: () => void) => void;
  };
}
