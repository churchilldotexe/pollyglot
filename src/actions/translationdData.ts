"use server";

import { z } from "zod";

const formSchema = z.object({
  userInput: z.string(),
  language: z.string(),
});

type TranslationResponse = {
  error?: string;
  message?: string;
  response?: {
    assistant: string;
    user: string;
    id: string;
  }[];
};

interface ResponseData {
  role: string;
  content: string;
}

export async function translationData(
  prevConversation: unknown,
  formData: FormData,
): Promise<TranslationResponse> {
  const formResult = formSchema.safeParse(Object.fromEntries(formData));
  if (!formResult.success) {
    return {
      error: "Invalid form. Please make sure the form is correctly filled.",
    };
  }

  const { language, userInput } = formResult.data;
  try {
    const response = await fetch(
      `http://localhost:3000/api/?q=${userInput}&lang=${language}`,
    );
    const data = (await response.json()) as unknown;

    const translationResponse = data as ResponseData;

    return {
      response: [
        {
          assistant: translationResponse.content,
          user: userInput,
          id: crypto.randomUUID(),
        },
      ],
      message: "Success",
    };
  } catch (error) {
    console.error(error);
    return { error: "Unable to translate data. Pelase try again" };
  }
}
