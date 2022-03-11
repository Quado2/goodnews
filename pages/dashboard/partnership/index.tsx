import DashboardLayout from "../../../HOC/DashboardLayout";
import { getCookie } from "../../../utils";
import { client2 } from "../../_app";
import { gql } from "apollo-server-micro";
import Router from "next/router";

function Partnership ({dataFromServer}:{dataFromServer:any}) {
  console.log({dataFromServer})
  return (
    <DashboardLayout>
      <h1 style={{ color: "white" }}>Hello brothers</h1>
    </DashboardLayout>
  );
};

export default Partnership;

export async function getServerSideProps(context: any) {
  const cookies = context.req.headers.cookie;
  const token = getCookie("nekot", cookies);

  const { data } = await client2.query({
    query: gql`
      query {
        me {
          member {
            email
            profile {
              firstName
              sureName
              gender
              phone
            }
            partnership {
              partnerDetails {
                _id
                memberId
                plan
                startDate
              }
              partnerPayments {
                _id
                date
                plan
                memberId
              }
            }
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

  if (data.me === null) {
    Router.push("/membership");
  }

  return {
    props: {
      dataFromServer: data,
    },
  };
}
