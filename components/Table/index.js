import React, { useState } from "react";
import { tableData1 } from "./data";
import styled from "styled-components";
import { getDate } from "../../utils";

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

    @media screen and (min-width: ${({ theme }) => theme.mobile}) {
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
    padding: 2rem 0.5rem 0.7rem 0.6rem;

    button {
      width: 6rem;
      padding: 0.5rem 0.25rem;
      cursor: pointer;
    }

    button:disabled {
      color: #627597;
      border: 1px solid #627597;
    }
  }

  td:last-child button{
    color: red;
    border:1px solid red;
  }

  td:last-child button:disabled{
    color: #627597;
      border: 1px solid #627597;
  }
`;

const Table = ({ tableHeaders, tableData, actionsData, tableKeys }) => {
  return (
    <TableContainer>
      <div>
        <table>
          <thead>
            <tr>
              {tableHeaders &&
                tableHeaders.map((header, i) => <th key={i}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {tableData &&
              tableData.map((data) => {
                return (
                  <tr key={data._id}>
                    {tableKeys.map((theKey) => (
                      <td key={theKey}>{data[theKey]}</td>
                    ))}
                    {actionsData &&
                      actionsData.map((acData, i) => (
                        <td key={data._id + i}>
                          <button
                            style={data.disableButton ? {}: {
                              color: acData.color ? acData.color : "",
                              border: acData.color
                                ? `1px solid ${acData.color}`
                                : "",
                            }}
                            onClick={() => acData.action(data._id)}
                            disabled={data.disableButton}
                          >
                            {acData.title}
                          </button>
                        </td>
                      ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </TableContainer>
  );
};

export default Table;
