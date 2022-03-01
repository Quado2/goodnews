import React, { useState } from "react";
import { tableData1 } from "./data";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
      background-color: transparent;
      outline: none;
      border: 1px solid ${({ theme }) => theme.colorTextPrimary};
      color: ${({ theme }) => theme.colorTextPrimary};
      border-radius: 0.2rem;
    }

 

  div {
    overflow-x: scroll;
    width: 100%;
    display: flex;


    @media screen and (min-width: ${({theme})=> theme.mobile}) {
      justify-content: center;
    }
  }

  table {
    border-collapse: collapse;
    min-width: 600px;
  }

  tr {
    border: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  }

  th {
    color: ${({ theme }) => theme.colorTextSecondary};
    font-size: 1rem;
    font-weight: 300;
    background-color: ${({ theme }) => theme.colorBorderSecondary};
    padding: 0.5rem;
  }

  td {
    color: ${({ theme }) => theme.colorSecondaryMuted};
    font-size: 0.95rem;
    font-weight: 400;
    padding:2rem 0.5rem 0.7rem 0.6rem;
    


    button {
      width: 4.5rem;
      padding: 0.25rem;
      cursor: pointer;
    }

  }

  td:last-child button{
    color: white;
    background-color: red;
    border: 1px solid red;;
  }
`;

const Table = ({tableHeaders, tableData, actionsData}) => {
  const [showForm, setShowForm] = useState(false);

  const headers = tableData1[0];
  const tableBody = tableData1.slice(1, tableData1.length);
  const actions = ["Edit", "Delete"];
  const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  function getDate(dateInt){
    const date = new Date(dateInt);
    const year = date.getFullYear();
    const month = monthList[date.getUTCMonth()]
    const day = date.getUTCDate();

    return `${day} ${month} ${year}`
  }
  return (
    <TableContainer>
     
      <div>
        <table>
          <tr>
            { tableHeaders && tableHeaders.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
      
          </tr>
          {tableData && tableData.map(data1 => {
            return <tr key={data1._id}>
              <td>{data1.title}</td>
              <td>{data1.details}</td>
              <td>{getDate(data1.date)}</td>
              {actionsData && actionsData.map(acData => 
                <td><button onClick={() => acData.action(data1._id)}>{acData.title}</button></td>
              )}
            </tr>
             })}
         
        </table>
      </div>
    </TableContainer>
  );
};

export default Table;
