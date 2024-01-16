import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState('');

  const setPlayer = (name) => {
    setPlayerName(name);
  };

  return (
    <PlayerContext.Provider value={{ playerName, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};
