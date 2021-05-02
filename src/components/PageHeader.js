import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePoolContext } from '../data/PoolContextProvider';
import styled from 'styled-components';
import { CONSTANTS } from '../constants';

import { getPitcherStats, getHitterStats } from '../data/fetchStats';

const Flex = styled.div`
  display: flex;
`;

const PoolTitle = styled.div`
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: green;

  @media (max-width: 600px) { 
    display: none;
  }

  a {
    text-decoration: none;
  }

`;

const LastUpdateNotice = styled.div`
  font-size: 14px;
  margin: 0 2rem;
  @media (max-width: 768px) { 
    margin: 0;
  }
`;
const ForceRefreshButton = styled.button`
  background: #fdfdfd;
  border: 1px solid #efefef;
  color: darkblue;
  padding: .2rem .5rem;
  border-radius: .4rem;
  cursor: pointer;
  font-size: 12px;

  :hover {
    color: blue;
    text-decoration: underline;
    background: #efefef;
  }
  :active {
    color: #444444;
    background: #dddddd;
    text-decoration: none;
  }
`;

export const PageHeader = () => {
  const { state, dispatch } = usePoolContext();

  useEffect(() => {
    const initStats = async () => {
      return onLoadPlayerStats();
    }
    initStats();

  }, []);


  const onLoadPlayerStats = async (event, isForceRefresh) => {

    /*
      stats blob
      {
        timestamp: 234234224,
        stats: {  // key object structure
          23423: {
            playerId: 23423,
            playerName: 'raul mondesi'

          }
        }
      }
    

export const CONSTANTS = {
  ROSTER_DATA_NAME: 'ROSTER_DATA',
  RAW_PITCHER_STATS: 'RAW_PITCHER_STATS',
  RAW_HITTER_STATS: 'RAW_HITTER_STATS',
  STALE_STATS_TIME_GAP: 800
};


    */

    let loadFromSource = false;
    let mlbPitchersBlob = {};
    let mlbHittersBlob = {};
    let preExistingPitcherStats = null;


    if (isForceRefresh) {
      loadFromSource = true;
      
    }
    else { // may exist but are expired, or may not be expired, or never loaded



      preExistingPitcherStats = window.localStorage.getItem(CONSTANTS.RAW_PITCHER_STATS);  // this is a string not an object
      
      if (preExistingPitcherStats) {
        const parsedPitcherStats = JSON.parse(preExistingPitcherStats);
        const currentTimeStamp = new Date().getTime();
        // check if timestamp has expired
        if (parsedPitcherStats && parsedPitcherStats.timestamp) {
          const timeGap = currentTimeStamp - parsedPitcherStats.timestamp;
          if (timeGap > CONSTANTS.STALE_STATS_TIME_GAP) {
            isForceRefresh = true;
          }
          else {
            mlbPitchersBlob = parsedPitcherStats.stats;
          }
        }

      }
      else {
        isForceRefresh = true;
      }

    }

    







    if (isForceRefresh) {
      // Pitchers
      getPitcherStats()
      .then((data) => {
        console.log('got the pitchers data', data);
        if (data && data.stats) {
          data.stats.sort((a, b) => {
            var x = a.playerName.toLowerCase();
            var y = b.playerName.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          });
          const pitcherStatsObj = {};
          data.stats.map((pitcher) => {
            pitcherStatsObj[pitcher.playerId] = pitcher;
          });
          const localLatestPitcherStats = {
            timestamp: new Date().getTime(),
            stats: pitcherStatsObj
          };
          dispatch({type: 'setMlbPitchers', mlbPitchers: localLatestPitcherStats});
         // setMlbPitchers(localLatestPitcherStats);

          window.localStorage.setItem(CONSTANTS.RAW_PITCHER_STATS, JSON.stringify(localLatestPitcherStats));  
        }
        else {
          console.warn(`| invalid attempt to set Pitcher data  ${JSON.stringify(data)}`)
        }
      });
      // Hitters
      getHitterStats()
      .then((data) => {
        console.log('got the hitters data', data);
        if (data && data.stats) {
          data.stats.sort((a, b) => {
            var x = a.playerName.toLowerCase();
            var y = b.playerName.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          });
          const hitterStatsObj = {};
          data.stats.map((hitter) => {
            hitterStatsObj[hitter.playerId] = hitter;
          });
          const localLatestHitterStats = {
            timestamp: new Date().getTime(),
            stats: hitterStatsObj
          };
          dispatch({type: 'setMlbHitters', mlbHitters: localLatestHitterStats});
      //    setMlbHitters(localLatestHitterStats);

          window.localStorage.setItem(CONSTANTS.RAW_HITTER_STATS, JSON.stringify(localLatestHitterStats));
  
        }
        else {
          console.warn(`| invalid attempt to set Hitter data  ${JSON.stringify(data)}`)
        }
      });
    }
    else {
      // preexisting fresh stats
      const parsedExistingPitcherStats = JSON.parse(preExistingPitcherStats);
      // parsedExistingPitcherStats.sort((a, b) => {
      //   var x = a.playerName.toLowerCase();
      //   var y = b.playerName.toLowerCase();
      //   return x < y ? -1 : x > y ? 1 : 0;
      // });
      dispatch({type: 'setMlbPitchers', mlbPitchers: parsedExistingPitcherStats});
 //     setMlbPitchers(parsedExistingPitcherStats);


      const preExistingHitterStats = window.localStorage.getItem(CONSTANTS.RAW_PITCHER_STATS);  // this is a string not an object

      const parsedExistingHitterStats = preExistingHitterStats ? JSON.parse(preExistingHitterStats) : [];
      // parsedExistingHitterStats.sort((a, b) => {
      //   var x = a.playerName.toLowerCase();
      //   var y = b.playerName.toLowerCase();
      //   return x < y ? -1 : x > y ? 1 : 0;
      // });
      dispatch({type: 'setMlbHitters', mlbHitters: parsedExistingHitterStats});
  //    setMlbHitters(parsedExistingHitterStats);
    }

  };

  

  let lastUpdate = null;
  if (state.timestamp && state.timestamp > 0) {
    var date = new Date(state.timestamp);

//    lastUpdate =`Date: ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  
   // lastUpdate = `stats as of: ${date.toDateString()} ${date.toLocaleTimeString && date.toLocaleTimeString()} ${date.getTimezoneOffset && date.getTimezoneOffset()}`;

    let dateFormatOptions;
    dateFormatOptions = { dateStyle: 'full', timeStyle: 'long' };
    lastUpdate = `Stats as of: ${new Intl.DateTimeFormat('en-US', dateFormatOptions).format(date)}`;
  }
  return (
    <header>
      <Flex style={{alignItems: 'center', justifyContent: 'space-between'}}>
        <PoolTitle><Link href="/"><a>Baseball Pool 2021</a></Link></PoolTitle>
        <LastUpdateNotice>{state && state.timestamp && lastUpdate}</LastUpdateNotice>
        <ForceRefreshButton onClick={onLoadPlayerStats}>refresh stats</ForceRefreshButton>
        </Flex>
    </header>
  );
};