import React, { useState, useContext, useEffect } from "react";
import { getCookie } from "../../../utils";
import { client2, client } from "../../_app";
import { gql } from "apollo-server-micro";
import styled from "styled-components";
import { GiTireIronCross } from "react-icons/gi";
import { useMutation } from "@apollo/client";
import Router from "next/router";

import Table from "../../../components/Table";
import { titheRequestInputs } from "../../../components/data";
import GitForm from "../../../components/GitForm/GitForm";
import Spinner from "../../../components/Spinner/Spinner";
import { Context } from "../../../context/Context";
import BriefNotification from "../../../components/Notification/BriefNotification";
import DashboardLayout from "../../../HOC/DashboardLayout";
import { getDate } from "../../../utils";

const RequestContainer = styled.div`
  width: 100%;
  .add_button {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      background-color: transparent;
      outline: none;
      border: 1px solid ${({ theme }) => theme.colorTextPrimary};
      margin: 2rem 1rem;
      padding: 1rem;
      color: ${({ theme }) => theme.colorTextPrimary};
      border-radius: 0.2rem;
    }
    button:last-child {
      color: #08dd08;
      border: 1px solid #08dd08;
    }
  }

  .new-request {
    width: 97%;
    height: 70vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.85);
    background-color: black;
    overflow-y: scroll;
    border-radius: 0.2rem;
    animation: comeIn 0.3s ease-in forwards;
    opacity: 0;

    @keyframes comeIn {
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }

    .close {
      background-color: black;
      width: 2.5rem;
      height: 2.5rem;
      color: red;
      font-size: 1.5rem;
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.1rem;
      cursor: pointer;
    }
  }

  .sign_up {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 3rem;

    h3 {
      border: 1px solid ${({ theme }) => theme.colorTextPrimary};
      margin: 2rem;
      padding: 1rem;
      border-radius: 0.2rem;
      font-size: 1.1rem;
      line-height: 1.8rem;
      word-spacing: 0.1rem;
      text-align: center;
      max-width: 30rem;
      color: ${({ theme }) => theme.colorTextPrimary};
      font-weight: 300;
      background-color: rgba(55, 116, 230, 0.249);
    }
    .controls {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;

      select {
        width: 13rem;
        padding: 0.5rem;
        font-size: 1.1rem;
        border: 1px solid ${({ theme }) => theme.colorTextPrimary};
        background-color: transparent;
        color: ${({ theme }) => theme.colorTextPrimary};
        margin: 0.3rem;
        text-align: center;
      }

      button {
        width: 13rem;
        margin: 1rem;
        padding: 1rem 0.5rem;
        border-radius: 0.2rem;
        color: green;
        border: 1px solid green;
        background-color: transparent;
        font-size: 1.1rem;
      }

      button:disabled {
        color: #627597;
        border: 1px solid #627597;
      }
    }
  }
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
  const [editForm, setEditForm] = useState(false);
  const [editFormInput, setEditFormInput] = useState<FORMINPUTS[]>([]);
  const [editId, setEditId] = useState("");
  const [partnerDetails, setPartnerDetails] = useState<PartnerDetails>();
  const [chosenPlan, setChosenPlan] = useState("");

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

  return (
    <DashboardLayout>
      <RequestContainer>
       

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
                Pay All - 500
              </button>
              <button onClick={() => setShowForm(true)}>Pay Some</button>
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
          <div className="sign_up">
            <h3>
              You have not signed up to Partner with Prophetic Voice. Choose a
              plan and click the Register button bellow to get started
            </h3>
            <div className="controls">
              <select onChange={(e) => setChosenPlan(e.target.value)}>
                <option value="">Choose a Plan</option>
                <option value="senior">Senior Partner - 5000</option>
                <option value="junior">Junior Partner - 5000</option>
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
      </RequestContainer>
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
