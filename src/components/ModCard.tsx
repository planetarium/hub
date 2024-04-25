/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BsArrowRight, BsArrowUpRight, BsGithub } from "react-icons/bs";
import type { ModData } from "@/types/mod";

const ModCard = ({
  id,
  title,
  developer,
  summary,
  githubLink,
  tags,
  thumbnailExists,
}: ModData) => {
  return (
    <div className="card bg-base-100 border">
      <figure className="w-full h-56 border-b">
        {thumbnailExists ? (
          <img className="h-full" src={`/images/${id}.jpg`} alt="Movie" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center bg-black text-white text-xl font-bold">
            {title}
          </div>
        )}
      </figure>
      <div className="card-body">
        <div>
          <p className="card-title">{title}</p>
          {/* {siteLink && <a className="btn btn-xs btn-link" href={siteLink}>Site Link</a>} */}
        </div>
        <div className="flex flex-col gap-4 h-full">
          <p className="flex-none">{summary}</p>
          <div className="flex gap-2 flex-wrap">
            <div key={developer} className="badge badge-primary badge-outline">
              {developer}
            </div>
            {tags.map((tag) => (
              <div key={tag} className="badge badge-outline">
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="card-actions justify-end mt-8">
          <Link href={githubLink}>
            <button className="btn btn-outline btn-primary btn-sm">
              Github
              <BsGithub />
            </button>
          </Link>

          <Link href={`/mods/${id}`}>
            <button className="btn btn-primary btn-sm">
              Detail
              <BsArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ModCard;
