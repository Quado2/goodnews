import { useState } from "react";
import styled from "styled-components";
import PrayerCard from "../PrayerCard/PrayerCard";
import QuickForm from "../QuickForm/QuickForm";
import data from "./data";

import { gql } from "apollo-server-micro";
import { useMutation } from "@apollo/client";
import BriefNotification from "../Notification/BriefNotification";

const VISITOR_INPUT_MUTATION = gql`
  mutation ($visitorInput: VisitorInput) {
    visitorSubmit(visitorInput: $visitorInput) {
      success
      userErrors {
        message
      }
    }
  }
`;

const PrayerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colorBackgroundPrimary};

  .quickform-wrapper {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PrayerCardContainer = styled(PrayerContainer)`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const RequestContainer = styled(PrayerCardContainer)``;

const inputData = [
  {
    type: "input",
    inputType: "text",
    inputName: "name",
    placeHolder: "Full Name",
    inputName: "name",
  },
  {
    type: "input",
    inputType: "text",
    placeHolder: "Phone Number",
    inputName: "phone",
  },
  {
    type: "textarea",
    inputType: "",
    placeHolder: "Prayer Request",
    inputName: "content",
  },
];

export default function Prayers() {
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [showBriefNotification, setShowBriefNotification] = useState(false);
  const [clearFormInputs, setClearFormInputs] = useState();

  const [submitVisitorInput] = useMutation(VISITOR_INPUT_MUTATION, {
    variables: {
      visitorInput: {
        name: "",
        phone: "",
        content: "'",
        type: "",
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

  function handleQuickform(formContent, inputData) {
    setErrorFlag(false);
    setErrorMessage([]);
    setLoading(true);
    let isError = false;
    setLoadingMessage("Submiting prayer request");
    Object.keys(formContent).map((key) => {
      if (formContent[key].length < 1) {
        setErrorFlag(true);
        isError = true;
        setLoading(false);
        const { placeHolder } = inputData.find((o) => o.inputName === key);
        setErrorMessage((prevMessage) => [
          ...prevMessage,
          placeHolder + " cannot be empty",
        ]);
      }
    });
    if (isError) {
      return;
    }

    const { name, content, phone } = formContent;
    console.log({ name, content, phone });
    submitVisitorInput({
      variables: {
        visitorInput: {
          content,
          phone,
          type: "Prayer request",
          name,
        },
      },
    })
      .then((resp) => {
        console.log({ resp });
        const { success, userErrors } = resp.data.visitorSubmit;
        if (userErrors.length >= 1) {
          displayNotification(
            "Something went wrong, check your network and try again",
            "failure"
          );
          setLoading(false);
        } else {
          displayNotification(
            "Successfull !! We have recieved your prayer request",
            "success"
          );
          setClearFormInputs(new Date().getTime());
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        displayNotification(
          "Something went wrong, check your network and try again",
          "failure"
        );
        setLoading(false);
      });
  }

  return (
    <PrayerContainer>
      {showBriefNotification && (
        <BriefNotification
          status={notificationStatus}
          message={notificationMessage}
        />
      )}
      <PrayerCardContainer>
        {data &&
          data.map((datum, i) => (
            <PrayerCard
              key={i}
              imageUrl={datum.imageUrl}
              downloadUrl={datum.downloadUrl}
              title={datum.title}
              date={datum.date}
            />
          ))}
      </PrayerCardContainer>
      <div className="quickform-wrapper">
        <QuickForm
          handleQuickform={handleQuickform}
          inputData={inputData}
          message={"Send a Prayer Request"}
          errorFlag={errorFlag}
          errorMessage={errorMessage}
          loading={loading}
          loadingMessage={loadingMessage}
          clearFormInputs={clearFormInputs}
        />
      </div>
    </PrayerContainer>
  );
}
