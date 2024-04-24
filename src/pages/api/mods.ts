import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Mod = {
  id: string;
  title: string;
  description: string;
  githubLink: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const directory = path.join(process.cwd(), "data");
  const filenames = fs.readdirSync(directory);
  const mods: Mod[] = filenames.map((filename) => {
    const filePath = path.join(directory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  });

  res.status(200).json(mods);
}
