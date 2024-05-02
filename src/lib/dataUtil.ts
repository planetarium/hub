import fs from "fs";
import path from "path";
import type { ModData } from "@/types/mod";
import { BountyData } from "@/types/bounty";

const modsDirectory = path.join(process.cwd(), "data", "mods");
const bountiesDirectory = path.join(process.cwd(), "data", "bounties");
const modTagsFile = path.join(process.cwd(), "data", "mod-tags.json");
const bountyTagsFile = path.join(process.cwd(), "data", "bounty-tags.json");

function getDatas<T>(dir: string): T[] {
  const filenames = fs.readdirSync(dir);
  const datas: T[] = filenames.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  });

  return datas;
}

function getData<T>(dir: string, id: string): T {
  const filePath = path.join(dir, `${id}.json`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data: T = JSON.parse(fileContents);

  return data;
}

function getTags(dir: string) {
  const fileContents = fs.readFileSync(dir, "utf8");
  const tags: Array<string> = JSON.parse(fileContents);

  return tags;
}

function getPaths(dir: string) {
  const filenames = fs.readdirSync(dir);
  const paths = filenames.map((filename) => ({
    params: { id: filename.replace(/\.json$/, "") },
  }));

  return paths;
}


export function getMods() {
  return getDatas<ModData>(modsDirectory);
}

export function getBounties() {
  return getDatas<BountyData>(bountiesDirectory);
}

export function getMod(id: string) {
  return getData<ModData>(modsDirectory, id);
}

export function getBounty(id: string) {
  return getData<BountyData>(bountiesDirectory, id);
}

export function getModTags() {
  return getTags(modTagsFile);
}

export function getBountyTags() {
  return getTags(bountyTagsFile);
}

export function getModPaths() {
  return getPaths(modsDirectory)
}

export function getBountyPaths() {
  return getPaths(bountiesDirectory)
}
