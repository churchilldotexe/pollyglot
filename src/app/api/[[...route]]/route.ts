import { Hono } from "hono";
import { env } from "hono/adapter";
import { handle } from "hono/vercel";
import OpenAI from "openai";
import { type ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const runtime = "edge";

const app = new Hono().basePath("/api");

type EnvConfig = {
  OPENAI_API_KEY: string;
};

app.get("/", async (c) => {
  const { OPENAI_API_KEY } = env<EnvConfig>(c);

  try {
    const openAI = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    if (!openAI) {
      return c.json({ message: "please provide apikey" }, { status: 401 });
    }

    const { q, lang } = c.req.query();

    const content =
      `language:${lang}, query:${q}` ??
      `language: japanese, query: Im happy to translate words for you!`;

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content:
          "You're an expert translator. You can accurately translate the query to the given language. Your only answer is the translation of the input. only Reply your translation and nothing else. if the language request is japanese please romanize your response and must be in english alphabet for example: Genkidesu ka?",
      },
      {
        role: "user",
        content,
      },
    ];

    const completion = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });
    if (completion?.choices[0]) {
      return c.json(completion.choices[0].message);
    }
  } catch (error) {
    console.error(error);
    return c.json({ message: "Something wen wrong" }, { status: 500 });
  }
});

export const GET = handle(app);
export default app as never;
