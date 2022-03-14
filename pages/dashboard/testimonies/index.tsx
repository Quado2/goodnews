import React, { useState, useContext, useEffect } from "react";
import { getCookie } from "../../../utils";
import { client2, client } from "../../_app";
import { gql } from "apollo-server-micro";
import styled from "styled-components";
import { GiTireIronCross } from "react-icons/gi";
import { useMutation } from "@apollo/client";

import Table from "../../../components/Table";
import { testimonyRequestInputs } from "../../../components/data";
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
  mutation ($testimony: PrayerInput!) {
    testimonySubmit(testimony: $testimony) {
      userErrors {
        message
      }
      testimonies {
        title
        details
        _id
        date
      }
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation ($testimonyId: ID!) {
    testimonyDelete(testimonyId: $testimonyId) {
      userErrors {
        message
      }
      testimonies {
        title
        details
        date
        _id
      }
    }
  }
`;

const EDIT_MUTATION = gql`
  mutation ($editTestimony: TestimonyEditInput!) {
    testimonyEdit(editTestimony: $editTestimony) {
      userErrors {
        message
      }
      testimonies {
        _id
        title
        details
        date
      }
    }
  }
`;

interface DataFromServer {
  me: {
    member: {
      prayers: [];
      profile: [];
      testimonies: [];
    };
  };
}

interface TableData {
  _id: string;
  title: string;
  details: string;
  date: number;
}

interface FORMINPUTS {
  inputType: string;
  prompt: string;
  name: string;
  initialValue: string;
}

function processTableData(tableData: any): any {
  const newData = tableData.map((data: any) => {
    return {
      ...data,
      date: getDate(data.date),
    };
  });

  return newData;
}

const Testimony = ({
  dataFromServer,
}: {
  dataFromServer: DataFromServer;
}): JSX.Element => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<TableData[] | []>([]);
  const [showBriefNotification, setShowBriefNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [editFormInput, setEditFormInput] = useState<FORMINPUTS[]>([]);
  const [editId, setEditId] = useState("");

  const { setLoggedInUser, setShowDashboard } = useContext(Context);

  const [submitTestimony] = useMutation(NEWREQUEST_MUTATION, {
    variables: {
      testimony: {
        title: "",
        details: "",
      },
    },
  });

  const [deleteTestimony] = useMutation(DELETE_MUTATION, {
    variables: {
      testimonyId: "",
    },
  });

  const [editTestimony1] = useMutation(EDIT_MUTATION, {
    variables: {
      editTestimony: {
        testimonyId: "",
        title: "",
        details: "",
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
    let isMounted = true;
    const { member } = dataFromServer.me;
    if (isMounted) {
      setTableData(processTableData(member.testimonies));
      setLoggedInUser(member.profile);
      setShowDashboard(true);
    }

    return () => {
      isMounted = false;
    };
  }, [setLoggedInUser, dataFromServer.me, setShowDashboard]);

  const requestSpinner = (
    <Spinner
      textSize="1rem"
      spinnerSize="2rem"
      color="green"
      message="Submiting Request ..."
    />
  );

  function sendNewRequest(formValues: { title: string; details: string }) {
    const { title, details } = formValues;
    setLoading(true);
    submitTestimony({
      variables: {
        testimony: {
          title,
          details,
        },
      },
    })
      .then((resp) => {
        if (resp.data.testimonySubmit) {
          const { testimonies, userErrors } = resp.data.testimonySubmit;
          if (userErrors.length > 1) {
            displayNotification(userErrors[0].message, "failure");
            setLoading(false);
          } else {
            setTableData(testimonies);
            displayNotification(
              "Great! Your testimony has been received.",
              "success"
            );
            setLoading(false);
            setShowForm(false);
          }
        } else {
          displayNotification(
            "Sorry, we did not get the testimonies",
            "failure"
          );
          setLoading(false);
          setShowForm(false);
        }
      })
      .catch((err) => {
        displayNotification(
          "Sorry, We couldn't save your testimony. Try again.",
          "failure"
        );
        setLoading(false);
        console.log({ err });
      });
  }

  function editRequest(id: string) {
    let prayer: TableData = tableData.find(
      (prayer: TableData) => prayer._id === id
    )!;

    const { title, details } = prayer;
    setEditId(id);
    setEditFormInput([
      {
        inputType: "text",
        prompt: "Edit title of your testimony",
        name: "title",
        initialValue: title,
      },
      {
        inputType: "textarea",
        prompt: "Edit details of what you want God to do for you",
        name: "details",
        initialValue: details,
      },
    ]);

    setShowForm(true);
    setEditForm(true);
  }

  function sendEditedRequest(formValues: { title: string; details: string }) {
    const { title, details } = formValues;
    setLoading(true);

    editTestimony1({
      variables: {
        editTestimony: {
          testimonyId: editId,
          title,
          details,
        },
      },
    })
      .then((response) => {
        if (response.data.testimonyEdit) {
          const { userErrors, testimonies } = response.data.testimonyEdit;

          if (userErrors !== undefined && userErrors.length >= 1) {
            displayNotification(userErrors[0].message, "failure");
            setLoading(false);
            setShowForm(false);
            setEditForm(false);
          } else {
            setTableData(testimonies);
            displayNotification("Sucessfully edited your testimony", "success");
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
    deleteTestimony({
      variables: {
        testimonyId: id,
      },
    })
      .then((resp) => {
        const { testimonies, userErrors } = resp.data.testimonyDelete;
        if (userErrors.length > 1) {
          displayNotification(userErrors[0].message, "failure");
        } else {
          setTableData(testimonies);
          displayNotification(
            "You have succesfully deleted the testimony",
            "success"
          );
        }
      })
      .catch((err) => {
        displayNotification("An error Occured. Please try agian", "failure");
        console.log(err);
      });
  }

  const tableHeaders = ["Title", "Details", "Date", "Edit", "Delete"];
  const tableKeys = ["title", "details", "date"];
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
                formInputs={testimonyRequestInputs}
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
        <div className="add_button ">
          <button onClick={() => setShowForm(true)}>New Testimony</button>
        </div>
        <Table
          tableData={tableData}
          tableHeaders={tableHeaders}
          actionsData={actionsData}
          tableKeys={tableKeys}
        />
      </RequestContainer>
    </DashboardLayout>
  );
};

export default Testimony;

export async function getServerSideProps(context: any) {
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
            testimonies {
              _id
              date
              title
              details
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
