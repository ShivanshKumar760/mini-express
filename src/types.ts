import { IncomingMessage, ServerResponse } from "node:http";

export type Handler = (
  req: IncomingMessage,
  res: ServerResponse
) => void | Promise<void>;

export type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void | Promise<void>
) => void | Promise<void>;

export interface Route {
  method: string;
  path: string;
  handler: Handler;
}
