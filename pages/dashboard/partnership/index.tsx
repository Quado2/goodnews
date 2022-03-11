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

const NEWREQUEST_MUTATION = gql`
  mutation ($tithe: TitheInput!) {
    titheSubmit(tithe: $tithe) {
      userErrors {
        message
      }
      tithes {
        date
        amount
        isConfirmed
        _id
      }
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation ($titheId: ID!) {
    titheDelete(titheId: $titheId) {
      userErrors {
        message
      }
      tithes {
        _id
        amount
        date
        isConfirmed
      }
    }
  }
`;

const EDIT_MUTATION = gql`
  mutation ($editTithe: EditTitheInput!) {
    titheEdit(editTithe: $editTithe) {
      userErrors {
        message
      }
      tithes {
        _id
        amount
        isConfirmed
        date
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
  
  const disable = (chosenPlan==="junior") || (chosenPlan==="senior") ? false: true;

  
  const { setLoggedInUser, setShowDashboard } = useContext(Context);

  const [submitTithe] = useMutation(NEWREQUEST_MUTATION, {
    variables: {
      tithe: {
        date: 0,
        amount: 0,
        isConfirmed: false,
      },
    },
  });

  const [deleteTithe] = useMutation(DELETE_MUTATION, {
    variables: {
      titheId: "",
    },
  });

  const [editTithe] = useMutation(EDIT_MUTATION, {
    variables: {
      editTithe: {
        date: 0,
        amount: 0,
        isConfirmed: false,
        titheId: "",
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

  const requestSpinner = (
    <Spinner
      textSize="1rem"
      spinnerSize="2rem"
      color="green"
      message="Submiting Request ..."
    />
  );

  function sendNewRequest(formValues: { date: number; amount: string }) {
    let { date, amount } = formValues;
    const intAmount = parseInt(amount);
    date = new Date(date).getTime();

    setLoading(true);
    submitTithe({
      variables: {
        tithe: {
          amount: intAmount,
          date,
          isConfirmed: false,
        },
      },
    })
      .then((resp) => {
        console.log(resp);
        if (resp.data.titheSubmit) {
          const { tithes, userErrors } = resp.data.titheSubmit;
          if (userErrors.length > 1) {
            displayNotification(userErrors[0].message, "failure");
            setLoading(false);
          } else {
            setTableData(processTableData(tithes));
            displayNotification(
              "Great! Your tithe submision has been received.",
              "success"
            );
            setLoading(false);
            setShowForm(false);
          }
        } else {
          displayNotification("Sorry, we did not get the tithes", "failure");
          setLoading(false);
          setShowForm(false);
        }
      })
      .catch((err) => {
        displayNotification(
          "Sorry, We couldn't save your tithes. Try again.",
          "failure"
        );
        setLoading(false);
        console.log({ err });
      });
  }

  function editRequest(id: string) {
    let tithe: Tithe = tableData.find((tithe: Tithe) => tithe._id === id)!;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const { date, amount } = tithe;
    const dateElements = date.toString().split(" ");
    let monthNumber: string | number =
      (months.indexOf(dateElements[1]) as number) + 1;
    monthNumber = monthNumber > 9 ? monthNumber : "0" + monthNumber;
    let dayNumber: string | number = parseInt(dateElements[0]);
    dayNumber = dayNumber > 9 ? dayNumber : "0" + dayNumber;
    const dateFormat = `${dateElements[2]}-${monthNumber}-${dayNumber}`;
    setEditId(id);
    setEditFormInput([
      {
        inputType: "number",
        prompt: "Enter tithe amount",
        name: "amount",
        initialValue: amount,
      },
      {
        inputType: "date",
        prompt: "select the date of the tithe",
        name: "date",
        initialValue: dateFormat,
      },
    ]);

    setShowForm(true);
    setEditForm(true);
  }

  function sendEditedRequest(formValues: { amount: string; date: number }) {
    let { amount, date } = formValues;
    const intAmount = parseInt(amount);
    date = new Date(date).getTime();
    setLoading(true);

    editTithe({
      variables: {
        editTithe: {
          titheId: editId,
          amount: intAmount,
          date,
          isConfirmed: false,
        },
      },
    })
      .then((response) => {
        if (response.data.titheEdit) {
          const { userErrors, tithes } = response.data.titheEdit;

          if (userErrors !== undefined && userErrors.length >= 1) {
            displayNotification(userErrors[0].message, "failure");
            setLoading(false);
            setShowForm(false);
            setEditForm(false);
          } else {
            setTableData(processTableData(tithes));
            displayNotification(
              "Sucessfully edited your tithe details",
              "success"
            );
            setLoading(false);
            setShowForm(false);
            setEditForm(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        displayNotification(
          "Something went wrong, we could not edit the message. Check your network and try again.",
          "failure"
        );
        setLoading(false);
        setShowForm(false);
        setEditForm(false);
      });
  }

  function deleteRequest(id: string) {
    deleteTithe({
      variables: {
        titheId: id,
      },
    })
      .then((resp) => {
        const { tithes, userErrors } = resp.data.titheDelete;
        if (userErrors.length > 1) {
          displayNotification(userErrors[0].message, "failure");
        } else {
          setTableData(processTableData(tithes));
          displayNotification(
            "You have succesfully deleted the tithe details",
            "success"
          );
        }
      })
      .catch((err) => {
        displayNotification("An error Occured. Please try agian", "failure");
        console.log(err);
      });
  }

  const tableHeaders = ["Date", "Amount", "Status", "Edit", "Delete"];
  const tableKeys = ["date", "amount", "isConfirmed"];
  const actionsData = [
    { title: "Edit", action: editRequest },
    { title: "Delete", action: deleteRequest },
  ];

  return (
    <DashboardLayout>
      <RequestContainer>
        {showForm && (
          <div className="new-request">
            <div onClick={() => setShowForm(false)} className="close">
              <GiTireIronCross />
            </div>
            {editForm ? (
              <GitForm
                loadingState={loading}
                formInputs={editFormInput}
                welcomeMessage="Your testimony will be edited here"
                actionMessage="Edit the values and click enter"
                processInputs={sendEditedRequest}
                submitLabel="Submit"
                spinnerComponent={requestSpinner}
              />
            ) : (
              <GitForm
                loadingState={loading}
                formInputs={titheRequestInputs}
                welcomeMessage="testimonies will be entered here"
                actionMessage="Fill out the form below"
                processInputs={sendNewRequest}
                submitLabel="Submit"
                spinnerComponent={requestSpinner}
              />
            )}
          </div>
        )}

        {showBriefNotification && (
          <BriefNotification
            status={notificationStatus}
            message={notificationMessage}
          />
        )}
        {partnerDetails && partnerDetails._id ? (
          <div className="details wrapper">
            <div className="add_button ">
              <button onClick={() => setShowForm(true)}>
                Record a Paid Tithe
              </button>
              <button onClick={() => setShowForm(true)}>Pay with Card</button>
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
              <select onChange={(e)=>setChosenPlan(e.target.value)}>
                <option value="">Choose a Plan</option>
                <option value="senior">Senior Partner - 5000</option>
                <option value="junior">Junior Partner - 5000</option>
              </select>
              <button disabled={disable}>Register Now</button>
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
