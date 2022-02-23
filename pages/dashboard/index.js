import { useEffect } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

const GET_PROFILE = gql`
  query {
    me {
      firstName
      sureName
    }
  }
`;

const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

export default function Dashboard() {
  let token;
  const { data, loading, error } = useQuery({ GET_PROFILE });
  useEffect(() => {
    token = localStorage.getItem("nekot");
    console.log({ data });
  }, [data]);

  return (
    <DashboardContainer>
      <p>We are at the dashboard</p>
    </DashboardContainer>
  );
}


