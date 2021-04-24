import React, {useState, useEffect}  from 'react';
import { getPitcherStats, getHitterStats } from '../data/fetchStats';
import styled from 'styled-components';

const MlbPlayerScrollBox = styled.div`
  height: 500px;
  overflow-y: scroll;
  display: block;
`;


export const PlayerMapper = ({rosterData, savePlayer, mlbHitters, mlbPitchers, refreshPlayers}) => {

  const [selectedSourcePitcher,setSelectedSourcePitcher] = useState(null);
  const [selectedSourceHitter, setSelectedSourceHitter] = useState(null);
  const [selectedRosterPitcher,setSelectedRosterPitcher] = useState(null);
  const [selectedRosterHitter, setSelectedRosterHitter] = useState(null);
  const [rosterHitters, setRosterHitters] = useState([]);
  const [rosterPitchers, setRosterPitchers] = useState([]);
  const [isShowHitters, setIsShowHitters] = useState(false);

  useEffect(() => {
    onLoadPlayerStats();


    if (rosterData && rosterData['bashers']) {
      const initRosterHitters = [];
      const initRosterPitchers = [];
      Object.keys(rosterData).map((key) => {
        const roster = rosterData[key];
        roster.players.map((player) => {
          if (player.posType === 'hitter') {
            initRosterHitters.push(player);
          }
          else {
            initRosterPitchers.push(player);
          }
        })

      });
      initRosterHitters.sort((a, b) => {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      initRosterPitchers.sort((a, b) => {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      setRosterHitters(initRosterHitters);
      setRosterPitchers(initRosterPitchers);
    }
  }, [rosterData]);



  const onSaveIdMatch = () => {
    if (selectedSourceHitter && selectedRosterHitter) {
      // save this hitter
      selectedRosterHitter.playerId = selectedSourceHitter.playerId;
      savePlayer(selectedRosterHitter);

    }
    else if (selectedSourcePitcher && selectedRosterPitcher) {
      // save this pitcher
      selectedRosterPitcher.playerId = selectedSourcePitcher.playerId;
      savePlayer(selectedRosterPitcher);



    }

    setSelectedRosterPitcher(null);
    setSelectedSourcePitcher(null);
    setSelectedRosterHitter(null);
    setSelectedSourceHitter(null);
  }

  const onSelectSourcePitcher = (event, player) => {
    setSelectedSourcePitcher(player);
  };
  const onSelectRosterPitcher = (event, player) => {
    setSelectedRosterPitcher(player);
  };
  const onSelectRosterHitter = (event, player) => {
    setSelectedRosterHitter(player);
  };
  const onSelectSourceHitter = (event, player) => {
    setSelectedSourceHitter(player);
  };


  return (
    <div>
      <button onClick={onLoadPlayerStats}>Load Data</button>
      <button onClick={(event) => {return setIsShowHitters(!isShowHitters)}}>hitters[{isShowHitters.toString()}]/pitchers</button>
      {((selectedSourcePitcher && selectedRosterPitcher) || (selectedSourceHitter && selectedRosterHitter) ) ? <div style={{padding: '2rem'}}><button onClick={onSaveIdMatch}>Save It</button></div> : null}
      <div style={{display: 'flex'}}>
      <div>roster: {selectedRosterHitter && selectedRosterHitter.name && <button onClick={(event) => onSelectRosterHitter(event, null)}>{selectedRosterHitter.name}</button>}{selectedRosterPitcher && selectedRosterPitcher.name && <button onClick={(event) => onSelectRosterPitcher(event, null)}>{selectedRosterPitcher.name}</button>}</div>
      <div>source: {selectedSourceHitter && selectedSourceHitter.playerName && <button onClick={(event) => onSelectSourceHitter(event, null)}>{selectedSourceHitter.playerName}</button>}{selectedSourcePitcher && selectedSourcePitcher.playerName && <button onClick={(event) => onSelectSourcePitcher(event, null)}>{selectedSourcePitcher.playerName}</button>}</div>
      </div>
      {/* stats <pre>{JSON.stringify(mlbHitters, null, 2)}</pre> */}
      <div style={{display: 'flex'}}>
        <div>
          {isShowHitters && <div style={{display: 'flex'}}>
            <div>
              <div>Roster Hitters</div>
              {rosterHitters && rosterHitters.map((rosterHitter, index) => {
                if (rosterHitter.playerId) {
                  return (<div />);
                }
                else {
                  return (<div>{index + 1}) {rosterHitter.roster} <button onClick={(event) => onSelectRosterHitter(event, rosterHitter)} >{rosterHitter.playerId}{rosterHitter.name}</button></div>);
                }
              })}
            </div>
            <div>
              <div>Hitters</div>
              <MlbPlayerScrollBox>
                {mlbHitters && mlbHitters.map((hitter, index) => {
                  return (<div>{index + 1}) <button onClick={(event) => onSelectSourceHitter(event, hitter)} >{hitter.playerName}[{hitter.playerId}]</button></div>)
                })}
              </MlbPlayerScrollBox>
            </div>
          </div>
          }




          <div style={{display: 'flex'}}>
            <div>
              <div>Roster Pitchers</div>
              {rosterPitchers && rosterPitchers.map((rosterPitcher, index) => {
                if (rosterPitcher.playerId) {
                  return (<div/>);
                }
                else {
                  return (<div>{index + 1}) <button onClick={(event) => onSelectRosterPitcher(event, rosterPitcher)} >{rosterPitcher.playerId}{rosterPitcher.name}</button></div>)
                }
              })}
            </div>
            <div>
              <div>Pitchers</div>
              <MlbPlayerScrollBox>
              {mlbPitchers && mlbPitchers.map((pitcher, index) => {
                return (<div>{index + 1}) <button onClick={(event) => onSelectSourcePitcher(event, pitcher)} >{pitcher.playerName}[{pitcher.playerId}]</button></div>)
              })}
              </MlbPlayerScrollBox>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}