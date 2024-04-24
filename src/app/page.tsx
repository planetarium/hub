"use client";

import type { NextPage } from "next";
import useSWR from 'swr'

type Mod = {
  id: string;
  title: string;
  description: string;
  githubLink: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  const { data: mods, error } = useSWR<Mod[]>("/api/mods", fetcher);

  if (error) return <div>Failed to load mods.</div>;
  if (!mods) return <div>Loading...</div>;

  return (
    <div className="p-8">
      {mods.map((mod) => (
        <div key={mod.id} className="p-4 shadow-lg rounded-lg my-4">
          <h2 className="text-xl font-bold">{mod.title}</h2>
          <p>{mod.description}</p>
          <a
            href={mod.githubLink}
            className="text-blue-500 hover:text-blue-700"
          >
            GitHub Link
          </a>
        </div>
      ))}
    </div>
  );
};

export default Home;
