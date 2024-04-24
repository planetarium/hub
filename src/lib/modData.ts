import fs from "fs";
import path from "path";
import type { ModData } from "@/types/mod";

const modsDirectory = path.join(process.cwd(), "data", "mods");
const tagFile = path.join(process.cwd(), "data", "tags.json");

export function loadModData() {
  const filenames = fs.readdirSync(modsDirectory);
  const mods: ModData[] = filenames.map((filename) => {
    const filePath = path.join(modsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  });

  return mods;
}

export function loadModPaths() {
  const filenames = fs.readdirSync(modsDirectory);
  const paths = filenames.map((filename) => ({
    params: { id: filename.replace(/\.json$/, "") },
  }));

  return paths;
}

export function getModData(id: string) {
  const filePath = path.join(modsDirectory, `${id}.json`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const mod: ModData = JSON.parse(fileContents);

  return mod;
}

export function getTags() {
  const fileContents = fs.readFileSync(tagFile, "utf8");
  const tags: Array<string> = JSON.parse(fileContents);

  return tags;
}
