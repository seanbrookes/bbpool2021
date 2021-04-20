import React, { useEffect, useState } from 'react';
import { CONSTANTS } from '../constants';

import { RosterManager } from '../components/RosterManager';
import { AddPlayerForm } from '../components/AddPlayerForm';
import { PlayerMapper } from '../components/PlayerMapper';
import { rosters2021 } from '../data/rosters-2021';

import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const getPosValue = (pos) => {

  switch(pos) {

    case 'C':
      return 1;
    case '1B':
      return 2;
    case '2B':
      return 3;
    case '3B':
      return 4;
    case 'SS':
      return 5;
    case 'LF':
      return 6;
    case 'CF':
      return 7;
    case 'RF':
      return 8;
    case 'DH':
      return 9;
    case 'SP':
      return 10;
    case 'RP':
      return 11;
    default:
      return 0;
  }
};

export const sortRosterPlayers = (players) => {

  const sort = players.sort(function(a, b) {
    return getPosValue(a.pos) - getPosValue(b.pos);
  });

  return sort;
};

/*
  var battersUrl = "http://mlb.mlb.com/pubajax/wf/flow/stats.splayer?season=2019&sort_order=%27desc%27&sort_column=%27g%27&stat_type=hitting&page_type=SortablePlayer&game_type=%27R%27&player_pool=QUALIFIER&season_type=ANY&league_code=%27AL%27&sport_code=%27mlb%27&results=1000&recSP=1&recPP=999";
  var pitchersUrl = "http://mlb.mlb.com/pubajax/wf/flow/stats.splayer?season=2019&sort_order=%27desc%27&sort_column=%27sv%27&stat_type=pitching&page_type=SortablePlayer&game_type=%27R%27&player_pool=QUALIFIER&season_type=ANY&league_code=%27AL%27&sport_code=%27mlb%27&results=1000&position=%271%27&recSP=1&recPP=999";
  var nlPitchersUrl = "http://mlb.mlb.com/pubajax/wf/flow/stats.splayer?season=2019&sort_order=%27desc%27&sort_column=%27sv%27&stat_type=pitching&page_type=SortablePlayer&game_type=%27R%27&player_pool=QUALIFIER&season_type=ANY&league_code=%27NL%27&sport_code=%27mlb%27&results=1000&position=%271%27&recSP=1&recPP=999";
  var nlBattersUrl = "http://mlb.mlb.com/pubajax/wf/flow/stats.splayer?season=2019&sort_order=%27desc%27&sort_column=%27g%27&stat_type=hitting&page_type=SortablePlayer&game_type=%27R%27&player_pool=QUALIFIER&season_type=ANY&league_code=%27NL%27&sport_code=%27mlb%27&results=1000&recSP=1&recPP=999";




*/
const battersUrl = "https://bdfed.stitch.mlbinfra.com/bdfed/stats/player?stitch_env=prod&season=2021&stats=season&group=hitting&gameType=R&limit=1000&offset=0&sortStat=onBasePlusSlugging&order=desc&playerPool=ALL_CURRENT&leagueIds=103";

const pitchersUrl = "https://bdfed.stitch.mlbinfra.com/bdfed/stats/player?stitch_env=prod&season=2021&stats=season&group=pitching&gameType=R&limit=1000&offset=0&sortStat=earnedRunAverage&order=asc&playerPool=ALL_CURRENT&leagueIds=103";

