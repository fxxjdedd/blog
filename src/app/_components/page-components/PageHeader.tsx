"use client";
import { CMS_NAME } from "@/lib/constants";

export function PageHeader() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-8 md:mb-6 backdrop-filter backdrop-blur-xl bg-opacity-40 bg-gray-800 rounded-lg p-6 shadow-lg">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-400 animate-pulse drop-shadow-[0_0_10px_rgba(255,192,203,0.8)] glow-pink-500">
        Blog.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8 text-white text-shadow-glow">
        A statically generated blog example using{" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-blue-400 duration-200 transition-colors text-shadow-glow"
        >
          Next.js
        </a>{" "}
        and {CMS_NAME}.
      </h4>
    </section>
  );
}
