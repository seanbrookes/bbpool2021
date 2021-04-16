import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


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

const PlayerGroupTable = styled.table`

  margin: 0 2rem 0 2rem;

  td {
    border-bottom: 1px solid #dddddd;
    font-size: 15px;
  }

`;


export const RosterManager = ({roster = {}, saveRosters, isHiddenOn}) => {
  const [targetNewPlayer, setTargetNewPlayer] = useState(null);

  const hitters = roster.players.filter((player) => {
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
    targetPlayer.status = 'protected';
    targetPlayer.roster = roster.slug;


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

  return (
    <RosterManagerContainer>
      <RosterTitle>{roster.slug}</RosterTitle>
      <PlayerGroupTable>
        <caption style={{background: '#f4f4f4', color: '#444444', textAlign:'left', textTransform: 'uppercase'}}>hitters</caption>
        {hitters.map((player) => {
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
            </tr>
          )
        })}
      </PlayerGroupTable>
      <PlayerGroupTable>
        <caption style={{background: '#f4f4f4', color: '#444444', textAlign:'left', textTransform: 'uppercase'}}>starters</caption>
        {starters.map((player) => {
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
            </tr>
          )
        })}
      </PlayerGroupTable>
      <PlayerGroupTable>
        <caption style={{background: '#f4f4f4', color: '#444444', textAlign:'left', textTransform: 'uppercase'}}>closers</caption>
        {closers.map((player) => {
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