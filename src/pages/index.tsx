import Link from "next/link";

import fs from "fs";
import path from "path";
import type { NextPage } from "next";
import type { ModData } from "@/types/mod";

const ModCard = ({ id, title, summary, githubLink }: ModData) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{summary}</p>
        <a href={githubLink}>Github Link</a>
        <div className="flex gap-2">
          <div className="badge badge-outline">Arena</div>
          <div className="badge badge-primary badge-outline">Website</div>
        </div>
        <div className="card-actions justify-end">
          <Link href={`/mods/${id}`} className="btn btn-primary">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const directory = path.join(process.cwd(), "data");
  const filenames = fs.readdirSync(directory);
  const mods: ModData[] = filenames.map((filename) => {
    const filePath = path.join(directory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  });

  return {
    props: {
      mods,
    },
  };
}

const ModListPage: NextPage<{ mods: ModData[] }> = ({ mods }) => {
  return (
    <div>
      {mods.map((mod) => (
        <div key={mod.id} className="w-full flex flex-col gap-6">
          <ModCard {...mod} />
        </div>
      ))}
    </div>
  );
};

export default ModListPage;
