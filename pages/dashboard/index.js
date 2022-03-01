import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import Router, { useRouter } from "next/router";
import { Context } from "../../context/Context";
import DashboardCard from "../../components/DashboardCard";
import { client2 } from "../_app";
import { getCookie } from "../../utils";

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

    @media screen and (min-width: ${({ theme }) => theme.mobile}) {
      padding-left: 200px;
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






export default function Dashboard({ dataFromServer }) {
  const [showPage, setShowPage] = useState(false);
  //const { data, loading, error } = useQuery(GET_PROFILE);

  const { loggedInUser, setLoggedInUser, setShowDashboard } = useContext(Context);

  const router = useRouter();
  console.log("from server", { dataFromServer });

  useEffect(() => {
    //checkReload(40, router);

    if (dataFromServer) {
      
      setLoggedInUser(dataFromServer.me);
      setShowPage(true);
      setShowDashboard(true);
    }

  }, [dataFromServer]);

  if (!dataFromServer) {
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
          icon={<GiPrayer size={"2rem"} />}
          bColor={"purple"}
          textColor={"white"}
        />
        <DashboardCard
          title="Testimonies"
          link={"/dashboard/testimonies"}
          icon={<GiLoveSong size={"2rem"} />}
          bColor={"green"}
          textColor={"white"}
        />
        <DashboardCard
          title="Tithe"
          link={"/dashboard/tithe"}
          icon={<FaMoneyCheckAlt size={"2rem"} />}
          bColor={"cyan"}
          textColor={"white"}
        />
        <DashboardCard
          title="Partnership"
          link={"/partnership"}
          icon={<FaRegHandshake size={"2rem"} />}
          bColor={"#4DA8EF"}
          textColor={"white"}
        />
      </div>
    </DashboardContainer>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;
  const token = getCookie("nekot", cookies);
  console.log("Serverside Props started")
  const { data } = await client2.query({
    query: gql`
      query {
        me {
          firstName
          sureName
        }
      }
    `,
      context: {
        headers: {
          authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
  });

  if (data.me === null) {
    Router.push("/membership");
  }

  console.log("Serverside finished")

  return {
    props: {
      dataFromServer: data,
    },
  };
}

//_xsrf=2|eb1a54a2|d6e56fdd558135bf3cdcbe8722b79bab|1645801745; nekot=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjE2N2RhMGE0N2RiYjZkN2Y2NDQ5YjEiLCJpYXQiOjE2NDYwODg0NjUsImV4cCI6MTY0OTY4ODQ2NX0.7840Xj4tgM_KdJkTJlSKpa5xTnVCfF23pdFAtcsUjzo

