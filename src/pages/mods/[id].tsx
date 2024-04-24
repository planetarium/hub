import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import fs from "fs";
import path from "path";
import type { ModData } from "@/types/mod";
import ReactMarkdown from 'react-markdown';

export const getStaticPaths: GetStaticPaths = async () => {
  const directory = path.join(process.cwd(), "data");
  const filenames = fs.readdirSync(directory);
  const paths = filenames.map((filename) => ({
    params: { id: filename.replace(/\.json$/, "") },
  }));

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const filePath = path.join(process.cwd(), "data", `${id}.json`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const mod: ModData = JSON.parse(fileContents);

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
    <div>
      <h1 className="text-4xl">{mod.title}</h1>
      <p>{mod.summary}</p>
      <div className="divider">README</div>
      <ReactMarkdown>{readme}</ReactMarkdown>
      {/* <div dangerouslySetInnerHTML={{ __html: readme }} /> */}
    </div>
  );
};

export default ModDetailPage;
