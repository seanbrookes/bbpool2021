import React from 'react';
import { draft2019Data } from '../data/draft2019-data';

import styled from 'styled-components';

const Title = styled.h2`
  color: #444444;
`;

const DraftTable = styled.table`

  thead {
    background-color: #0000c9;
    color: #ffffff;
  }
  tr {

  }
  th {
    padding: .7rem;
    font-size: 18px;
  }
  td {
    padding: .7rem;
    border-bottom: 1px solid #aaaaaa;
  }
`;

const Draft2019 = () => {

  return (
    <div>
      <Title>2016 Draft</Title>
      <DraftTable>
        <thead>
          <tr>
          <th>Pick</th>
          <th>Round</th>
          <th>Roster</th>
          <th>Player</th>
          <th>Team</th>
          <th>Pos</th>
          </tr>
        </thead>
        <tbody>
          {draft2019Data.map((item) => {
            return (<tr>
                  <td>{item.pickNumber}</td>
                  <td>{item.round}</td>
                  <td>{item.roster}</td>
                  <td>{item.name}</td>
                  <td>{item.team}</td>
                  <td>{item.pos}</td>
                  </tr>);
              })
          }
        </tbody>
      </DraftTable>
    </div>
  );

};

export default Draft2019;