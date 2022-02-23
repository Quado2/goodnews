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
  color: white;
`;

export default function Dashboard({userProfile}) {
  let token;
  // const { data, loading, error } = useQuery({ GET_PROFILE }, {
  //   variables: {
  //     token: ""
  //   }
  // });


  return (
    <DashboardContainer>
      <p>{userProfile[0]}</p>
    </DashboardContainer>
  );
}


export async function getStaticProps(){
  return{
    props:{
      userProfile: ["Here"]
    }
  }
}