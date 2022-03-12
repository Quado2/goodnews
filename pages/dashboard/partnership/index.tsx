import React, { useState, useContext, useEffect } from "react";
import { getCookie } from "../../../utils";
import { client2, client } from "../../_app";
import { gql } from "apollo-server-micro";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import Router from "next/router";
import { useTheme } from "styled-components";


import Table from "../../../components/Table";
import { titheRequestInputs } from "../../../components/data";
import GitForm from "../../../components/GitForm/GitForm";
import Spinner from "../../../components/Spinner/Spinner";
import { Context } from "../../../context/Context";
import BriefNotification from "../../../components/Notification/BriefNotification";
import DashboardLayout from "../../../HOC/DashboardLayout";
import { getDate } from "../../../utils";
import styles from './style.module.scss'

const RequestContainer = styled.div`

`;



const CREATE_MUTATION = gql`
  mutation ($partnerInput: PartnerCreateInput!) {
    partnerCreate(partnerInput: $partnerInput) {
      partnerPayments {
        date
        plan
      }
      partnerDetails {
        memberId
        startDate
        _id
        plan
      }
    }
  }
`;



interface Tithe {
  date: number;
  amount: number;
  _id: string;
  isConfirmed: Boolean;
}

interface PartnerDetails {
  _id: string;
  memberId: string;
  startDate: string;
  plan: string;
}

interface DataFromServer {
  me: {
    member: {
      partnership: {
        partnerDetails: PartnerDetails;
        partnerPayments: [];
      };
      profile: [];
    };
  };
}

interface FORMINPUTS {
  inputType: string;
  prompt: string;
  name: string;
  initialValue: string | number;
}

function processTableData(tableData: any): any {
  const newData =
    tableData &&
    tableData.map((data: any) => {
      return {
        ...data,
        date: getDate(data.date),
        isConfirmed: data.isConfirmed ? "Confirmed" : "Awaiting review",
      };
    });

  return newData;
}

interface themeTypes {
  colorTextPrimary: string,
}

const Partnership = ({
  dataFromServer,
}: {
  dataFromServer: DataFromServer;
}): JSX.Element => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<Tithe[] | []>([]);
  const [showBriefNotification, setShowBriefNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [partnerDetails, setPartnerDetails] = useState<PartnerDetails>();
  const [chosenPlan, setChosenPlan] = useState("");
  const theme: themeTypes | null = useTheme();
  const disable =
    chosenPlan === "junior" || chosenPlan === "senior" ? false : true;

  const { setLoggedInUser, setShowDashboard } = useContext(Context);

  const [createPartner] = useMutation(CREATE_MUTATION, {
    variables: {
      partnerInput: {
        plan: "",
      },
    },
  });




  function displayNotification(message: string, stats: string) {
    setNotificationMessage(message);
    setNotificationStatus(stats);
    setShowBriefNotification(true);
    const timeout = setTimeout(() => {
      setShowBriefNotification(false);
      return () => clearTimeout(timeout);
    }, 4000);
  }

  useEffect(() => {
    console.log(dataFromServer);
    let isMounted = true;
    const { member } = dataFromServer.me;
    const { partnerDetails, partnerPayments } = member.partnership;
    if (isMounted) {
      setTableData(processTableData(partnerPayments));
      setPartnerDetails(partnerDetails);
      setLoggedInUser(member.profile);
      setShowDashboard(true);
    }

    return () => {
      isMounted = false;
    };
  }, []);


  function registerPartnership() {
    setLoading(true);
    createPartner({
      variables: {
        partnerInput: {
          plan: chosenPlan,
        },
      },
    })
      .then((response) => {
        if (response.data) {
          setPartnerDetails(response.data.partnerCreate.partnerDetails);
          displayNotification(
            "You have rigistered succesfully to partner with prophetic voice",
            "success"
          );
          setLoading(false);
        } else {
          displayNotification(
            "Could not register you, please try again",
            "failure"
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        displayNotification(
          "Something went wrong, please try again",
          "failure"
        );
      });
  }



  const requestSpinner = (
    <Spinner
      textSize="1rem"
      spinnerSize="2rem"
      color="green"
      message="Registering ..."
    />
  );

function editRequest(){

}

function deleteRequest(){

}


  const tableHeaders = ["Date", "Plan", "Amount Paid", "Status", "Action"];
  const tableKeys = ["date", "amount", "isConfirmed"];
  const actionsData = [
    { title: "I have paid", action: editRequest },
  ];


  const buttonStyle = { 
    border: `1px solid ${theme.colorTextPrimary}`
  }



  return (
    <DashboardLayout>
      <div className="partner_wrapper">
        {showBriefNotification && (
          <BriefNotification
            status={notificationStatus}
            message={notificationMessage}
          />
        )}
        {partnerDetails && partnerDetails._id ? (
          <div className="details wrapper">
            <div>
            <h3>Pending Payments: <span>500</span> </h3>
            <div className="add_button ">
              <button onClick={() => setShowForm(true)}>
                Pay Some
              </button>
              <button onClick={() => setShowForm(true)}>Pay All - 500</button>
            </div>
            </div>
           
            <Table
              tableData={tableData}
              tableHeaders={tableHeaders}
              tableKeys={tableKeys}
              actionsData={actionsData}
            />
          </div>
        ) : (
          <div className={styles.sign_up}>
            <h3>
              You have not signed up to Partner with Prophetic Voice. Choose a
              plan and click the Register button bellow to get started
            </h3>
            <div className={styles.control}>
              <select onChange={(e) => setChosenPlan(e.target.value)}>
                <option value="">Choose a Plan</option>
                <option value="senior">Senior Partner - 5000</option>
                <option value="junior">Junior Partner - 2000</option>
              </select>
              {loading ? (
                requestSpinner
              ) : (
                <button onClick={registerPartnership} disabled={disable}>
                  Register Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
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
