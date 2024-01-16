// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { usePlayer } from '../PlayerContext';

const Header = () => {
  const { playerName } = usePlayer();

  return (
    <header className="mb-4">
      <Link to="/">
        <h1 className="text-center">KölnGuesser</h1>
      </Link>
      {playerName && <p className="text-center">Jo, Hallo {playerName}! bess de bereit för en Spill? Zigk, dat de en richtige Kölsche bess!</p>}
    </header>
  );
};

export default Header;
