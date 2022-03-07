import React, { useState, useContext, useEffect } from "react";
import { getCookie } from "../../../utils";
import { client2 } from "../../_app";
import { gql } from "apollo-server-micro";
import styled from "styled-components";
import { GiTireIronCross } from "react-icons/gi";
import { useMutation } from "@apollo/client";

import Table from "../../../components/Table";
import { prayerRequestInputs } from "../../../components/data";
import GitForm from "../../../components/GitForm/GitForm";
import Spinner from "../../../components/Spinner/Spinner";
import { Context } from "../../../context/Context";
import BriefNotification from "../../../components/Notification/BriefNotification";
import styles from './styles.module.scss';

const RequestContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin-top: ${({ theme }) => theme.navHeight};

  .add_button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      background-color: transparent;
      outline: none;
      border: 1px solid ${({ theme }) => theme.colorTextPrimary};
      margin: 2rem;
      padding: 1rem;
      color: ${({ theme }) => theme.colorTextPrimary};
      border-radius: 0.2rem;
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
`;

const NEWREQUEST_MUTATION = gql`
  mutation ($prayer: PrayerInput!) {
    prayerSubmit(prayer: $prayer) {
      userErrors {
        message
      }
      prayers {
        date
        details
        title
        _id
      }
    }
  }
`;

const Requests = ({ dataFromServer }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showBriefNotification, setShowBriefNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");

  const { loggedInUser, setLoggedInUser, setShowDashboard } =
    useContext(Context);

  const [submitRequest, { data }] = useMutation(NEWREQUEST_MUTATION, {
    variables: {
      prayer: {
        title: "",
        details: "",
      },
    },
  });

  function displayNotification(message, stats) {
    setNotificationMessage(message);
    setNotificationStatus(stats);
    setShowBriefNotification(true);
    const timeout = setTimeout(() => {
      setShowBriefNotification(false);
      return () => clearTimeout(timeout);
    }, 4000);
  }

  useEffect(() => {
    let isMounted = true;
    const { me, prayers } = dataFromServer.prayersMe;
    if (isMounted) {
      setTableData(prayers);
      setLoggedInUser(me);
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

  function sendNewRequest(formValues) {
    const { title, details } = formValues;
    setLoading(true);
    fetch("https://randomuser.me/api/").then((res) => {
      console.log(res);
      displayNotification(
        "Great! Your prayer request has been received.",
        "success"
      );
      setLoading(false);
      setShowForm(false);
    });

    // submitRequest({
    //   variables: {
    //     prayer: {
    //       title,
    //       details,
    //     },
    //   },
    // })
    //   .then((resp) => {
    //     if (resp.data.prayerSubmit) {
    //       const { prayers, userErrors } = resp.data.prayerSubmit;
    //       if (userErrors.length > 1) {
    //         displayNotification(userErrors[0].message, "failure");
    //         setLoading(false);
    //       } else {
    //         setTableData(prayers);
    //         displayNotification(
    //           "Great! Your prayer request has been received.",
    //           "success"
    //         );
    //         setShowBriefNotification(true);
    //         setLoading(false);
    //         setShowForm(false);
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     console.log({ err });
    //   });
  }

  function editRequest(id) {
    console.log(id);
  }

  function deleteRequest(id) {
    console.log(id);
  }

  const tableHeaders = ["Title", "Details", "Date", "Edit", "Delete"];
  const actionsData = [
    { title: "Edit", action: editRequest },
    { title: "Delete", action: deleteRequest },
  ];

  return (
    <RequestContainer>
      {showForm && (
        <div className="new-request">
          <div onClick={() => setShowForm(false)} className="close">
            <GiTireIronCross />
          </div>

          <GitForm
            loadingState={loading}
            formInputs={prayerRequestInputs}
            welcomeMessage="Prayer requests will be entered here"
            actionMessage="Fill out the form below"
            processInputs={sendNewRequest}
            submitLabel="Submit"
            spinnerComponent={requestSpinner}
          />
        </div>
      )}

      {showBriefNotification && (
        <BriefNotification
          status={notificationStatus}
          message={notificationMessage}
        />
      )}

      <div className="add_button ">
        <button onClick={() => setShowForm(true)}>New Prayer Request</button>
      </div>
      <Table
        tableData={tableData}
        tableHeaders={tableHeaders}
        actionsData={actionsData}
      />
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
        prayersMe {
          userErrors {
            message
          }
          me {
            firstName
            sureName
          }
          prayers {
            title
            details
            date
            _id
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

  // if (data.me === null) {
  //   Router.push("/membership");
  // }

  return {
    props: {
      dataFromServer: data,
    },
  };
}
