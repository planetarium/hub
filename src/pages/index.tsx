import { useEffect, useState } from "react";
import { loadModData, getTags } from "@/lib/modData";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import type { ModData } from "@/types/mod";
import ModCard from "@/components/ModCard";

export async function getStaticProps() {
  const mods = loadModData();
  const tags = getTags();

  return {
    props: {
      initialMods: mods,
      tags,
    },
  };
}

const ModListPage: NextPage<{ initialMods: ModData[] }> = ({ initialMods }) => {
  const [filteredMods, setFilteredMods] = useState(initialMods);
  const router = useRouter();
  const { title, tag } = router.query;

  useEffect(() => {
    let mods = initialMods;

    if (title) {
      const searchTerm = Array.isArray(title)
        ? title[0].toLowerCase()
        : title.toLowerCase();
      mods = mods.filter((mod) => mod.title.toLowerCase().includes(searchTerm));
    }

    if (tag) {
      const tagTerm = Array.isArray(tag) ? tag[0] : tag;
      mods = mods.filter((mod) => mod.tags.includes(tagTerm));
    }

    setFilteredMods(mods);
  }, [title, tag, initialMods]);

  return (
    <div className="w-full grid grid-cols-3 gap-8">
      {filteredMods.map((mod) => (
        <ModCard key={mod.id} {...mod} />
      ))}
      {filteredMods.length === 0 && <p>No mods found.</p>}
    </div>
  );
};

export default ModListPage;
