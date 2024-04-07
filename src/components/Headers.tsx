import { Big_Shoulders_Display as Bigshoulder } from "next/font/google";
import Image from "next/image";

const Bigshoulderfont = Bigshoulder({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Header() {
  return (
    <header className="flex h-[25dvh] items-center justify-center gap-4 p-8">
      <div className="relative aspect-square w-1/4 min-w-16 max-w-44">
        <Image
          src="/parrot.png"
          alt="Parrot polyglot logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,"
        />
      </div>
      <div>
        <h1
          className={`font-sans text-[2.7rem] text-green-500 sm:text-5xl md:text-7xl xl:text-8xl ${Bigshoulderfont.variable}`}
        >
          PollyGlot
        </h1>
        <p className="text-xs leading-none text-white md:text-lg xl:text-xl">
          Perfect Translation Every Time
        </p>
      </div>
    </header>
  );
}
