import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import GameInfo from '../components/GameInfo';
import CityMap from '../components/CityMap';
import locationsData from '../locations/locations.json';

const Game = ({ playerName }) => {
  const navigate = useNavigate();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({ x: 0, y: 0 });
  const [distance, setDistance] = useState(null);
  const [score, setScore] = useState(0);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  const getRandomLocation = () => {
    const randomIndex = Math.floor(Math.random() * locationsData.places.length);
    return locationsData.places[randomIndex];
  };

  const calculateDistance = (guess, actual) => {
    const lat1 = guess.lat || 0;
    const lon1 = guess.long || 0;
    const lat2 = actual.lat;
    const lon2 = actual.long;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const calculateScore = (distance) => {
    const maxDistance = 100; // Maximale Entfernung für die volle Punktzahl
    const normalizedDistance = Math.min(distance, maxDistance);
    const calculatedScore = Math.max(0, Math.floor((1 - normalizedDistance / maxDistance) * 5));

    return calculatedScore;
  };

  const handleMapClick = (e) => {
    const rect = document.querySelector('.map-container').getBoundingClientRect();
  
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      console.log('x : ' , x , '--' , 'y : ' , y)
      setMarkerPosition({ x, y });
    }
  };

  const handleConfirm = () => {
    const currentLocation = locationsData.places[currentLocationIndex];
    const calculatedDistance = calculateDistance(markerPosition, currentLocation);
    const newScore = calculateScore(calculatedDistance);

    setDistance(calculatedDistance.toFixed(2));
    setScore(score + newScore);

    // Zeige Ergebnisse in der Konsole (zum Testen)
    console.log('Distance:', calculatedDistance.toFixed(2), 'km');
    console.log('Score:', newScore);

    // Ort direkt ändern, ohne Verzögerung
    // handleNextRound();
  };

  const handleNextRound = () => {
    const newLocation = getRandomLocation();
    setCurrentLocation(newLocation);
    setCurrentLocationIndex((prevIndex) =>
      prevIndex + 1 < locationsData.places.length ? prevIndex + 1 : 0
    );
    setMarkerPosition({ x: 0, y: 0 });
    setDistance(null);
  };

  useEffect(() => {
    const initialLocation = getRandomLocation();
    setCurrentLocation(initialLocation);
  }, []);

  return (
    <div>
      <Header playerName={playerName} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <GameInfo
              locationName={currentLocation ? currentLocation.title : ''}
              distance={distance}
              score={score}
            />
            <CityMap onMapClick={handleMapClick} markerPosition={markerPosition} />
            <br></br>
            <center>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-secondary mt-3 ml-3"
                onClick={handleNextRound}
              >
                Next
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
