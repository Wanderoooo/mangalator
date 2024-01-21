import React, { createContext, useState } from 'react';

export const MangaContext = createContext();

export const MangaContextProvider = ({ children }) => {
  const [currentMangaContext, setCurrentMangaContext] = useState(null);

  return (
    <MangaContext.Provider value={{ currentMangaContext, setCurrentMangaContext }}>
      {children}
    </MangaContext.Provider>
  );
};
