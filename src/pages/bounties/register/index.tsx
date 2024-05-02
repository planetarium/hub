/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BsArrowRight, BsGithub } from "react-icons/bs";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBounty, getBountyPaths } from "@/lib/dataUtil";
import { BountyData } from "@/types/bounty";

const BountyPage: NextPage = () => {
  return (
    <div className="">
      <div role="alert" className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>
          Once you complete the form, a file will be generated. Please use this
          file to submit a pull request{" "}
        </span>
      </div>

      <label className="input input-bordered flex items-center gap-2">
        Title
        <input
          type="text"
          className="grow"
          placeholder="Issue libplanet 3772"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Writer
        <input type="text" className="grow" placeholder="planetarium" />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Summary
        <input
          type="text"
          className="grow"
          placeholder="Please solve the libplanet issue"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        GithubIssue
        <input
          type="text"
          className="grow"
          placeholder="https://github.com/planetarium/libplanet/issues/3772"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        GithubIssue
        <input
          type="text"
          className="grow"
          placeholder="https://github.com/planetarium/libplanet/issues/3772"
        />
      </label>
      <select className="select select-bordered w-full max-w-xs">
        <option>Tag</option>
        <option>Libplanet</option>
      </select>
      <button className="btn btn-outline btn-primary">Create Bounty</button>
    </div>
  );
};

export default BountyPage;
