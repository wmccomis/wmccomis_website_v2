import React, { useState, useMemo } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import Parse from 'parse';
import { useParseQuery } from '@parse/react';

const mapContainerStyle = {
    width: '90vw',
    height: '50vh',
  };

const center = {
  lat: 39.0119,
  lng: -98.4842,
}

const options = {
  styles: mapStyles,
}

function Map() {

  const parseQuery = useMemo(
    () => {
      const parseQuery = new Parse.Query('airports2');
      return parseQuery;
    }
  );
  
  const {
    isLive, // Indicates that Parse Live Query is connected
    isLoading, // Indicates that the initial load is being processed
    isSyncing, // Indicates that the library is getting the latest data from Parse Server
    results, // Stores the current results in an array of Parse Objects
    count, // Stores the current results count
    error, // Stores any error
    reload // Function that can be used to reload the data
  } = useParseQuery(parseQuery);
  
  if (!isLoading){
    var airports = []
    airports = results.map((airport) => {
      return {
        objectId: airport.id,
        identifier: airport.get("identifier"),
        Coordinates: {lat: airport.get("coordinates").latitude, lng: airport.get("coordinates").longitude}
      };
    });
  }

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    airports.forEach(({ Coordinates }) => bounds.extend(Coordinates));
    map.fitBounds(bounds);
  };

  var zoomVal = window.innerWidth > 400 ? 5 : 2

  return !isLoading ? (
    <GoogleMap
      onLoad={handleOnLoad}
      zoom={zoomVal} 
    //   center={center}
      options={options}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={mapContainerStyle}
    >
      {airports.map(({ objectId, identifier, Coordinates }) => (
        <Marker
          key={objectId}
          position={Coordinates}
          icon={{
                      url: '/plane.svg',
                      scaledSize: new window.google.maps.Size(30,30),
                      origin: new window.google.maps.Point(0,0),
                      anchor: new window.google.maps.Point(15,15),
                  }}
          onClick={() => handleActiveMarker(objectId)}
        >
          {activeMarker === objectId ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{identifier}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  ) : <></>
}

export default Map;