export async function getServerSideProps(context) {

  // fetch(battersUrl)
  // .then((response) => { 
  //   console.log(`|  response data  ${JSON.stringify(response)}`)
  //   //return response
  //   return response.json()
  // })
  // .then((data) => { 
  //   return console.log(`|  response data  ${JSON.stringify(data)}`)
  // })
  // .catch((err) => {
  //   return console.log(`|  ERROR     ${JSON.stringify(err)}`)
  // });

  return {
    props: {}, // will be passed to the page component as props
  }
}
function HomePage() {
  const [rosterData, setRosterData] = useState({});
  const [isHiddenOn, setIsHiddenOn] = useState(false);


  useEffect(() => {

    // if (!window.localStorage.getItem(CONSTANTS.ROSTER_DATA_NAME)) {
    //   window.localStorage.setItem(CONSTANTS.ROSTER_DATA_NAME, JSON.stringify(rosters2021));
    // }
   //let rosterBlob = JSON.parse(window.localStorage.getItem(CONSTANTS.ROSTER_DATA_NAME));
   let rosterBlob = rosters2021;
   Object.keys(rosterBlob).map((rosterKey) => {
    rosterBlob[rosterKey].players.map((player) => {
      if (!player.roster) {
        player.roster = rosterKey;
      }
    })
   });

  // window.localStorage.setItem(CONSTANTS.ROSTER_DATA_NAME, JSON.stringify(rosterBlob));

   // console.log(JSON.stringify(rosterBlob));
    setRosterData(rosterBlob);
  }, []);

  const onHiddenControlClick = (event) => {
    setIsHiddenOn(!isHiddenOn);
  };

  // const onUpdateRosterPlayer = (player) => {
  //   if (player && player.roster) {
  //     rosterData[player.roster].players.map((rosterPlayer) => {
  //       if (rosterPlayer.name = player.name) {
  //         rosterPlayer = player;
  //       }
  //       return rosterPlayer;

  //     });
  //   }
  // };

  const onSaveRosters = (targetRoster) => {
    const clonedRosterData = {...rosterData};
    if (targetRoster.slug) {
      clonedRosterData[targetRoster.slug] = targetRoster;
    }
    //clonedRosterData
    setRosterData(clonedRosterData);
    window.localStorage.setItem(CONSTANTS.ROSTER_DATA_NAME, JSON.stringify(clonedRosterData));
  };

  const onSavePlayer = (player) => {

    console.log(`| SAVE player  ${JSON.stringify(player)}  `);
    if (player && player.roster) {
      const clonedRosterData = {...rosterData};

      const targetRoster = clonedRosterData[player.roster];

      const existingPlayerFilter = targetRoster.players.filter((rosterPlayer) => {
        return rosterPlayer.name === player.name;
      });

      if (existingPlayerFilter.length === 0) {
        console.log(`|  ADD PLAYER AND SAVE`);
        targetRoster.players.push(player);
        clonedRosterData[player.roster] = targetRoster;
        setRosterData(clonedRosterData);
        window.localStorage.setItem(CONSTANTS.ROSTER_DATA_NAME, JSON.stringify(clonedRosterData));  
  
      }
      else {
        clonedRosterData[player.roster].players.map((rosterPlayer) => {
          if (rosterPlayer.name === player.name) {
            rosterPlayer = player;
          }  
        });
        setRosterData(clonedRosterData);
        window.localStorage.setItem(CONSTANTS.ROSTER_DATA_NAME, JSON.stringify(clonedRosterData));  

      }


    }
    else {
      console.warn(`| tried to save a player with no roster ${JSON.stringify(player)}`);
    }

  };

  // let rosters2016 = [];
  return (<div>
      <input style={{position: 'absolute', top: 0, right: 0}} type="checkbox" onChange={onHiddenControlClick} />
      <div>Welcome to Baseball Pool 2021</div>
      {/* <PlayerMapper rosterData={rosterData} savePlayer={onSavePlayer} /> */}
      {isHiddenOn && <AddPlayerForm savePlayer={onSavePlayer} />}
      <Flex>
        {
          rosterData && Object.keys(rosterData).map((rosterKey) => {
            const currentRoster = rosterData[rosterKey];
            currentRoster.players = sortRosterPlayers(currentRoster.players);
            return (
              <RosterManager roster={currentRoster} saveRosters={onSaveRosters} isHiddenOn={isHiddenOn} />     
            );
          })
        }
      </Flex>
      {isHiddenOn && <textarea rows="12" cols="90" defaultValue={JSON.stringify(rosterData)} />}
  </div>);
}

export default HomePage