import Link from "next/link";

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
export default ModCard;
