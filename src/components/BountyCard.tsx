/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BsArrowRight, BsArrowUpRight, BsGithub } from "react-icons/bs";
import type { BountyData } from "@/types/bounty";

const BountyCard = ({
  id,
  title,
  summary,
  githubIssue,
  status,
  assignee,
  writer,
  tags,
}: BountyData) => {
  return (
    <div className="border rounded-lg p-4 w-full">
      <div className="flex flex-col">
        <div key={writer} className="badge badge-primary badge-outline mb-4">
          {writer}
        </div>
        <p className="text-xl font-bold">{title}</p>
        <p className="text-lg">{summary}</p>
      </div>

      <div className="card-actions justify-between mt-8">
        <div className="flex gap-2 flex-wrap">
          <div key={assignee} className="badge badge-primary badge-outline">
            Assignee: {assignee}
          </div>
          <div key={status} className="badge badge-primary badge-outline">
            {status}
          </div>
          {tags.map((tag) => (
            <div key={tag} className="badge badge-outline">
              {tag}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Link href={githubIssue}>
            <button className="btn btn-outline btn-primary btn-sm">
              Github
              <BsGithub />
            </button>
          </Link>

          <Link href={`/bounties/${id}`}>
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
export default BountyCard;
