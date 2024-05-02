/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BsArrowRight, BsGithub } from "react-icons/bs";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBounty, getBountyPaths } from "@/lib/dataUtil";
import { BountyData } from "@/types/bounty";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getBountyPaths();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const bounty = getBounty(id as string);

  const issueAPIUrl = `https://api.github.com/repos/${bounty.githubIssue.replace(
    "https://github.com/",
    ""
  )}`;

  const issueResponse = await fetch(issueAPIUrl);
  const issueData = await issueResponse.json();
  const issueContent = issueData.body;
  const issueTitle = issueData.title;

  return {
    props: {
      bounty,
      issueContent,
      issueTitle,
    },
  };
};

const BountyPage: NextPage<{
  bounty: BountyData;
  issueContent: string;
  issueTitle: string;
}> = ({ bounty, issueContent, issueTitle }) => {
  return (
    <div className="">
      <div className="card card-side border shadow-sm h-72 overflow-hidden">
        <div className="card-body p-4">
          <h1 className="card-title text-4xl">{bounty.title}</h1>

          <p className="text-lg m-1">{bounty.summary}</p>

          <div className="flex gap-2 flex-wrap">
            {bounty.tags.map((tag) => (
              <div key={tag} className="badge badge-outline badge-lg">
                {tag}
              </div>
            ))}
          </div>
          <div className="card-actions justify-end mt-8">
            <Link href={bounty.githubIssue}>
              <button className="btn btn-outline btn-primary">
                Github
                <BsGithub />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div>{issueTitle}</div>

      <ReactMarkdown
        className="w-full mx-auto max-w-full px-4 py-8 prose prose-img:rounded-xl prose-headings:border-b-2 prose-headings:pb-4 prose-a:text-blue-600"
        remarkPlugins={[remarkGfm]}
      >
        {issueContent}
      </ReactMarkdown>
    </div>
  );
};

export default BountyPage;
