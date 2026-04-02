// req (stream) → chunks → buffer → string → parsed object

import { IncomingMessage, ServerResponse } from "node:http";

export function bodyParser() {
  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const contentType = req.headers["content-type"] || "";
      try {
        if (contentType.includes("application/json")) {
          (req as any).body = JSON.parse(body);
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
          const parsed: Record<string, string> = {};

          body.split("&").forEach((pair) => {
            const [key, value] = pair.split("=");
            parsed[decodeURIComponent(key)] = decodeURIComponent(value);
          });
          (req as any).body = parsed;
        } else {
          (req as any).body = body;
        }
      } catch (e) {
        res.statusCode = 400;
        return res.end("Invalid body format");
      }
      next();
    });
  };
}
