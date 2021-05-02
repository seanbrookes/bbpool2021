import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { PageHeader } from '../components/PageHeader';

const Flex = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const ColSortButton = styled.button`
  background: '#ededed';
  background: transparent;
  color: darkblue;
  border: 0;
  cursor: pointer;

  &hover {
    text-decoration: underline
  }
`;

export const PositionGrid = ({pos}) => {
  const [allHitters, setAllHitters] = useState([]);
  const [allStarters, setAllStarters] = useState([]);
  const [allClosers, setAllClosers] = useState([]);
  const [currentSortCol, setCurrentSortCol] =  useState('total');
  const [isSortDesc, setIsSortDesc] = useState(true);

  useEffect(() => {
    if (pos) {
      const rawPosStats = window.localStorage.getItem('RAW_POS_STATS');
      if (rawPosStats) {
        const parstedRawPosStats = JSON.parse(rawPosStats);
        const thisHitters = Object.keys(parstedRawPosStats.hitters).map((hitterKey) => parstedRawPosStats.hitters[hitterKey]);
        thisHitters.sort((a, b) => {
          var x = a[currentSortCol];
          var y = b[currentSortCol];
          if (isSortDesc) {
            return x > y ? -1 : x < y ? 1 : 0;
          }
          return x < y ? -1 : x > y ? 1 : 0;
        });
        setAllHitters(thisHitters);
        const thisStarters = Object.keys(parstedRawPosStats.starters).map((starterKey) => parstedRawPosStats.starters[starterKey]);
        thisStarters.sort((a, b) => {
          var x = a[currentSortCol];
          var y = b[currentSortCol];
          if (isSortDesc) {
            return x > y ? -1 : x < y ? 1 : 0;
          }
          return x < y ? -1 : x > y ? 1 : 0;
        });
        setAllStarters(thisStarters);
        const thisClosers = Object.keys(parstedRawPosStats.relievers).map((relieverKey) => parstedRawPosStats.relievers[relieverKey]);
        thisClosers.sort((a, b) => {
          var x = a[currentSortCol];
          var y = b[currentSortCol];
          if (isSortDesc) {
            return x > y ? -1 : x < y ? 1 : 0;
          }
          return x < y ? -1 : x > y ? 1 : 0;
        });
        setAllClosers(thisClosers);
      } 
    }
  }, [pos, currentSortCol, isSortDesc]);

  const onSortTable = (event, property) => {
    setCurrentSortCol(property);
    setIsSortDesc(!isSortDesc);
  };


  let tableRows = [];
  let tableType = 'hitters';
  if (pos === 'SP') {
    tableType = 'starters';
    tableRows = allStarters && allStarters.map((starter, index) => {
      return (
        <tr>
          <td>{index + 1}</td>          
          <td>{starter.roster}</td>
          <td><a target="_new" href={starter.newsLink}>{starter.playerName}</a></td>
          <td>{starter.poolPos}</td>
          <td>{starter.teamAbbrev}</td>
          <td style={{textAlign: 'center'}}>{starter.wins}</td>
          <td style={{textAlign: 'center'}}>{starter.losses}</td>
          <td style={{textAlign: 'center'}}>{starter.strikeOuts}</td>
          <td style={{textAlign: 'center'}}>{starter.inningsPitched}</td>
          <td>{starter.total}</td>
        </tr>
      ); 
    });
  }
  else if (pos === 'RP') {

    tableType = 'relievers';
    tableRows = allClosers && allClosers.map((reliever, index) => {
      return (
        <tr>
        <td>{index + 1}</td>
        <td>{reliever.roster}</td>
        <td><a target="_new" href={reliever.newsLink}>{reliever.playerName}</a></td>
        <td>{reliever.poolPos}</td>
        <td>{reliever.teamAbbrev}</td>
        <td style={{textAlign: 'center'}}>{reliever.wins}</td>
        <td style={{textAlign: 'center'}}>{reliever.losses}</td>
        <td style={{textAlign: 'center'}}>{reliever.saves}</td>
        <td style={{textAlign: 'center'}}>{reliever.strikeOuts}</td>
        <td style={{textAlign: 'center'}}>{reliever.inningsPitched}</td>
        <td>{reliever.total}</td>
      </tr>
      ); 
    });  
  }
  else if (pos === 'hitters') {
    tableRows = allHitters && allHitters.map((hitter, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{hitter.roster}</td>
          <td><a target="_new" href={hitter.newsLink}>{hitter.playerName}</a></td>
          <td>{hitter.poolPos}</td>
          <td>{hitter.teamAbbrev}</td>
          <td style={{textAlign: 'center'}}>{hitter.runs}</td>
          <td style={{textAlign: 'center'}}>{hitter.hits}</td>
          <td style={{textAlign: 'center'}}>{hitter.homeRuns}</td>
          <td style={{textAlign: 'center'}}>{hitter.stolenBases}</td>
          <td style={{textAlign: 'center'}}>{hitter.rbi}</td>
          <td>{hitter.total}</td>
        </tr>
      );  
    });
  }
  else if (pos) {
    tableRows = allHitters && allHitters.map((hitter, index) => {
      if (pos === 'OF' && (hitter.poolPos === 'LF' || hitter.poolPos === 'RF' || hitter.poolPos === 'CF' || hitter.poolPos == 'OF')) {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{hitter.roster}</td>
            <td><a target="_new" href={hitter.newsLink}>{hitter.playerName}</a></td>
            <td>{hitter.poolPos}</td>
            <td>{hitter.teamAbbrev}</td>
            <td style={{textAlign: 'center'}}>{hitter.runs}</td>
            <td style={{textAlign: 'center'}}>{hitter.hits}</td>
            <td style={{textAlign: 'center'}}>{hitter.homeRuns}</td>
            <td style={{textAlign: 'center'}}>{hitter.stolenBases}</td>
            <td style={{textAlign: 'center'}}>{hitter.rbi}</td>
            <td>{hitter.total}</td>
          </tr>
        );       
      }
      else if (pos === hitter.poolPos) {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{hitter.roster}</td>
            <td><a target="_new" href={hitter.newsLink}>{hitter.playerName}</a></td>
            <td>{hitter.poolPos}</td>
            <td>{hitter.teamAbbrev}</td>
            <td style={{textAlign: 'center'}}>{hitter.runs}</td>
            <td style={{textAlign: 'center'}}>{hitter.hits}</td>
            <td style={{textAlign: 'center'}}>{hitter.homeRuns}</td>
            <td style={{textAlign: 'center'}}>{hitter.stolenBases}</td>
            <td style={{textAlign: 'center'}}>{hitter.rbi}</td>
            <td>{hitter.total}</td>
          </tr>
        ); 
      } 
    });   
  }

  const posList = [
    'All',
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

  let tableHeader = null;
  switch(tableType) {

    case 'starters': {
      tableHeader = (
        <tr>
          <th></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'roster')}>roster</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'name')}>name</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'pos')}>pos</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'team')}>team</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'wins')}>W</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'losses')}>L</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'strikeouts')}>K</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'inningsPitched')}>IP</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'total')}>total</ColSortButton></th>
        </tr>
      );
      break;

    }
    case 'relievers': {
      tableHeader = (
        <tr>
          <th></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'roster')}>roster</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'playerName')}>name</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'poolPos')}>pos</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'teamAbbrev')}>team</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'wins')}>W</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'losses')}>L</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'saves')}>Sv</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'strikeOuts')}>K</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'inningsPitched')}>IP</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'total')}>total</ColSortButton></th>
        </tr>
      );
      break;      
    }


    default: {
      tableHeader = (
        <tr>
          <th></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'roster')}>roster</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'playerName')}>name</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'poolPos')}>pos</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'teamAbbrev')}>team</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'runs')}>Runs</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'hits')}>Hits</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'homeRuns')}>HR</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'rbi')}>RBI</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'stolenBases')}>SB</ColSortButton></th>
          <th><ColSortButton onClick={(event) => onSortTable(event, 'total')}>total</ColSortButton></th>
        </tr>
      );     
    }



  }


  return (

    <div >

      <table>
        <caption>position {pos}</caption>
        {tableHeader}
        {tableRows}
      </table>
    </div>
  );
}
