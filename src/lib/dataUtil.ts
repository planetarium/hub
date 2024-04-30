import fs from "fs";
import path from "path";
import type { ModData } from "@/types/mod";

const modsDirectory = path.join(process.cwd(), "data", "mods");
const bountiesDirectory = path.join(process.cwd(), "data", "bounties");
const modTagsFile = path.join(process.cwd(), "data", "mod-tags.json");
const bountyTagsFile = path.join(process.cwd(), "data", "bounty-tags.json");

function getDatas(dir: string) {
  const filenames = fs.readdirSync(dir);
  const mods: ModData[] = filenames.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  });

  return mods;
}

function getData(dir: string, id: string) {
  const filePath = path.join(dir, `${id}.json`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const mod: ModData = JSON.parse(fileContents);

  return mod;
}

function getTags(dir: string) {
  const fileContents = fs.readFileSync(dir, "utf8");
  const tags: Array<string> = JSON.parse(fileContents);

  return tags;
}

export function getMods() {
  return getDatas(modsDirectory);
}

export function getBounties() {
  return getDatas(bountiesDirectory);
}

export function getMod(id: string) {
  return getData(modsDirectory, id);
}

export function getBounty(id: string) {
  return getData(bountiesDirectory, id);
}

export function getModTags() {
  return getTags(modTagsFile);
}

export function getBountyTags() {
  return getTags(bountyTagsFile);
}

export function getModPaths() {
  const filenames = fs.readdirSync(modsDirectory);
  const paths = filenames.map((filename) => ({
    params: { id: filename.replace(/\.json$/, "") },
  }));

  return paths;
}
