/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BsArrowRight, BsGithub } from "react-icons/bs";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import type { ModData } from "@/types/mod";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getMod, getModPaths } from "@/lib/dataUtil";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getModPaths();

  return {
    paths,
    fallback: false,
  };
};

class InvalidGitHubLinkError extends Error {
  constructor(message?: string) {
    super(message || "GitHub link must be 'https://github.com/{org}/{repo}' or 'https://github.com/{org}/{repo}/tree/{ref}/{...path}'");
  }
}

interface GitHubContentLink {
  organization: string,
  repository: string,
  path: string,
  /**
   * commit/branch/tag
   */
  ref?: string,
};

function parseGitHubContentLink(url: string): GitHubContentLink {
  const githubLink = new URL(url);
  const hostname = githubLink.hostname;
  if (hostname !== "github.com") {
    throw new Error("The given url's host is not 'github.com'.");
  }

  const pathname = githubLink.pathname;
  const split = pathname.split('/').filter(x => x !== '');

  if (split.length < 2) {
    throw new InvalidGitHubLinkError();
  }

  const organization = split[0];
  const repository = split[1];

  if (split.length === 2) {
    return {
      organization,
      repository,
      path: '/',
    }
  }

  if (split.length < 4 || split[2] !== 'tree') {
    throw new InvalidGitHubLinkError();
  }

  const ref = split[3];
  const path = '/' + split.slice(4).join('/');

  return {
    organization,
    repository,
    path,
    ref
  }
}

function buildReadmeUrl({
  organization,
  repository,
  path,
  ref,
}: GitHubContentLink): string {
  const url = new URL('https://api.github.com/');
  if (ref) {
    url.searchParams.append('ref', ref);
  }

  url.pathname = `/repos/${organization}/${repository}/contents/${path}/README.md`;

  return url.toString();
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const mod = getMod(id as string);

  const githubToken =
    process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!githubToken) {
    throw new Error("GitHub token not found in environment variables.");
  }

  const githubLink = parseGitHubContentLink(mod.githubLink);

  const readmeUrl = buildReadmeUrl(githubLink);
  const readmeResponse = await fetch(readmeUrl, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });

  if (readmeResponse.status !== 200) {
    return {
      notFound: true,
    };
  }

  const readmeData = await readmeResponse.json();
  const readmeContent = Buffer.from(readmeData.content, "base64").toString(
    "utf8"
  );

  return {
    props: {
      mod,
      readme: readmeContent,
    },
  };
};

const ModDetailPage: NextPage<{ mod: ModData; readme: string }> = ({
  mod,
  readme,
}) => {
  return (
    <div className="">
      <div className="card card-side border shadow-sm h-72 overflow-hidden">
        <figure className="h-full max-w-96 shrink-0 rounded-none">
          {mod.thumbnailExists ? (
            <img className="h-full" src={`/images/${mod.id}.jpg`} alt="Movie" />
          ) : (
            <div className="w-96 h-full flex flex-col items-center justify-center text-center bg-black text-white text-xl font-bold">
              {mod.title}
            </div>
          )}
        </figure>

        <div className="card-body p-4">
          <h1 className="card-title text-4xl">{mod.title}</h1>

          <p className="text-lg m-1">{mod.summary}</p>

          <div className="flex gap-2 flex-wrap">
            <div
              key={mod.developer}
              className="badge badge-primary badge-lg badge-outline"
            >
              Created by <span className="ml-1 font-bold">{mod.developer}</span>
            </div>
            {mod.tags.map((tag) => (
              <div key={tag} className="badge badge-outline badge-lg">
                {tag}
              </div>
            ))}
          </div>
          <div className="card-actions justify-end mt-8">
            <Link href={mod.githubLink}>
              <button className="btn btn-outline btn-primary">
                Github
                <BsGithub />
              </button>
            </Link>
            {mod.siteLink && (
              <Link href={mod.siteLink}>
                <button className="btn btn-primary">
                  Site Link
                  <BsArrowRight />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <ReactMarkdown
        className="w-full mx-auto max-w-full px-4 py-8 prose prose-img:rounded-xl prose-headings:border-b-2 prose-headings:pb-4 prose-a:text-blue-600"
        remarkPlugins={[remarkGfm]}
      >
        {readme}
      </ReactMarkdown>
    </div>
  );
};

export default ModDetailPage;
