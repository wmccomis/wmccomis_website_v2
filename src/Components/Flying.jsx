import React, { useState, useMemo } from "react"
import {useLoadScript} from "@react-google-maps/api";
import Map from "./Map";
import mapStyles from "./mapStyles";
import CountUp from 'react-countup';
// import '../assets/stylesheets/flying.scss'

import Parse from 'parse';
import { useParseQuery } from '@parse/react';


const Flying = () => {

  var stats;
  const parseQuery = useMemo(
    () => {
      const parseQuery = new Parse.Query('stats');
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

  var types;
  var tails;

  if (results && results.length > 0){
    types = results[0].get("total_unique_aircraft_types").map(function(plane){
      return <div className="plane-type-stats">{plane[0]} :&nbsp; <CountUp end={plane[1]} duration={2} delay={2} enableScrollSpy={true} decimals={2}/></div>
    })

    var last_90_days = results[0].get("last_90_days")
    var last_12_months = results[0].get("last_12_months")
    tails = results[0].get("total_unique_tail_numbers").map(function(plane){
      return <div className="plane-type-stats">{plane[0]} :&nbsp; <CountUp end={plane[1]} duration={2} delay={2} enableScrollSpy={true} decimals={2}/></div>
    })
  }


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API
  });

  var widthVal = window.innerWidth-window.innerWidth/10;
  var heightVal = window.innerHeight-window.innerHeight/30;

  return (
      <section id="flying">
        <div id="flying_container">
          {/* <div className="blurred-box"> */}
          <div className="flying-stats">
            <h1 className="flying-header"> Quick Stats</h1>
            <h1 className="flying-header"> Time In Type</h1>
            <div className="quick-stats">
              {types}
            </div>
            <h1 className="flying-header"> Time In Tail</h1>
            <div className="quick-stats">
              {tails}
            </div>
          </div>
            {/* <CountUp end={100} duration={5} enableScrollSpy={true} /> */}
            <div id="map-container">
              {/* <h1> Airports <span role="img" aria-label="plane">✈️</span></h1> */}
              {isLoaded ? <Map/> : null}
            </div>
            <iframe id="logbook" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRlrrjhFol-JKW1pdwdy4b9ptBO98FWBuUyKyWcnG4Zl8lAfcRCLIyI6aiBA8dyKFUsG66g3TwmbTJ4/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false" width={widthVal} height={heightVal}></iframe>
          </div>
        {/* </div> */}
      </section>
  )
}

export default Flying