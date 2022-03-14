import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import Router, { useRouter } from "next/router";
import { Context } from "../../context/Context";
import DashboardCard from "../../components/DashboardCard";
import { client2 } from "../_app";
import { getCookie } from "../../utils";
import styles from "./styles.module.scss";
import DashboardLayout from "../../HOC/DashboardLayout";

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

export default function Dashboard({ dataFromServer }) {
  const [showPage, setShowPage] = useState(false);
  //const { data, loading, error } = useQuery(GET_PROFILE);

  const { loggedInUser, setLoggedInUser, setShowDashboard } =
    useContext(Context);

  const router = useRouter();

  useEffect(() => {
    //checkReload(40, router);

    if (dataFromServer) {
      setLoggedInUser(dataFromServer.me.member.profile);
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
    <DashboardLayout>
      <div className={styles.dashboard_container}>
        <div className={styles.cards_container}>
          <DashboardCard
            title="Prayer Requests"
            link={"/dashboard/requests"}
            icon={<GiPrayer size={"2rem"} />}
            bColor={"#624DF0"}
            textColor={"white"}
          />
          <DashboardCard
            title="Testimonies"
            link={"/dashboard/testimonies"}
            icon={<GiLoveSong size={"2rem"} />}
            bColor={"#4DA8EF"}
            textColor={"white"}
          />
          <DashboardCard
            title="Tithe"
            link={"/dashboard/tithing"}
            icon={<FaMoneyCheckAlt size={"2rem"} />}
            bColor={"#4CC0B6"}
            textColor={"white"}
          />
          <DashboardCard
            title="Partnership"
            link={"dashboard/partnership"}
            icon={<FaRegHandshake size={"2rem"} />}
            bColor={"cyan"}
            textColor={"white"}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;
  const token = getCookie("nekot", cookies);

  const { data } = await client2.query({
    query: gql`
      query {
        me {
          member {
            profile {
              firstName
              sureName
              gender
            }
          }
          userErrors {
            message
          }
        }
      }
    `,
    context: {
      headers: {
        authorization: token,
      },
    },
    fetchPolicy: "no-cache",
  });

  if (data.me.member.profile === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard/logout",
      },
      props: {},
    };
  }

  return {
    props: {
      dataFromServer: data,
    },
  };
}

//_xsrf=2|eb1a54a2|d6e56fdd558135bf3cdcbe8722b79bab|1645801745; nekot=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjE2N2RhMGE0N2RiYjZkN2Y2NDQ5YjEiLCJpYXQiOjE2NDYwODg0NjUsImV4cCI6MTY0OTY4ODQ2NX0.7840Xj4tgM_KdJkTJlSKpa5xTnVCfF23pdFAtcsUjzo
