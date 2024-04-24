import { useEffect, useState } from "react";
import { loadModData } from "@/lib/modData";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import type { ModData } from "@/types/mod";
import ModCard from "@/components/ModCard";

export async function getStaticProps() {
  const mods = loadModData();

  return {
    props: {
      initialMods: mods,
    },
  };
}

const ModListPage: NextPage<{ initialMods: ModData[] }> = ({ initialMods }) => {
  const [filteredMods, setFilteredMods] = useState(initialMods);
  const router = useRouter();
  const { title } = router.query;

  useEffect(() => {
    if (title) {
      const searchTerm = Array.isArray(title)
        ? title[0].toLowerCase()
        : title.toLowerCase();
      const mods = initialMods.filter((mod) =>
        mod.title.toLowerCase().includes(searchTerm)
      );
      setFilteredMods(mods);
    } else {
      setFilteredMods(initialMods);
    }
  }, [title, initialMods]);

  return (
    <div className="w-full flex flex-col gap-6">
      {filteredMods.map((mod) => (
        <ModCard key={mod.id} {...mod} />
      ))}
      {filteredMods.length === 0 && <p>No mods found.</p>}
    </div>
  );
};

export default ModListPage;
