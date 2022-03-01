import React, { useState } from "react";
import { tableData } from "./data";
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

const Table = () => {
  const [showForm, setShowForm] = useState(false);

  const headers = tableData[0];
  const tableBody = tableData.slice(1, tableData.length);
  const actions = ["Edit", "Delete"];
  return (
    <TableContainer>
     
      <div>
        <table>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
            {actions.map((action) => (
              <th>{action}</th>
            ))}
          </tr>
          {tableBody.map((tbody) => {
            return (
              <tr>
                {tbody.map((body, i) => (
                  <td key={i}>{body}</td>
                ))}
                {actions.map((action) => (
                  <td>
                    <button>{action}</button>
                  </td>
                ))}
              </tr>
            );
          })}
        </table>
      </div>
    </TableContainer>
  );
};

export default Table;
