import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CityMap = ({ markerPosition, onMapClick, currentLocation }) => {
  React.useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([50.9375, 6.9603], 13);

    // Add the tile layer (you can use your preferred tile layer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Check if markerPosition has valid numerical values
    if (!isNaN(markerPosition.x) && !isNaN(markerPosition.y)) {
      // Add a marker to the map
      L.marker([markerPosition.y, markerPosition.x]).addTo(map);
    }

    // Add a click event to the map
    map.on('click', onMapClick);

    // Cleanup when the component unmounts
    return () => {
      map.off('click', onMapClick);
      map.remove();
    };
  }, [markerPosition, onMapClick]);

  return (
    <div className="map-container">
      <div id="map" style={{ height: '350px' }}></div>
      {currentLocation && (
        <div className="location-info">
          <h3>{currentLocation.title}</h3>
          <p>{currentLocation.description}</p>
        </div>
      )}
    </div>
  );
};

export default CityMap;
