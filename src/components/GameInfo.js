import React from 'react';

const GameInfo = ({ locationName, distance, score }) => {
  return (
    <div className="game-info">
      <p>Klick op de Mapp, öm dä Ört uszesöke: {locationName}</p>
      {distance !== null && <p>Distance: {distance} km</p>}
      {score !== null && <p>Score: {score} / 50</p>}
    </div>
  );
};

export default GameInfo;
