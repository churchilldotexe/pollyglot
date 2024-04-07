import FormWithResponse from "~/components/FormWithResponse";

export default function HomePage() {
  return (
    <main className="mx-auto h-[75dvh] min-w-0 max-w-5xl px-3 py-8">
      <section className="flex h-full flex-col-reverse rounded-2xl border-2 border-gray-900 px-6 pb-4 pt-11">
        <FormWithResponse />
      </section>
    </main>
  );
}
