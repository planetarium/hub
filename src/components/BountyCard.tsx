/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BsArrowRight, BsArrowUpRight, BsGithub } from "react-icons/bs";
import type { BountyData } from "@/types/bounty";

const BountyCard = ({ id, title, summary, githubIssue }: BountyData) => {
  return (
    <div className="border rounded-lg p-2 w-full">
      <div>
        <p className="">{title}</p>
        <p className="">{summary}</p>
      </div>
      <div className="card-actions justify-end mt-8">
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
  );
};
export default BountyCard;
