import fs from "fs";
import path from "path";
import type { ModData } from "@/types/mod";

const directory = path.join(process.cwd(), "data", "mods");

export function loadModData() {
  const filenames = fs.readdirSync(directory);
  const mods: ModData[] = filenames.map((filename) => {
    const filePath = path.join(directory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  });

  return mods;
}

export function loadModPaths() {
  const filenames = fs.readdirSync(directory);
  const paths = filenames.map((filename) => ({
    params: { id: filename.replace(/\.json$/, "") },
  }));

  return paths;
}

export function getModData(id: string) {
  const filePath = path.join(directory, `${id}.json`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const mod: ModData = JSON.parse(fileContents);

  return mod;
}
