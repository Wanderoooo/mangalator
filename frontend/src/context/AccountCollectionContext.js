import React, { createContext, useState } from 'react';

export const AccountCollection = createContext();

export const AccountCollectionContext = ({ children }) => {
  const [accountContext, setAccountContext] = useState([]);

  return (
    <AccountCollection.Provider value={{ accountContext, setAccountContext }}>
      {children}
    </AccountCollection.Provider>
  );
};
