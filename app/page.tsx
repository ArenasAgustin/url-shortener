"use client";

import { useRef, useState } from "react";

const regex = new RegExp(
  "(https://www.|http://www.|https://|http://)?[a-zA-Z]{2,}(.[a-zA-Z]{2,})(.[a-zA-Z]{2,})?/[a-zA-Z0-9]{2,}|((https://www.|http://www.|https://|http://)?[a-zA-Z]{2,}(.[a-zA-Z]{2,})(.[a-zA-Z]{2,})?)|(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}.[a-zA-Z0-9]{2,}.[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})? "
);

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortUrl, setShortUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = inputRef.current?.value;

    if (!url) return;
    if (!regex.test(url)) return alert("Invalid url");

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
    <main className="flex h-screen w-screen flex-col items-center justify-between p-24 bg-gradient-to-tr from-blue-800 to-purple-700 overflow-hidden relative">
      <div></div>

      <div className="relative w-full flex flex-col place-items-center">
        <h1 className="text-6xl font-bold text-center text-white font-sans">
          Url Shortener
        </h1>

        <p className="max-w-[50ch] text-center text-lg text-white">
          Shorten your links and share them with your friends.
        </p>

        <form
          className="mt-4 group rounded-lg border border-transparent px-5 py-4"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full border-2 text-center outline-none py-2 px-3 rounded-2xl mb-4 text-black"
            placeholder="Paste your link"
            type="text"
            ref={inputRef}
          />

          <button className="block w-full mt-4 py-2 font-semibold mb-2 text-xl rounded-2xl bg-white text-indigo-800">
            Shorten
          </button>

          <p className="mt-4 w-full text-center text-white text-xl">
            {shortUrl}
          </p>
        </form>
      </div>

      <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>

      <div className="max-w-5xl w-full items-center justify-center font-mono text-sm flex">
        <div className="bottom-0 rigth-0 flex items-end justify-center static h-auto w-auto bg-none">
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
    </main>
  );
}
