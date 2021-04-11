import React, { useEffect, useState } from 'react';
import { RosterManager } from '../components/RosterManager';
import { rosters2016 } from '../data/rosters-2016';
import { CONSTANTS } from '../constants';

import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
`;

function HomePage() {
  const [rosterData, setRosterData] = useState({});


  useEffect(() => {

    if (!window.localStorage.getItem(CONSTANTS.ROSTER_DATA_NAME)) {
      const adjustedRosterData = {};
      rosters2016.map((roster) => {
        adjustedRosterData[roster.slug] = roster;
      });


      window.localStorage.setItem(CONSTANTS.ROSTER_DATA_NAME, JSON.stringify(adjustedRosterData));
    }


    let rosterBlob = JSON.parse(window.localStorage.getItem(CONSTANTS.ROSTER_DATA_NAME));
    console.log(JSON.stringify(rosterBlob));
    setRosterData(rosterBlob);
  }, []);

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
  return (<div><div>Welcome to Baseball Pool 2021</div>
      <Flex>
        {
          rosterData && Object.keys(rosterData).map((rosterKey) => {
            const abc = rosterData[rosterKey];
            return (
              <RosterManager roster={abc} saveRosters={onSaveRosters} />     
            );
          })
        }
      </Flex>
  </div>);
}

export default HomePage