import React from "react";
import { getCookie } from "../../../utils";
import { client2 } from "../../_app";
import { gql } from "apollo-server-micro";
import styled from "styled-components";

import Table from "../../../components/Table";

const RequestContainer = styled.div`
  width: 100%;
  height: 100vh; ;
  margin-top: ${({theme})=> theme.navHeight};
`;

const Requests = ({ dataFromServer }) => {
  return (
    <RequestContainer>
      <Table />
    </RequestContainer>
  );
};

export default Requests;

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;
  const token = getCookie("nekot", cookies);

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
    fetchPolicy: "no-cache",
  });

  if (data.me === null) {
    Router.push("/membership");
  }

  return {
    props: {
      dataFromServer: data,
    },
  };
}
