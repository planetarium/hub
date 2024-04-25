import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import type { ModData } from "@/types/mod";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getModData, loadModPaths } from "@/lib/modData";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = loadModPaths();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const mod = getModData(id as string);

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
    <div className="w-full px-6">
      <div className="flex items-end">
        {mod.thumbnailExists ? (
          <img
            className="w-56 max-h-72 mr-4"
            src={`/images/${mod.id}.jpg`}
            alt="Movie"
          />
        ) : (
          <div className="w-56 max-h-72 mr-4 flex flex-col items-center justify-center text-center bg-black text-white text-xl font-bold">
            {mod.title}
          </div>
        )}
        <div className="flex flex-col">
          <h1 className="text-4xl">{mod.title}</h1>
          <p>{mod.summary}</p>
        </div>
      </div>
      <div className="divider">README</div>
      <ReactMarkdown className="prose lg:prose-l" remarkPlugins={[remarkGfm]}>
        {readme}
      </ReactMarkdown>
    </div>
  );
};

export default ModDetailPage;
