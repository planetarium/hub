import React, { createContext, useState, ReactNode } from "react";
import { Account, AccountContextType } from "@/types";

export const AccountContext = createContext<AccountContextType>({
  account: undefined,
  setAccount: () => {},
});

export const AccountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [account, setAccount] = useState<Account>();

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
