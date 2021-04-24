import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PlayerGroupTable = styled.table`

  margin: 0 2rem 0 2rem;
  td {
    border-bottom: 1px solid #dddddd;
    font-size: 15px;
  }

  display: none;


`;


const RosterManagerContainer = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding: 1rem;
  font-family: arial sans-serif;
  display: block;
`;

const RosterTitle = styled.h2`
  font-size: 16px;
  color: #a80000;
  background-color: #eeeeee;
  text-transform: capitalize;

`;



const HitterPosTable = styled.table`
  margin: .75rem 2rem 0 2rem;

  th {
    border-bottom: 1px solid #eeeeee;
    font-size: 11px;
  }
  border-bottom: 1px solid #dddddd;


  caption {
    text-align: left;
    font-size: 10px;
    font-weight: 600;
  }
`;

const NameCell = styled.div`
  width: 100px;
  font-size: 12px;
`;
const TeamCell = styled.div`
  width: 30px;
  font-size: 9px;
  text-align: left;
`;
const RunsCell = styled.div`
  font-size: 11px;
  width: 22px;
  text-align: center;
`;
const HitsCell = styled.div`
font-size: 11px;
width: 22px;
text-align: center;
`;
const HRCell = styled.div`
font-size: 11px;
text-align: center;
width: 22px;
`;
const RBICell = styled.div`
font-size: 11px;
text-align: center;
width: 22px;
`;
const SBCell = styled.div`
font-size: 11px;
width: 22px;
text-align: center;
`;
const TotalCell = styled.div`
font-size: 12px;
text-align: left;
width: 22px;
font-weight: 600;
`;


const getHitterTotal = (hitter) => {
  const totalVal = (hitter.runs) + (hitter.hits / 2) + (hitter.rbi) + (hitter.homeRuns * 2) + (hitter.stolenBases / 2);
  return totalVal;
};
const getStarterTotal = (starter) => {
  const totalVal = ((starter.wins * 15) - (starter.losses * 4) + (starter.strikeOuts / 2));
  return totalVal;
};
const geCloserTotal = (reliever) => {
  const totalVal = (reliever.saves * 7) + (reliever.wins * 6) + (reliever.strikeOuts / 2) + (reliever.inningsPitched / 2);
  return totalVal;
};

const HiiterPosContainer = ({hittersBlob, pos, roster}) => {
  if (!pos) {
    return null;
  }
  const allPosition = hittersBlob && hittersBlob[pos];
  const rosterPosition = allPosition && allPosition.filter((player) => {
    return player.roster === roster;
  }).sort((a, b) => {
    var x = a.total;
    var y = b.total;
    return x > y ? -1 : x < y ? 1 : 0;
  });
  return (
    <HitterPosTable>
      <caption>{pos}</caption>
      <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>r</th>
            <th>h</th>
            <th>hr</th>
            <th>rbi</th>
            <th>sb</th>
            <th>total</th>
          </tr>
      {rosterPosition && rosterPosition.map((player, index) => {
        return (
          <tr>
            <td style={{fontSize: '9px', color: '#444444'}}>{index + 1}</td>
            <td><NameCell>{player.name}</NameCell></td>
            <td><TeamCell>{player.team}</TeamCell></td>
            <td><RunsCell>{player.runs}</RunsCell></td>
            <td><HitsCell>{player.hits}</HitsCell></td>
            <td><HRCell>{player.homeRuns}</HRCell></td>
            <td><RBICell>{player.rbi}</RBICell></td>
            <td><SBCell>{player.stolenBases}</SBCell></td>
            <td><TotalCell>{player.total}</TotalCell></td>
          </tr>
        );
      })}
    </HitterPosTable>
  );
};

const StarterPosContainer = ({startersBlob, roster}) => {
  const allPosition = startersBlob && startersBlob['SP'];
  const rosterPosition = allPosition && allPosition.filter((player) => {
    return player.roster === roster;
  }).sort((a, b) => {
    var x = a.total;
    var y = b.total;
    return x > y ? -1 : x < y ? 1 : 0;
  });
  return (
    <HitterPosTable>
      <caption>Starters</caption>
      <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>w</th>
            <th>l</th>
            <th>k</th>
            <th></th>
            <th>total</th>
          </tr>
      {rosterPosition && rosterPosition.map((player, index) => {
        return (
          <tr>
            <td style={{fontSize: '9px', color: '#444444'}}>{index + 1}</td>
            <td><NameCell>{player.name}</NameCell></td>
            <td><TeamCell>{player.team}</TeamCell></td>
            <td><RunsCell></RunsCell></td>
            <td><HitsCell>{player.wins}</HitsCell></td>
            <td><HRCell>{player.losses}</HRCell></td>
            <td><RBICell>{player.strikeOuts}</RBICell></td>
            <td><SBCell></SBCell></td>
            <td><TotalCell>{player.total}</TotalCell></td>
          </tr>
        );
      })}
    </HitterPosTable>
  );
};
const ClosersPosContainer = ({pitchersBlob, roster}) => {
  const allPosition = pitchersBlob && pitchersBlob['RP'];
  const rosterPosition = allPosition && allPosition.filter((player) => {
    return player.roster === roster;
  }).sort((a, b) => {
    var x = a.total;
    var y = b.total;
    return x > y ? -1 : x < y ? 1 : 0;
  });
  return (
    <HitterPosTable>
      <caption>Closers</caption>
      <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>sv</th>
            <th>w</th>
            <th>l</th>
            <th>k</th>
            <th>ip</th>
            <th>total</th>
          </tr>
      {rosterPosition && rosterPosition.map((player, index) => {
        return (
          <tr>
            <td style={{fontSize: '9px', color: '#444444'}}>{index + 1}</td>
            <td><NameCell>{player.name}</NameCell></td>
            <td><TeamCell>{player.team}</TeamCell></td>
            <td><RunsCell>{player.saves}</RunsCell></td>
            <td><HitsCell>{player.wins}</HitsCell></td>
            <td><HRCell>{player.losses}</HRCell></td>
            <td><RBICell>{player.strikeOuts}</RBICell></td>
            <td><SBCell>{player.inningsPitched}</SBCell></td>
            <td><TotalCell>{player.total}</TotalCell></td>
          </tr>
        );
      })}
    </HitterPosTable>
  );
};

export const RosterManager = ({mlbHitters, mlbPitchers, roster = {}, saveRosters, isHiddenOn}) => {
  const [targetNewPlayer, setTargetNewPlayer] = useState(null);
  const [currentRosterScoreData, setCurrentRosterScoreData] = useState(null);
  const [currentRawScoreData, setCurrentRawScoreData] = useState(null);
  const [currentRoster, setCurrentRoster] = useState(null);


  useEffect(() => {
/*
hiiter total calc:
      totalVal = (baseValObj.r) + (baseValObj.h / 2) + (baseValObj.rbi) + (baseValObj.hr * 2) + (baseValObj.sb / 2);

      starter totals:
       totalVal = ((baseValObj.w * 15) - (baseValObj.l * 4) + (baseValObj.k / 2));

       closer totals
           totalVal = (baseValObj.sv * 7) + (baseValObj.w * 6) + (baseValObj.k / 2) + (baseValObj.ip / 2);


*/


    if (roster && roster.players) {
      const newScoreData = {hitters: {}, starters: {}, relievers: {}};
      const positionScoreData = {};
      roster.players.map((player) => {
        if (player.posType === 'hitter') {
          if (player.playerId) {
            const currentPlayerStats = {};
            const rawHitterStats = mlbHitters && mlbHitters[player.playerId];
            if (rawHitterStats) {
              newScoreData['hitters'][player.playerId] = rawHitterStats;


              const currentHitter = player && newScoreData && newScoreData['hitters'] && newScoreData['hitters'][player.playerId] && newScoreData['hitters'][player.playerId];
              player.total = currentHitter ? getHitterTotal(currentHitter) : 0;

              const mergedPlayerData = {...player, ...currentHitter};
              let thePos = player.pos;
              if (player.pos === 'LF' || player.pos === 'CF' || player.pos === 'RF') {
                thePos = 'OF';
              }   
              if (!positionScoreData[thePos]) {
                positionScoreData[thePos] = [];
              }

              positionScoreData[thePos].push(mergedPlayerData);
            }
          }
        }
        else if (player.pos === 'SP') {
          if (player.playerId) {
            const rawPitcherStats = mlbPitchers && mlbPitchers[player.playerId];
            if (rawPitcherStats) {
              newScoreData['starters'][player.playerId] = rawPitcherStats;

              const currentPitcher = player && newScoreData && newScoreData['starters'] && newScoreData['starters'][player.playerId] && newScoreData['starters'][player.playerId];
              player.total = currentPitcher ? getStarterTotal(currentPitcher) : 0;

              const mergedPitcherData = {...player, ...currentPitcher};
              if (!positionScoreData['SP']) {
                positionScoreData['SP'] = [];
              }

              positionScoreData['SP'].push(mergedPitcherData);
            }
          }
        }
        else  if (player.pos === 'RP') {
          if (player.playerId) {
            const rawRelieverStats = mlbPitchers && mlbPitchers[player.playerId];
            if (rawRelieverStats) {
              newScoreData['relievers'][player.playerId] = rawRelieverStats;
              const currentCloserPitcher = player && newScoreData && newScoreData['relievers'] && newScoreData['relievers'][player.playerId] && newScoreData['relievers'][player.playerId];
              player.total = currentCloserPitcher ? geCloserTotal(currentCloserPitcher) : 0;

              const mergedCloserData = {...player, ...currentCloserPitcher};
              if (!positionScoreData['RP']) {
                positionScoreData['RP'] = [];
              }

              positionScoreData['RP'].push(mergedCloserData);
            }
          }
        }
        else {
          console.warn('| This does not have a clear position', player);
        }
      });
      setCurrentRosterScoreData(positionScoreData);
      setCurrentRawScoreData(newScoreData);
      setCurrentRoster({...roster});

      

      window.localStorage.setItem('RAW_STATS', JSON.stringify(newScoreData));
      window.localStorage.setItem('ROSTER_STATS', JSON.stringify(positionScoreData));

    }
  }, [roster, mlbHitters, mlbPitchers]);
  

  useEffect(() => {
    // calculate and store current player stat/score data
    currentRoster && currentRoster.players && currentRoster.players.map((player) => {

    });


  }, [currentRoster])

  const hitters = roster.players.filter((player) => {
    if (player.posType === 'pitcher' && player.pos === 'CF') {
      player.posType = 'hitter';
    }
    return player.posType === 'hitter';
  });
  const starters = roster.players.filter((player) => {
    return player.pos.toLowerCase() === 'sp';
  });
  const closers = roster.players.filter((player) => {
    return player.pos.toLowerCase() === 'rp';
  });


  const onTriggerDeletePlayer = (event, targetPlayer) => {
   if (window.confirm(`delete ${targetPlayer.name}?`)) {
      console.log(`| delete this player ${targetPlayer.name}`);
      const updatedRoster = {...roster};
      updatedRoster.players = roster.players.filter((rosterPlayer) => {
        return rosterPlayer.name !== targetPlayer.name;
      });

      saveRosters(updatedRoster);

      

   }
  };

  const onCreatePlayer = () => {
    const targetPlayer = {...targetNewPlayer};
    const updatedRoster = {...roster};
    // draftStatus: "protected"
    // index: 27
    // mlbid: "592518"
    // name: "Manny Machado"
    // pos: "3B"
    // posType: "hitter"
    // roster: "bashers"
    // status: "protected"
    // team: "BAL"

    targetPlayer.posType = 'hitter';
    if (targetPlayer.pos === 'SP' || targetPlayer.pos === 'RP') {
      targetPlayer.posType = 'pitcher';
    }
    targetPlayer.status = 'regular';
    targetPlayer.roster = roster.roster;


    updatedRoster.players.push(targetPlayer);

    saveRosters(updatedRoster);
    setTargetNewPlayer(null);
  };

  const onUpdateNewPlayerProperty = (event, property) => {
    const targetPlayer = {...targetNewPlayer};
    targetPlayer[property] = event.target.value;

    setTargetNewPlayer(targetPlayer);
  };

  const onUpdatePlayerTeam = (event, player) => {
    const updatedRoster = {...roster};
    updatedRoster.players.map((rosterPlayer) => {
      if (rosterPlayer.name === player.name) {
        rosterPlayer.team = event.target.value;
      }
    });

    saveRosters(updatedRoster);
  };

  const onUpdatePlayerPos = (event, player) => {
    const updatedRoster = {...roster};
    updatedRoster.players.map((rosterPlayer) => {
      if (rosterPlayer.name === player.name) {
        rosterPlayer.pos = event.target.value;
      }
    });

    saveRosters(updatedRoster);
  };

  const hitterPosList = [
    'C',
    '1B',
    '2B',
    '3B',
    'SS',
    'OF',
    'DH',
  ];


  return (
    <RosterManagerContainer>
      <RosterTitle>{roster.slug}</RosterTitle>
      {
        hitterPosList.map((posKey) => {
          return (
            <HiiterPosContainer hittersBlob={currentRosterScoreData} pos={posKey} roster={roster.slug} />
          ); 
        })
      }
      <StarterPosContainer startersBlob={currentRosterScoreData} roster={roster.slug} />
      <ClosersPosContainer pitchersBlob={currentRosterScoreData} roster={roster.slug} />

      <PlayerGroupTable>
        <caption style={{background: '#f4f4f4', color: '#444444', textAlign:'left', textTransform: 'uppercase'}}>hitters</caption>
        {hitters.map((player) => {
          const currentHitter = player && currentRawScoreData && currentRawScoreData['hitters'] && currentRawScoreData['hitters'][player.playerId] && currentRawScoreData['hitters'][player.playerId];
          player.total = currentHitter ? getHitterTotal(currentHitter) : 0;
          return (
            <tr>
              <td>
                {isHiddenOn && <button onClick={(event) => {return onTriggerDeletePlayer(event, player)}}>X</button>}
              </td>
              <td>
                {isHiddenOn && player.mlbid}
              </td>
              <td style={{color: 'darkblue', whiteSpace: 'nowrap'}}>
                {player.name}
              </td>
              <td>
              {isHiddenOn ? <select
                  onChange={(event) => onUpdatePlayerPos(event, player)}
                  className="select-pos pick-property-edit"
                  value={player.pos}
                  data-property="pos"
                >
                  <option value>-</option>
                  <option value="C">C</option>
                  <option value="1B">1B</option>
                  <option value="2B">2B</option>
                  <option value="3B">3B</option>
                  <option value="SS">SS</option>
                  <option value="LF">LF</option>
                  <option value="CF">CF</option>
                  <option value="RF">RF</option>
                  <option value="DH">DH</option>
                  <option value="SP">SP</option>
                  <option value="RP">RP</option>
                </select> : player.pos}
              </td>
              <td>
              {isHiddenOn ? <select
                  className="select-team pick-property-edit"
                  onChange={(event) => onUpdatePlayerTeam(event, player)}
                  value={player.team}
                  data-property="team"
                >
                  <option value>--</option>
                  <option value="BAL">BAL</option>
                  <option value="BOS">BOS</option>
                  <option value="CHA">CHA</option>
                  <option value="CLE">CLE</option>
                  <option value="DET">DET</option>
                  <option value="HOU">HOU</option>
                  <option value="KC">KC</option>
                  <option value="LAA">LAA</option>
                  <option value="MIN">MIN</option>
                  <option value="NYY">NYY</option>
                  <option value="OAK">OAK</option>
                  <option value="SEA">SEA</option>
                  <option value="TB">TB</option>
                  <option value="TEX">TEX</option>
                  <option value="TOR">TOR</option>
                </select> : player.team}
              </td>
              <td>{currentHitter && currentHitter.runs}</td>
              <td>{currentHitter && currentHitter.hits}</td>
              <td>{currentHitter && currentHitter.homeRuns}</td>
              <td>{currentHitter && currentHitter.rbi}</td>
              <td>{currentHitter && currentHitter.stolenBases}</td>
              <td>{currentHitter && getHitterTotal(currentHitter)}</td>
            </tr>
          )
        })}
      </PlayerGroupTable>
      <PlayerGroupTable>
        <caption style={{background: '#f4f4f4', color: '#444444', textAlign:'left', textTransform: 'uppercase'}}>starters</caption>
        {starters.map((player) => {
          const currentPitcher = player && currentRawScoreData && currentRawScoreData['pitchers'] && currentRawScoreData['pitchers'][player.playerId] && currentRawScoreData['pitchers'][player.playerId];
          return (
            <tr>
              <td>
                {isHiddenOn && <button onClick={(event) => {return onTriggerDeletePlayer(event, player)}}>X</button>}
              </td>
              <td>
                {isHiddenOn && player.mlbid}
              </td>
              <td  style={{color: 'darkblue', whiteSpace: 'nowrap'}}>
                {player.name}
              </td>
              <td>
              {isHiddenOn ? <select
                  onChange={(event) => onUpdatePlayerPos(event, player)}
                  className="select-pos pick-property-edit"
                  value={player.pos}
                  data-property="pos"
                >
                  <option value>-</option>
                  <option value="C">C</option>
                  <option value="1B">1B</option>
                  <option value="2B">2B</option>
                  <option value="3B">3B</option>
                  <option value="SS">SS</option>
                  <option value="LF">LF</option>
                  <option value="CF">CF</option>
                  <option value="RF">RF</option>
                  <option value="DH">DH</option>
                  <option value="SP">SP</option>
                  <option value="RP">RP</option>
                </select> : player.pos}
              </td>
              <td>
              {isHiddenOn ? <select
                  className="select-team pick-property-edit"
                  onChange={(event) => onUpdatePlayerTeam(event, player)}
                  value={player.team}
                  data-property="team"
                >
                  <option value>--</option>
                  <option value="BAL">BAL</option>
                  <option value="BOS">BOS</option>
                  <option value="CHA">CHA</option>
                  <option value="CLE">CLE</option>
                  <option value="DET">DET</option>
                  <option value="HOU">HOU</option>
                  <option value="KC">KC</option>
                  <option value="LAA">LAA</option>
                  <option value="MIN">MIN</option>
                  <option value="NYY">NYY</option>
                  <option value="OAK">OAK</option>
                  <option value="SEA">SEA</option>
                  <option value="TB">TB</option>
                  <option value="TEX">TEX</option>
                  <option value="TOR">TOR</option>
                </select> : player.team}
              </td>
              <td>{currentRawScoreData && currentRawScoreData['starters'] && currentRawScoreData['starters'][player.playerId] && currentRawScoreData['starters'][player.playerId].wins}</td>
              <td>{currentRawScoreData && currentRawScoreData['starters'] && currentRawScoreData['starters'][player.playerId] && currentRawScoreData['starters'][player.playerId].losses}</td>
              <td>{currentRawScoreData && currentRawScoreData['starters'] && currentRawScoreData['starters'][player.playerId] && currentRawScoreData['starters'][player.playerId].inningsPitched}</td>
              <td>{currentRawScoreData && currentRawScoreData['starters'] && currentRawScoreData['starters'][player.playerId] && currentRawScoreData['starters'][player.playerId].strikeOuts}</td>
              <td></td>

            </tr>
          )
        })}
      </PlayerGroupTable>
      <PlayerGroupTable>
        <caption style={{background: '#f4f4f4', color: '#444444', textAlign:'left', textTransform: 'uppercase'}}>closers</caption>
        {closers.map((player) => {
          const currentPitcher = player && currentRawScoreData && currentRawScoreData['pitchers'] && currentRawScoreData['pitchers'][player.playerId] && currentRawScoreData['pitchers'][player.playerId];
          return (
            <tr>
              <td>
              {isHiddenOn && <button onClick={(event) => {return onTriggerDeletePlayer(event, player)}}>X</button>}
              </td>
              <td>
                {isHiddenOn && player.mlbid}
              </td>
              <td style={{color: 'darkblue', whiteSpace: 'nowrap'}}>
                {player.name}
              </td>
              <td>
                {isHiddenOn ? <select
                  onChange={(event) => onUpdatePlayerPos(event, player)}
                  className="select-pos pick-property-edit"
                  value={player.pos}
                  data-property="pos"
                >
                  <option value>-</option>
                  <option value="C">C</option>
                  <option value="1B">1B</option>
                  <option value="2B">2B</option>
                  <option value="3B">3B</option>
                  <option value="SS">SS</option>
                  <option value="LF">LF</option>
                  <option value="CF">CF</option>
                  <option value="RF">RF</option>
                  <option value="DH">DH</option>
                  <option value="SP">SP</option>
                  <option value="RP">RP</option>
                </select> : player.pos}
              </td>
              <td>
                {isHiddenOn ? <select
                  className="select-team pick-property-edit"
                  onChange={(event) => onUpdatePlayerTeam(event, player)}
                  value={player.team}
                  data-property="team"
                >
                  <option value>--</option>
                  <option value="BAL">BAL</option>
                  <option value="BOS">BOS</option>
                  <option value="CHA">CHA</option>
                  <option value="CLE">CLE</option>
                  <option value="DET">DET</option>
                  <option value="HOU">HOU</option>
                  <option value="KC">KC</option>
                  <option value="LAA">LAA</option>
                  <option value="MIN">MIN</option>
                  <option value="NYY">NYY</option>
                  <option value="OAK">OAK</option>
                  <option value="SEA">SEA</option>
                  <option value="TB">TB</option>
                  <option value="TEX">TEX</option>
                  <option value="TOR">TOR</option>
                </select> : player.team}
              </td>
              <td>{currentRawScoreData && currentRawScoreData['relievers'] && currentRawScoreData['relievers'][player.playerId] && currentRawScoreData['relievers'][player.playerId].wins}</td>
              <td>{currentRawScoreData && currentRawScoreData['relievers'] && currentRawScoreData['relievers'][player.playerId] && currentRawScoreData['relievers'][player.playerId].losses}</td>
              <td>{currentRawScoreData && currentRawScoreData['relievers'] && currentRawScoreData['relievers'][player.playerId] && currentRawScoreData['relievers'][player.playerId].saves}</td>
              <td>{currentRawScoreData && currentRawScoreData['relievers'] && currentRawScoreData['relievers'][player.playerId] && currentRawScoreData['relievers'][player.playerId].inningsPitched}</td>
              <td>{currentRawScoreData && currentRawScoreData['relievers'] && currentRawScoreData['relievers'][player.playerId] && currentRawScoreData['relievers'][player.playerId].strikeOuts}</td>

            </tr>
          )
        })}
      </PlayerGroupTable>
      {/* Player form */}
      <div>
      {isHiddenOn && <div>
          <div>
            <label>
              Name:
              <input
                value={(targetNewPlayer && targetNewPlayer.name) ? targetNewPlayer.name : ''}
                onChange={(event) => onUpdateNewPlayerProperty(event, 'name')}
              />
            </label>
          </div>
          <div>
            <label>
              Pos:
              <select
                onChange={(event) => onUpdateNewPlayerProperty(event, 'pos')}
                className="select-pos pick-property-edit"
                value={(targetNewPlayer && targetNewPlayer.pos) ? targetNewPlayer.pos : ''}
                data-property="pos"
              >
                <option value>-</option>
                <option value="C">C</option>
                <option value="1B">1B</option>
                <option value="2B">2B</option>
                <option value="3B">3B</option>
                <option value="SS">SS</option>
                <option value="LF">LF</option>
                <option value="CF">CF</option>
                <option value="RF">RF</option>
                <option value="DH">DH</option>
                <option value="SP">SP</option>
                <option value="RP">RP</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Team:
              <select
                className="select-team pick-property-edit"
                onChange={(event) => onUpdateNewPlayerProperty(event, 'team')}
                value={(targetNewPlayer && targetNewPlayer.team) ? targetNewPlayer.team : ''}
                data-property="team"
              >
                <option value>--</option>
                <option value="BAL">BAL</option>
                <option value="BOS">BOS</option>
                <option value="CHA">CHA</option>
                <option value="CLE">CLE</option>
                <option value="DET">DET</option>
                <option value="HOU">HOU</option>
                <option value="KC">KC</option>
                <option value="LAA">LAA</option>
                <option value="MIN">MIN</option>
                <option value="NYY">NYY</option>
                <option value="OAK">OAK</option>
                <option value="SEA">SEA</option>
                <option value="TB">TB</option>
                <option value="TEX">TEX</option>
                <option value="TOR">TOR</option>
              </select>
            </label>
          </div>
          {/* <div>
            <label>
              Status:
              <select
                value={this.state.newPlayer.status}
                onChange={this.updateNewPlayerProperty}
                data-property="draftStatus"
              >
                <option value="drafted">drafted</option>
                <option value="bubble">bubble</option>
                <option value="prospect">prospect</option>
                <option value="protected">protected</option>
                <option value="roster">roster</option>
                <option value="regular">regular</option>
                <option value="unprotected">unprotected</option>
              </select>
            </label>
          </div> */}
          <div className="layout">
            <button
              onClick={onCreatePlayer}
            >
              save
            </button>
          </div>
        </div>}
      </div>
    </RosterManagerContainer>
  );

};