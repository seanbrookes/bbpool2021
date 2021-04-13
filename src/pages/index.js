import React, { useEffect, useState } from 'react';
import { RosterManager } from '../components/RosterManager';
import { rosters2021 } from '../data/rosters-2021';
import { CONSTANTS } from '../constants';

import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
`;

function HomePage() {
  const [rosterData, setRosterData] = useState({});
  const [isHiddenOn, setIsHiddenOn] = useState(false);


  useEffect(() => {

    if (!window.localStorage.getItem(CONSTANTS.ROSTER_DATA_NAME)) {
      window.localStorage.setItem(CONSTANTS.ROSTER_DATA_NAME, JSON.stringify(rosters2021));
    }

    let rosterBlob = JSON.parse(window.localStorage.getItem(CONSTANTS.ROSTER_DATA_NAME));
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
  }

  // let rosters2016 = [];
  return (<div>
      <input style={{position: 'absolute', top: 0, right: 0}} type="checkbox" onChange={onHiddenControlClick} />
      <div>Welcome to Baseball Pool 2021</div>
      <Flex>
        {
          rosterData && Object.keys(rosterData).map((rosterKey) => {
            const abc = rosterData[rosterKey];
            return (
              <RosterManager roster={abc} saveRosters={onSaveRosters} isHiddenOn={isHiddenOn} />     
            );
          })
        }
      </Flex>
  </div>);
}

export default HomePage