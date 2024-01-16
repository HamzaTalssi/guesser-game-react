// Home.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { usePlayer } from '../PlayerContext';

const Home = () => {
  const { setPlayer } = usePlayer();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (playerName.trim() !== '') {
      setPlayer(playerName);
      navigate('/game');
    } else {
      alert('Please enter your name before starting the game.');
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form>
              <div className="form-group">
                <label htmlFor="playerName">Player name :</label>
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  id="playerName"
                  onChange={(e) => setPlayerName(e.target.value)}
                  required
                />
              </div>
              <br></br>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleStartGame}
              >
                Start the game
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
