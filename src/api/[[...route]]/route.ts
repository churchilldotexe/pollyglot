import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.json({
    assistant: "assistant from hono",
    user: "user from hono",
  });
});

export default app;

export const GET = handle(app);
