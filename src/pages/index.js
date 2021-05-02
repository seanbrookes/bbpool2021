import React, { useEffect, useState } from 'react';
import { CONSTANTS } from '../constants';

import { RosterManager } from '../components/RosterManager';
import { AddPlayerForm } from '../components/AddPlayerForm';
import { PlayerMapper } from '../components/PlayerMapper';
import { PageHeader } from '../components/PageHeader';
import { rosters2021 } from '../data/rosters-2021';
import { Layout } from '../components/Layout';

import { usePoolContext } from '../data/PoolContextProvider';


import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;
const PageTitle = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 18px;
  font-weight: 200;

`;


const posList = [
  'C',
  '1B',
  '2B',
  '3B',
  'SS',
  'OF',
  'DH',
  'SP',
  'RP'
];

/* 
@media (min-width: 768px) { 
    padding: 1rem 2rem;
    width: 11rem;
  }
*/

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








function HomePage() {
  const [rosterData, setRosterData] = useState({});
  const [isHiddenOn, setIsHiddenOn] = useState(false);

  const [rosterTotals, setRosterTotals] = useState([]);

  const { state, dispatch } = usePoolContext();

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

    const preExistingHitterStats = window.localStorage.getItem(CONSTANTS.RAW_HITTER_STATS);
    if (preExistingHitterStats) {
      dispatch({type: 'setMlbHitters', mlbHitters: JSON.parse(preExistingHitterStats)});
      //setMlbHitters(JSON.parse(preExistingHitterStats));
    }

    const preExistingPitcherStats = window.localStorage.getItem(CONSTANTS.RAW_PITCHER_STATS)
    if (preExistingPitcherStats) {
      dispatch({type: 'setMlbHitters', mlbHitters: JSON.parse(preExistingHitterStats)});
     // setMlbPitchers(JSON.parse(preExistingPitcherStats));
    }


    // window.localStorage.setItem(CONSTANTS.ROSTER_DATA_NAME, JSON.stringify(rosterBlob));

    // console.log(JSON.stringify(rosterBlob));
    setRosterData(rosterBlob);
  }, []);



  useEffect(() => {

    const rosterTotals = {};
    rosterData && Object.keys(rosterData).map((rosterKey) => {
      const currentRoster = rosterData[rosterKey];
      rosterTotals[rosterKey] = {
        'SP': 0,
        'RP': 0,
        'OF': 0,
        'C': 0,
        '1B': 0,
        '2B': 0,
        '3B': 0,
        'SS': 0,
        'DH': 0,
        'hitters': 0,
        'starters': 0,
        'relievers': 0,
        'grandTotal': 0,
        'roster': rosterKey
      };

      posList.map((position) => {
 
        if (currentRoster && currentRoster.players) {
    
          // total it up


          // clean up outfield positions
          const positionCollection = currentRoster ? currentRoster.players.filter((rosterPlayer) => {
            if (position === 'OF' && (rosterPlayer.pos === 'LF' || rosterPlayer.pos === 'CF' || rosterPlayer.pos === 'RF' || rosterPlayer.pos === 'OF')) {
              rosterPlayer.pos = 'OF';
              return rosterPlayer;
            }
            return rosterPlayer.pos === position;
          }) : [];
      
          // sort the collection
          const sortedCollection = positionCollection.sort((a, b) => {
            var x = a.total;
            var y = b.total;
            return x > y ? -1 : x < y ? 1 : 0;
          });
          let tally = 0;
      
          if (sortedCollection.length > 0) {





            /*
            
            TALLY STARTERS
            
            
            */
            if (position === 'SP') {
              // tally up starters
              tally = 0 ;
              let calculationCollection = [].concat(sortedCollection);
              if (calculationCollection.length > 4) {
                calculationCollection = sortedCollection.filter((item, index) => {return index < 4});
              }
              calculationCollection.map((player) => {
                tally = tally + player.total;

              });
              rosterTotals[rosterKey]['SP'] = tally;
              rosterTotals[rosterKey]['starters'] = tally;
            //  setRosterStartersTotal(tally);
      
      
            }

            /*
            
            TALLY CLOSERS
            
            
            */
            else if (position === 'RP') {
              // tally up closers
              tally = 0 ;
              let calculationCollection = [].concat(sortedCollection);
              if (sortedCollection.length > 2) {
                calculationCollection = sortedCollection.filter((item, index) => {return index < 2});
              }
              calculationCollection.map((player) => {
                tally = tally + player.total;
              });
              rosterTotals[rosterKey]['RP'] = tally;
              rosterTotals[rosterKey]['relievers'] = tally;
          //    setRosterClosersTotal(tally);
            }


          /*
            
            TALLY OUTFIELD
            
            
            */
            else if (position === 'OF') {
              // tally up outfielders
              tally = 0 ;
              let calculationCollection = [].concat(sortedCollection);
              if (sortedCollection.length > 3) {
                calculationCollection = sortedCollection.filter((item, index) => {return index < 3});
              }
              calculationCollection.map((player) => {
                tally = tally + player.total;
              });
              rosterTotals[rosterKey]['OF'] = tally;
          //   setRosterOutfieldTotal(tally);
            }


            /*
            
            TALLY EACH POSITION
            
            
            */
            else {
              // tally up regular hitter
              tally = 0 ;
              tally = sortedCollection[0].total;
      
              
              rosterTotals[rosterKey][position] = tally;      
              switch(position) {
      
                case 'C': {
          //       setRosterCatcherTotal(tally);

                  break;
                }
                case '1B': {
          //        setRoster1BTotal(tally);
      
                  break;
                }
                case '2B': {
          //        setRoster2BTotal(tally);
      
                  break;
                }
                case '3B': {
          //       setRoster3BTotal(tally);
      
                  break;
                }
                case 'SS': {
          //       setRosterSSTotal(tally);
      
                  break;
                }
                case 'DH': {
          //       setRosterDHTotal(tally);
      
                  break;
                }
                default: {
                  
                }
              }
            }
        
          }
    
    
    
    
    

        // setRosterHittersTotal(runningHitterTotal);   
    
    
    
    
    
    
    
        }
    
    
       });
       rosterTotals[rosterKey]['hitters'] =  Number(rosterTotals[rosterKey]['OF']) + 
        Number(rosterTotals[rosterKey]['C']) + 
        Number(rosterTotals[rosterKey]['1B']) + 
        Number(rosterTotals[rosterKey]['2B']) + 
        Number(rosterTotals[rosterKey]['3B']) + 
        Number(rosterTotals[rosterKey]['SS']) + 
        Number(rosterTotals[rosterKey]['DH']);

        if (rosterTotals[rosterKey]['hitters'] && rosterTotals[rosterKey]['starters'] && rosterTotals[rosterKey]['relievers']) {

          const theTotal = rosterTotals[rosterKey]['hitters'] + rosterTotals[rosterKey]['starters'] + rosterTotals[rosterKey]['relievers'];
    
          rosterTotals[rosterKey]['grandTotal'] = theTotal;
      
        }
    });


    if (rosterTotals['bashers']) {  // pick any one just to make sure we have data

      let grandTotalsHistoryData = window.localStorage.getItem('GRAND_TOTALS_HISTORY');

      let theHistoryData = {};
  
      if (!grandTotalsHistoryData) {
        const timestamp = new Date().getTime();
        grandTotalsHistoryData = {};
        rosterTotals.timestamp = timestamp;
        grandTotalsHistoryData[timestamp] = rosterTotals;
        theHistoryData = grandTotalsHistoryData;
        window.localStorage.setItem('GRAND_TOTALS_HISTORY', JSON.stringify(theHistoryData));
      }
      else {
        theHistoryData = JSON.parse(grandTotalsHistoryData);

        let historyCollection = []
        Object.keys(theHistoryData).map((historyKey) => {
          const currentDataObject = theHistoryData[historyKey];
          historyCollection.push(currentDataObject);
        });
    

        let isNewHistory = false;
        if (historyCollection.length > 1) {
          historyCollection.sort((a, b) => {
            var x = a.timestamp;
            var y = b.timestamp;
            return x > y ? -1 : x < y ? 1 : 0;
          });

          const currentHistoryObj = rosterTotals;
          const previousHistoryObj = historyCollection[0];



          if ((rosterTotals['stallions']['grandTotal'] !== previousHistoryObj['stallions']['grandTotal']) ||
          (rosterTotals['mashers']['grandTotal'] !== previousHistoryObj['mashers']['grandTotal']) ||
          (rosterTotals['bashers']['grandTotal'] !== previousHistoryObj['bashers']['grandTotal']) ||
          (rosterTotals['rallycaps']['grandTotal'] !== previousHistoryObj['rallycaps']['grandTotal'])) {
            console.log('|  this is new history ');
             isNewHistory = true;
          }
          else {
            console.log('|  this is not new history ');  
          }


        }
        else {
          isNewHistory = true;
        }






        if (isNewHistory) {
          // create a new history object
          const newTimestamp = new Date().getTime();

          rosterTotals.timestamp = newTimestamp;
          theHistoryData[newTimestamp] = rosterTotals;
          dispatch({type: 'setLastUpdateTimestamp', timestamp: newTimestamp});

          window.localStorage.setItem('GRAND_TOTALS_HISTORY', JSON.stringify(theHistoryData));
        }

    
    
    
        console.log('| grand total blob  ', theHistoryData);




        let deltaMasterHistoryData = window.localStorage.getItem('GRAND_TOTALS_HISTORY');
        let parsedDeltaMasterHistoryData = JSON.parse(deltaMasterHistoryData);

        let deltaHistoryCollection = [];
        Object.keys(parsedDeltaMasterHistoryData).map((historyKey) => {
          const currentDataObject = theHistoryData[historyKey];
          deltaHistoryCollection.push(currentDataObject);
        });

        if (deltaHistoryCollection.length > 1) {
          deltaHistoryCollection.sort((a, b) => {
            var x = a.timestamp;
            var y = b.timestamp;
            return x > y ? -1 : x < y ? 1 : 0;
          });

          const newer = deltaHistoryCollection[0];
          const older = deltaHistoryCollection[1];

          dispatch({type: 'setLastUpdateTimestamp', timestamp: newer.timestamp});

          rosterTotals['bashers']['delta'] = (Number(newer['bashers']['grandTotal']) - Number(older['bashers']['grandTotal']));
          rosterTotals['mashers']['delta'] = (Number(newer['mashers']['grandTotal']) - Number(older['mashers']['grandTotal']));
          rosterTotals['rallycaps']['delta'] = (Number(newer['rallycaps']['grandTotal']) - Number(older['rallycaps']['grandTotal']));
          rosterTotals['stallions']['delta'] = (Number(newer['stallions']['grandTotal']) - Number(older['stallions']['grandTotal']));




      }
  

  
    }
  }





 
    dispatch({type: 'setGrandTotals', rosterTotals});
 
    setRosterTotals(rosterTotals);
 
 
   }, [rosterData]);
















































  const onHiddenControlClick = (event) => {
    setIsHiddenOn(!isHiddenOn);
  };

  const onUpdateRosterTotal = (roster, total) => {
    if (rosterData) {
      const copyRosterData = {...rosterData};


      copyRosterData[roster].total = total;
      
      setRosterData(copyRosterData);
  
    }

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



  
return (<Layout>
      {isHiddenOn && <AddPlayerForm savePlayer={onSavePlayer} />}

      <Flex>
        {
          rosterData && Object.keys(rosterData).map((rosterKey) => {
            const currentRoster = rosterData[rosterKey];
            currentRoster.players = sortRosterPlayers(currentRoster.players);
            return (
              <RosterManager onUpdateRosterTotal={onUpdateRosterTotal} mlbPitchers={state?.mlbPitchers?.stats} mlbHitters={state?.mlbHitters?.stats} roster={currentRoster} saveRosters={onSaveRosters} isHiddenOn={isHiddenOn} />     
            );
          })
        }
      </Flex>
      {isHiddenOn && <textarea rows="12" cols="90" defaultValue={JSON.stringify(rosterData)} />}
  </Layout>);
}

export default HomePage