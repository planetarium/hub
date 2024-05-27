import type { NextPage } from "next";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useMemo, useState } from "react";
import { Address } from "@planetarium/account";
import { useStageTransactionMutation } from "@/generated/graphql";
import { getChronoSdk } from "@planetarium/chrono-sdk";
import {
  useAccounts,
  useConnect,
  useNetwork,
} from "@planetarium/chrono-sdk/hooks";
import {
  TransferAsset,
  fav,
  NCG,
  ODIN_GENESIS_HASH,
  HEIMDALL_GENESIS_HASH,
} from "@planetarium/lib9c";
import { sha256 } from "@noble/hashes/sha256";

type FormData = {
  title: string;
  writer: string;
  summary: string;
  githubIssue: string;
  tags: string;
};

function createTransferAssetsAction(
  sender: Address,
  recipient: Address
): TransferAsset {
  return new TransferAsset({
    sender,
    recipient,
    amount: fav(NCG, 10),
  });
}

type TransferAssetsProgress = "None" | "Signing" | "Staging" | "Done";

function TransferAssetsButton({
  sender,
  recipient,
  setTransactionData,
}: {
  sender: Address;
  recipient: Address;
  setTransactionData: (data: string | undefined) => void;
}) {
  const [progress, setProgress] = useState<TransferAssetsProgress>("None");
  const [stage] = useStageTransactionMutation();
  const action = useMemo(() => {
    return createTransferAssetsAction(sender, recipient);
  }, [sender, recipient]);

  const onClick = (e: React.FormEvent) => {
    e.preventDefault();

    setProgress("Signing");
    const chronoWallet = getChronoSdk();
    if (chronoWallet === undefined) {
      return;
    }

    chronoWallet
      .sign(sender, action)
      .then((tx) => {
        console.log(tx);
        setProgress("Staging");
        return stage({
          variables: {
            tx: tx.toString("hex"),
          },
        }).then(({ data, errors }) => {
          setProgress("Done");
          console.log("test", data, errors);
          if (data) {
            setTransactionData(
              Buffer.from(sha256(data.stageTransaction)).toString("hex")
            );
            console.log(
              Buffer.from(sha256(data.stageTransaction)).toString("hex")
            );
          }
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
      onClick={(e) => onClick(e)}
    >
      {`TransferAssets ${progress}`}
    </button>
  );
}

const RegisterPage: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    writer: "",
    summary: "",
    githubIssue: "",
    tags: "",
  });

  const [transactionData, setTransactionData] = useState<string | undefined>(
    undefined
  );

  const [currentAccount, setCurrentAccount] = useState<number>(0);

  const {
    data: accountsData,
    isLoading: accountsLoading,
    isSuccess: accountsSuccess,
    error: accountsError,
  } = useAccounts();
  const { connectAsync, isPending } = useConnect();
  const {
    data: networksData,
    isLoading: networksLoading,
    isSuccess: networksSuccess,
  } = useNetwork();

  const chronoWallet = getChronoSdk();

  let chronoStatus = null;

  if (chronoWallet === undefined) {
    chronoStatus = (
      <div className="flex flex-col bg-gray-900 justify-center items-center min-w-screen min-h-screen">
        There is no Chrono Wallet. You should install Chrono wallet first to use
        this app.
      </div>
    );
  }

  if (accountsLoading || networksLoading) {
    chronoStatus = <>Loading...</>;
  }

  if (!accountsSuccess) {
    chronoStatus = (
      <>Accounts are not loaded successful. error: {accountsError}</>
    );
  }

  if (!networksSuccess) {
    chronoStatus = <>Network is not loaded successful.</>;
  }

  // const { accounts, isConnected } = accountsData;
  // const { network, isConnected: networkIsConnected } = networksData;

  const tempConnect = (e: React.FormEvent) => {
    e.preventDefault();
    connectAsync();
  };

  if (!accountsData?.isConnected) {
    chronoStatus = (
      <div>
        {isPending || (
          <button
            type="button"
            className="btn btn-outline btn-primary"
            onClick={(e) => tempConnect(e)}
          >
            Connect
          </button>
        )}
        {isPending && (
          <button
            type="button"
            className="btn btn-outline btn-primary"
            disabled
            onClick={(e) => tempConnect(e)}
          >
            Connecting
          </button>
        )}
      </div>
    );
  }

  // const guessedNetworkName = (() => {
  //   if (network.genesisHash.toLowerCase() === ODIN_GENESIS_HASH.toString()) {
  //     return "odin";
  //   } else if (
  //     network.genesisHash.toLowerCase() === HEIMDALL_GENESIS_HASH.toString()
  //   ) {
  //     return "heimdall";
  //   } else {
  //     return "unknown";
  //   }
  // })();

  // if (guessedNetworkName === "unknown") {
  //   chronoStatus = <>Unknown network (genesis hash: {network.genesisHash})</>;
  // }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.writer ||
      !formData.summary ||
      !formData.githubIssue ||
      !formData.tags ||
      !transactionData
    ) {
      alert("Please check the form");
      return;
    }

    var fileId = `${formData.writer}.${formData.title.replace(/\s+/g, "-")}`;
    const jsonOutput = JSON.stringify(
      {
        id: fileId,
        ...formData,
        txHash: transactionData,
      },
      null,
      2
    );

    const blob = new Blob([jsonOutput], { type: "application/json" });
    const blobURL = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobURL;
    link.download = `${fileId}.json`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(blobURL);
  };

  const client = new ApolloClient({
    uri: networksData?.network?.gqlEndpoint,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div>
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
            Once you complete the form, a file will be generated. Please use
            this file to submit a pull request
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            Title
            <input
              type="text"
              name="title"
              className="grow"
              placeholder="Issue libplanet 3772"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Writer
            <input
              type="text"
              name="writer"
              className="grow"
              placeholder="planetarium"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Summary
            <input
              type="text"
              name="summary"
              className="grow"
              placeholder="Please solve the libplanet issue"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            GithubIssue
            <input
              type="text"
              name="githubIssue"
              className="grow"
              placeholder="https://github.com/planetarium/libplanet/issues/3772"
              onChange={handleChange}
            />
          </label>
          <select
            name="tags"
            className="select select-bordered w-full max-w-xs"
            onChange={handleChange}
          >
            <option>Tag</option>
            <option>Libplanet</option>
          </select>
          {!!chronoStatus
            ? chronoStatus
            : accountsData && (
                <TransferAssetsButton
                  sender={accountsData.accounts[currentAccount]}
                  recipient={Address.fromHex(
                    "0xf392d97E4D1757070Fd5b4dB9cdB9bD024F2c00e"
                  )}
                  setTransactionData={setTransactionData}
                />
              )}
          {transactionData && (
            <div>
              <strong>Transaction Staged:</strong> {transactionData}
            </div>
          )}
          <button className="btn btn-outline btn-primary" type="submit">
            Create Bounty
          </button>
        </form>
      </div>
    </ApolloProvider>
  );
};

export default RegisterPage;
