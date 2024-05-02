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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const mod = getMod(id as string);

  const repoPath = mod.githubLink.replace("https://github.com/", "");
  const readmeUrl = `https://raw.githubusercontent.com/${repoPath}/master/README.md`;

  const readmeResponse = await fetch(readmeUrl);
  const readmeContent = await readmeResponse.text();

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
