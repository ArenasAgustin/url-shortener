"use client";

import { useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortUrl, setShortUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = inputRef.current?.value;

    if (!url) return;

    fetch("/api/shortUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShortUrl(data.shortUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t  dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://portfolio-agustin-arenas.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Agustín Arenas
          </a>
        </div>
      </div>

      <div className="relative  w-full flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] ">
        <h1 className="z-10 text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-white via-white">
          Url Shortener
        </h1>

        <p className="z-10 max-w-[50ch] text-center text-lg opacity-50">
          Shorten your links and share them with your friends.
        </p>

        <form
          className="z-10 mt-4 group rounded-lg border border-transparent px-5 py-4 transition-colors  hover:border-neutral-700 hover:bg-neutral-800/30"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full mt-4 text-center px-4 py-2 text-xl text-gray-700 rounded-lg"
            placeholder="Paste your link"
            type="text"
            ref={inputRef}
          />

          <button className="mt-4 w-full px-4 py-2 text-white bg-gradient-to-br from-blue-500 to-blue-600 text-xl rounded-lg">
            Shorten
          </button>

          <p className="mt-4 w-full text-center text-white text-xl">
            {shortUrl}
          </p>
        </form>
      </div>

      <div></div>
    </main>
  );
}
