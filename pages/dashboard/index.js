import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import Router, { useRouter } from "next/router";
import { Context } from "../../context/Context";
import DashboardCard from "../../components/DashboardCard";

import { GiPrayer, GiLoveSong } from "react-icons/gi";
import { FaRegHandshake, FaMoneyCheckAlt } from "react-icons/fa";

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
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding-top: ${({ theme }) => theme.navHeight};
  color: white;

  

  .cards-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    padding-top: ${({ theme }) => theme.navHeight};
    color: white;
     
    @media screen {
      
    }
  }
`;

function checkReload(inputSeconds, router) {
  //This block is to help solve next js bug that loads pages
  //half way using Router redirected
  const seconds = Number(inputSeconds) * 1000;
  const lastReloaded = Number(
    sessionStorage && sessionStorage.getItem("lastReloaded")
  );
  const currentTime = new Date().getTime();
  if (!lastReloaded) {
    sessionStorage.setItem("lastReloaded", new Date().getTime());
    router.reload(window.location.pathname);
  }
  if (currentTime - lastReloaded > seconds) {
    sessionStorage.setItem("lastReloaded", new Date().getTime());
    router.reload(window.location.pathname);
  }
}

export default function Dashboard({ userProfile }) {
  const [profile, setProfile] = useState({});
  const [showPage, setShowPage] = useState(false);

  const { data, loading, error } = useQuery(GET_PROFILE);

  const { loggedInUser, setLoggedInUser } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    checkReload(40, router);

    if (data) {
      if (data.me === null) {
        Router.push("/membership");
      }
      setLoggedInUser(data.me);
      setShowPage(true);
    }

    console.log({ data });
  }, [data]);

  if (!data) {
    return (
      <DashboardContainer>
        <p>Page is loading ...</p>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <div className="cards-container">
        <DashboardCard
          title="Prayer Requests"
          link={"/dashboard/requests"}
          icon={<GiPrayer size={'2rem'}  />}
          bColor={"purple"}
          textColor={"white"}
        />
        <DashboardCard
          title="Testimonies"
          link={"/dashboard/testimonies"}
          icon={<GiLoveSong size={'2rem'} />}
          bColor={"green"}
          textColor={"white"}
        />
        <DashboardCard
          title="Tithe"
          link={"/dashboard/tithe"}
          icon={<FaMoneyCheckAlt size={'2rem'}  />}
          bColor={"cyan"}
          textColor={"white"}
        />
        <DashboardCard
          title="Partnership"
          link={"/partnership"}
          icon={<FaRegHandshake size={'2rem'}  />}
          bColor={"#4DA8EF"}
          textColor={"white"}
        />
      </div>
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
