import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import Router, { useRouter } from "next/router";
import Spinner from "../../components/Spinner/Spinner";

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

export default function Dashboard({ userProfile }) {
  const [profile, setProfile] = useState({});
  const [showPage, setShowPage] = useState(false);

  const { data, loading, error } = useQuery(GET_PROFILE);
  if (window.sessionStorage.getItem("is_reloaded")) {
    window.sessionStorage.setItem("is_reloaded", true);
    router.reload(window.location.pathname);
  }
  const router = useRouter();
  useEffect(() => {
    if (data) {
      if (data.me === null) {
        //Router.push('/membership');
      }
      setProfile(data.me);
      setShowPage(true);
      
    }

    console.log(data);
  }, [data]);

  return (
    <DashboardContainer>
      <p>Hello! {profile && profile.firstName}</p>
    </DashboardContainer>
  );
}

export async function getStaticProps() {
  return {
    props: {
      userProfile: "Kwado",
    },
  };
}
