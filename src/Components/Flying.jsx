import React from "react"
import {useLoadScript} from "@react-google-maps/api";
import Map from "./Map";
import mapStyles from "./mapStyles";
// import '../assets/stylesheets/flying.scss'


const Flying = () => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API
  });

  var widthVal = window.innerWidth-window.innerWidth/10;
  var heightVal = window.innerHeight-window.innerHeight/30;

  return (
      <section id="flying">
        <div id="flying_container">
          <div className="blurred-box">
            {/* <h1 className="flying-header">Flying. This section will feature a Google Map of all the airports I have been to as well as some ROR back end for my flight log. This is a work in progress.</h1> */}
            <h1 className="flying-header"> Flying</h1>
            {/*<iframe id="logbook" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRlrrjhFol-JKW1pdwdy4b9ptBO98FWBuUyKyWcnG4Zl8lAfcRCLIyI6aiBA8dyKFUsG66g3TwmbTJ4/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false" width={widthVal} height={heightVal}></iframe> */}
            <div id="map-container">
              {/* <h1> Airports <span role="img" aria-label="plane">✈️</span></h1> */}
              {isLoaded ? <Map/> : null}
            </div>
          </div>
        </div>
      </section>
  )
}

export default Flying
