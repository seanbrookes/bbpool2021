import React, { useState, useEffect } from 'react';

export const AddPlayerForm = ({savePlayer}) => {
  const [targetNewPlayer, setTargetNewPlayer] = useState(null);

  
  const onCreatePlayer = () => {
    const targetPlayer = {...targetNewPlayer};

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


    if (targetPlayer.slug && targetPlayer.pos && targetPlayer.team && targetPlayer.name) {
      savePlayer(targetPlayer);
      setTargetNewPlayer(null);
  
    }
    else {
      console.log(`|  tried to save player with incomplete info ${JSON.stringify(targetPlayer)}`)
    }

  };

  const onUpdateNewPlayerProperty = (event, property) => {
    const targetPlayer = {...targetNewPlayer};
    targetPlayer[property] = event.target.value;

    setTargetNewPlayer(targetPlayer);
  };


  return (
    <div>
      <div>
        <label>
          Roster:
          <select
            onChange={(event) => onUpdateNewPlayerProperty(event, 'slug')}
            className="select-roster pick-property-edit"
            value={(targetNewPlayer && targetNewPlayer.slug) ? targetNewPlayer.slug : ''}
            data-property="pos"
          >
            <option value>-</option>
            <option value="bashers">Bashers</option>
            <option value="mashers">Mashers</option>
            <option value="rallycaps">Rally Caps</option>
            <option value="stallions">Stallions</option>
          </select>
        </label>
      </div>      
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
    </div>    
  )
} 