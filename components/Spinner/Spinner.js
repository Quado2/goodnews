import React from "react";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/react";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;

  h3 {
    margin: .25rem;
  }
`;

const Spinner = (props) => {
  const override = css`
    display: inline;
    margin: 0;
  `;

  return (
    <SpinnerContainer>
      <ScaleLoader
        size={props.spinnerSize}
        sizeUnit={"px"}
        color={props.color}
        loading={true}
        css={override}
      />
      <h3 style={{ fontSize: props.textSize, color: props.color }}>
        {props.message}...
      </h3>
    </SpinnerContainer>
  );
};

export default Spinner;
