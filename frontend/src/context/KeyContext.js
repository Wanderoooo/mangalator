import React, { createContext, useState } from 'react';

export const KeyContext = createContext();

export const KeyProvider = ({ children }) => {
  const [currentKey, setCurrentKey] = useState("home");

  return (
    <KeyContext.Provider value={{ currentKey, setCurrentKey }}>
      {children}
    </KeyContext.Provider>
  );
};
