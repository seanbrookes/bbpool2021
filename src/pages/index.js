import React, { useEffect, useState } from 'react';
import { CONSTANTS } from '../constants';

import { RosterManager } from '../components/RosterManager';
import { AddPlayerForm } from '../components/AddPlayerForm';
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

function HomePage() {
  const [rosterData, setRosterData] = useState({});
  const [isHiddenOn, setIsHiddenOn] = useState(false);


  useEffect(() => {

  //   if (!window.localStorage.getItem(CONSTANTS.ROSTER_DATA_NAME)) {
  //     window.localStorage.setItem(CONSTANTS.ROSTER_DATA_NAME, JSON.stringify(rosters2021));
  //   }
  //  let rosterBlob = JSON.parse(window.localStorage.getItem(CONSTANTS.ROSTER_DATA_NAME));


    let rosterBlob = rosters2021;
    console.log(JSON.stringify(rosterBlob));
    setRosterData(rosterBlob);
  }, []);

  const onHiddenControlClick = (event) => {
    setIsHiddenOn(!isHiddenOn);
  }

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
  };

  // let rosters2016 = [];
  return (<div>
      <input style={{position: 'absolute', top: 0, right: 0}} type="checkbox" onChange={onHiddenControlClick} />
      <div>Welcome to Baseball Pool 2021</div>
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
      {isHiddenOn && <textarea rows="12" cols="90" value={JSON.stringify(rosterData)} />}
  </div>);
}

export default HomePage