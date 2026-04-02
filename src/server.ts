// src/server.ts
import { createApp } from "./app";
import { bodyParser } from "./bodyParser";

const app = createApp();

app.use(bodyParser());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  (res as any).json({ message: "Hello TypeScript Mini Express" });
});

app.post("/data", (req, res) => {
  const body = (req as any).body;

  (res as any).json({
    received: body,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
