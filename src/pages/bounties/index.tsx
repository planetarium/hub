import { getBounties, getBountyTags } from "@/lib/dataUtil";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import type { BountyData } from "@/types/bounty";
import BountyCard from "@/components/BountyCard";

export async function getStaticProps() {
  const bounties = getBounties();
  const tags = getBountyTags();

  return {
    props: {
      initialBounties: bounties,
      tags,
    },
  };
}

const BountiesPage: NextPage<{ initialBounties: BountyData[] }> = ({
  initialBounties,
}) => {
  return (
    <div className="w-full">
      {initialBounties.map((bounty) => (
        <BountyCard key={bounty.id} {...bounty} />
      ))}
      {initialBounties.length === 0 && <p>No bounties found.</p>}
    </div>
  );
};

export default BountiesPage;
