"use client";

import { Loader2, SendHorizontal } from "lucide-react";
import Image from "next/image";
import { memo, useEffect, useRef, useState, type SetStateAction } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { translationData } from "~/actions/translationdData";
import { cn } from "~/lib/utils";

const conversationCollection: {
  assistant?: string;
  id: string;
  user?: string;
}[] = [
  {
    assistant:
      "Select the language you want me to translate into, type your text and hit send!",
    id: crypto.randomUUID(),
  },
];

const FormWithResponse = () => {
  const [isSelected, setIsSelected] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [translations, value] = useFormState(translationData, {});
  const formRef = useRef<HTMLFormElement>(null);
  const [conversations, setConversation] = useState(conversationCollection);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (translations.message === "Success") {
      setInputValue("");
      setConversation((prevConversation) => [
        ...prevConversation,
        ...(translations.response ?? []),
      ]);
      setIsLoading(false);
    } else if (translations.error) {
      setInputValue("");
      toast.error(translations.error);
      setIsLoading(false);
    } else if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [translations]);

  const handleSubmit = () => {
    setIsLoading(true);
    return formRef.current?.requestSubmit();
  };

  return (
    <>
      <form action={value} ref={formRef} onSubmit={handleSubmit}>
        <div className="flex  items-center gap-4 rounded-lg border border-slate-600 bg-gray-100 px-3 py-1">
          <input
            name="userInput"
            type="text"
            className=" w-full bg-gray-100 p-2"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            required
          />
          <Button />
        </div>
        <div className="flex justify-center gap-10 pt-5 md:gap-14">
          <LanguageRadioInput
            imagePath="/fr-flag.png"
            language="french"
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
          <LanguageRadioInput
            isSelected={isSelected}
            language="spanish"
            setIsSelected={setIsSelected}
            imagePath="/sp-flag.png"
          />
          <LanguageRadioInput
            defaultchecked={true}
            isSelected={isSelected}
            language="Japanese"
            setIsSelected={setIsSelected}
            imagePath="/jpn-flag.png"
          />
        </div>
      </form>
      {isLoading && (
        <div className="mx-auto flex space-x-4 pb-2 text-green-500 transition-all">
          <div className="animation-delay-400ms h-4 w-4 animate-bounce rounded-full bg-green-500 opacity-70 transition-all duration-200" />
          <div className="animation-delay-300ms h-4 w-4 animate-bounce rounded-full bg-green-500 opacity-70 transition-all duration-200" />
          <div className="animation-delay-200ms h-4 w-4 animate-bounce rounded-full bg-green-500 opacity-70 transition-all duration-200" />
          <div className="animation-delay-100ms h-4 w-4 animate-bounce rounded-full bg-green-500 opacity-70 transition-all duration-200" />
          <span className="sr-only">loading state</span>
        </div>
      )}
      <div
        className="overflow-y-auto overflow-x-clip scroll-smooth p-10 "
        ref={scrollRef}
      >
        {conversations.map((collection) => (
          <div key={collection.id}>
            {collection.user && (
              <div
                className={cn(
                  "my-8 flex w-11/12 justify-start rounded-b-3xl rounded-tr-3xl bg-green-500 px-6 py-3 text-start text-xl font-semibold md:w-8/12",
                )}
              >
                {collection.user}
              </div>
            )}
            {collection.assistant && (
              <div
                className={cn(
                  "ml-auto mr-0 w-11/12 rounded-b-3xl rounded-tl-3xl bg-blue-700 px-6 py-3 text-xl font-semibold text-slate-50 md:w-8/12",
                )}
              >
                {collection.assistant}
              </div>
            )}
          </div>
        ))}
        {inputValue && (
          <div className="my-8 flex w-11/12 justify-start rounded-b-3xl rounded-tr-3xl bg-green-500 px-6 py-3 text-start text-xl font-semibold md:w-8/12">
            {inputValue}
          </div>
        )}
      </div>
    </>
  );
};

type LanguageRadioInputProps = {
  language: string;
  setIsSelected: (value: SetStateAction<string>) => void;
  imagePath: string;
  isSelected: string;
  defaultchecked?: boolean;
};

const LanguageRadioInput = memo(function LanguageRadioInput({
  language,
  setIsSelected,
  isSelected,
  defaultchecked,
  imagePath,
}: LanguageRadioInputProps) {
  return (
    <div className="grid place-content-center">
      <label htmlFor={language}>
        <div
          className={cn(
            "relative col-start-1 col-end-1 row-start-1 row-end-1 aspect-video w-12 border border-gray-900 hover:scale-105 focus-visible:scale-105 active:scale-95 md:w-16",
            {
              "scale-125 border-2  border-blue-900 shadow-md shadow-slate-950 transition-all hover:scale-125":
                isSelected === language,
            },
          )}
        >
          <Image
            src={imagePath}
            alt={`${language} flag`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,"
          />
        </div>
      </label>
      <input
        className="col-start-1 col-end-1 row-start-1 row-end-1 hidden"
        type="radio"
        name="language"
        id={language}
        value={language}
        onClick={() => setIsSelected(language)}
        defaultChecked={defaultchecked}
        required
      />
    </div>
  );
});

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="hover:scale-110 focus-visible:scale-110 active:scale-95"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="animate-spin text-green-500" />
      ) : (
        <SendHorizontal className="text-green-500" />
      )}

      <span className="sr-only">submit</span>
    </button>
  );
}

export default FormWithResponse;
