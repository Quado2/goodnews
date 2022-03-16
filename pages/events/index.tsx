import React from "react";
import styled from "styled-components";

const EventContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
   h1{
     color: ${({theme})=> theme.colorTextPrimary}
   }
`;

const index = () => {
  return (
    <EventContainer>
      <h1>Coming soon</h1>
    </EventContainer>
  );
};

export default index;
