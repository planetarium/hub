/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ModData } from "@/types/mod";

const ModCard = ({
  id,
  title,
  summary,
  githubLink,
  tags,
  thumbnailExists,
}: ModData) => {
  return (
    <div className="card card-side h-72 bg-base-100 shadow-xl">
      {thumbnailExists ? (
        <figure>
          <img
            className="w-56 max-h-72"
            src={`/images/${id}.jpg`}
            alt="Movie"
          />
        </figure>
      ) : (
        <figure>
          <div className="w-56 max-h-72 flex flex-col items-center justify-center text-center bg-black text-white text-xl font-bold">
            {title}
          </div>
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{summary}</p>
        <a href={githubLink}>Github Link</a>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <div key={tag} className="badge badge-outline">
              {tag}
            </div>
          ))}
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
export default ModCard;
