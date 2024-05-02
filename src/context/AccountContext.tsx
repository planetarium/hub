// context/AccountContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
// import { getChronoSdk } from "@planetarium/chrono-sdk";
import { Account, AccountContextType } from "../types";

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined
);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentAccount, setCurrentAccount] = useState<number | null>(null);
  // const chronoWallet = getChronoSdk();

  // useEffect(() => {
  //   (async () => {
  //     if (!chronoWallet) {
  //       return;
  //     }

  //     const addresses = (await chronoWallet.listAccounts()).map((account) => ({
  //       activated: account.activated,
  //       address: account.address,
  //     }));

  //     setAccounts(addresses);
  //     const activeIndex = addresses.findIndex((acc) => acc.activated);
  //     setCurrentAccount(activeIndex !== -1 ? activeIndex : 0);
  //   })();
  // }, [chronoWallet]);

  return (
    <AccountContext.Provider
      value={{ accounts, currentAccount, setAccounts, setCurrentAccount }}
    >
      {children}
    </AccountContext.Provider>
  );
};
