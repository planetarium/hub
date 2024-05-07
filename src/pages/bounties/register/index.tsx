import type { NextPage } from "next";
import { useMemo, useState, useContext } from "react";
import { AccountContext } from "@/context/AccountContext";
import {
  useStageTransactionMutation,
} from "@/generated/graphql";
import { Address } from "@planetarium/account";
import { getChronoSdk } from "@planetarium/chrono-sdk";
import { TransferAsset, fav, NCG } from "@planetarium/lib9c";
import { Account } from "@/types";

type TransferAssetsProgress = "None" | "Signing" | "Staging" | "Done";
type ConnectWalletButtonProps = {
  setAccount: (account: Account) => void;
};

function ConnectWalletButton({ setAccount }: ConnectWalletButtonProps) {
  const onClick = async () => {
    const chronoWallet = getChronoSdk();
    if (!chronoWallet) {
      return;
    }

    const addresses = (await chronoWallet.listAccounts()).map((account) => ({
      activated: account.activated,
      address: account.address,
    }));

    const activeIndex = addresses.findIndex((acc) => acc.activated);
    setAccount(addresses[activeIndex !== -1 ? activeIndex : 0]);
  };

  return (
    <button
      type="button"
      className="rounded-md bg-yellow-400 text-white p-3 font-bold"
      onClick={onClick}
    >
      ConnectWallet
    </button>
  );
}
function TransferAssetsButton({
  sender,
  recipient,
}: {
  sender: Address;
  recipient: Address;
}) {
  const [progress, setProgress] = useState<TransferAssetsProgress>("None");
  const [stage] = useStageTransactionMutation();
  const action = useMemo(() => {
    return new TransferAsset({
      sender,
      recipient,
      amount: fav(NCG, 10),
    });
  }, [sender, recipient]);

  const onClick = () => {
    setProgress("Signing");
    const chronoWallet = getChronoSdk();
    if (chronoWallet === undefined) {
      return;
    }

    chronoWallet
      .sign(sender, action.bencode())
      .then((tx) => {
        console.log(tx);
        setProgress("Staging");
        return stage({
          variables: {
            tx: tx.toString("hex"),
          },
        }).then(({ data, errors }) => {
          setProgress("Done");
          console.log(data, errors);
        });
      })
      .catch((e: unknown) => {
        console.error(e);
        setProgress("None");
      });
  };

  if (progress !== "None") {
    return <button className="btn btn-outline btn-primary">{progress}</button>;
  }

  return (
    <button
      type="button"
      className="rounded-md bg-yellow-400 text-white p-3 font-bold"
      onClick={onClick}
    >
      TransferAssets
      {progress}
    </button>
  );
}

const RegisterPage: NextPage = () => {
  const { account, setAccount } = useContext(AccountContext);

  const agentAddress = account ? account.address : null;

  return (
    <div className="">
      <div role="alert" className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>
          Once you complete the form, a file will be generated. Please use this
          file to submit a pull request{" "}
        </span>
      </div>

      <label className="input input-bordered flex items-center gap-2">
        Title
        <input
          type="text"
          className="grow"
          placeholder="Issue libplanet 3772"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Writer
        <input type="text" className="grow" placeholder="planetarium" />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Summary
        <input
          type="text"
          className="grow"
          placeholder="Please solve the libplanet issue"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        GithubIssue
        <input
          type="text"
          className="grow"
          placeholder="https://github.com/planetarium/libplanet/issues/3772"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        GithubIssue
        <input
          type="text"
          className="grow"
          placeholder="https://github.com/planetarium/libplanet/issues/3772"
        />
      </label>
      <select className="select select-bordered w-full max-w-xs">
        <option>Tag</option>
        <option>Libplanet</option>
      </select>
      {!agentAddress && setAccount && (
        <ConnectWalletButton setAccount={setAccount} />
      )}
      {agentAddress && (
        <TransferAssetsButton
          sender={agentAddress}
          recipient={Address.fromHex(
            "0xf392d97E4D1757070Fd5b4dB9cdB9bD024F2c00e"
          )}
        />
      )}
      <button className="btn btn-outline btn-primary">Create Bounty</button>
    </div>
  );
};

export default RegisterPage;
