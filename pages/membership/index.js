import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import { registerInputs, loginInputs } from "../../components/data";
import GitForm from "../../components/GitForm/GitForm";
import Tab from "../../components/Tab/Tab";
import BriefNotification from "../../components/Notification/BriefNotification";
import Spinner from "../../components/Spinner/Spinner";

const MemberContainer = styled.div`
  width: 100%;
  padding-bottom: 15rem; ;
`;

const REGISTER_MUTATION = gql`
  mutation ($user: MemberInput!) {
    signup(user: $user) {
      userErrors {
        message
      }
      token
    }
  }
`;

const welcomeRegisterMessage = "Welcome to Goodnews of Christ Baptist  church";
const actionRegisterMessage = "Let's get you registered";

const welcomeLoginMessage = "Welcome back";
const actionLoginMessage = "Let's log you in";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [showBriefNotification, setShowBriefNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");

  const [submitDetails, { data }] = useMutation(REGISTER_MUTATION, {
    variables: {
      user: {
        email: "",
        firstName: "",
        gender: "",
        password: "",
        phone: "",
        sureName: "",
      },
    },
  });

  async function processInputs(inputValues) {
    setLoadingState(true);
    console.log("pressed setLoading");
    const { email, firstName, gender, password, phone, sureName } = inputValues;

    try {
      submitDetails({
        variables: {
          user: {
            email,
            firstName,
            gender,
            password,
            phone,
            sureName,
          },
        },
      }).then((resp) => {
        const { userErrors, token } = resp.data.signup;

        if (userErrors.length >= 1) {
          console.log("Failed");
          setNotificationMessage(userErrors[0].message);
          setNotificationStatus("failed");
          setShowBriefNotification(true);
          const timeout = setTimeout(() => {
            setShowBriefNotification(false);
            clearTimeout(timeout);
          }, 4000);
        }
        if (token) {
          localStorage.setItem("nekot", token);
          setNotificationMessage("Great! We will head to logging you in");
          setNotificationStatus("success");
          setShowBriefNotification(true);
          const timeout = setTimeout(() => {
            setShowBriefNotification(false);
            clearTimeout(timeout);
          }, 4000);
        }
        setLoadingState(false);
      });
    } catch (err) {
      setNotificationMessage("Something went wrong. We are not sure what. Check your network and try again");
      setNotificationStatus("failure");
      setLoadingState(false);
      const timeout = setTimeout(() => {
        setShowBriefNotification(false);
        clearTimeout(timeout);
      }, 4000);
    }
  }

  const registerSpinner = (
    <Spinner
      textSize="1rem"
      spinnerSize="2rem"
      color="green"
      message="Registering ..."
    />
  );

  const loginSpinner = (
    <Spinner
      textSize="1rem"
      spinnerSize="2rem"
      color="green"
      message="Loging in ..."
    />
  );

  const registerForm = (
    <GitForm
      processInputs={processInputs}
      formInputs={registerInputs}
      actionMessage={actionRegisterMessage}
      welcomeMessage={welcomeRegisterMessage}
      submitLabel={"Register"}
      loadingState={loadingState}
      spinnerComponent={registerSpinner}
    />
  );

  const loginForm = (
    <GitForm
      processInputs={processInputs}
      formInputs={loginInputs}
      actionMessage={actionLoginMessage}
      welcomeMessage={welcomeLoginMessage}
      submitLabel={"Login"}
      loadingState={loadingState}
      spinnerComponent={loginSpinner}
    />
  );

  const tabsTitle = ["Register", "Login"];

  return (
    <MemberContainer>
      <Head>
        <title>Goodnews of Christ Baptist Church</title>
        <meta
          name="description"
          content="Official Website of Goodnews of Christ Baptist Church, Awka."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showBriefNotification && (
        <BriefNotification
          status={notificationStatus}
          message={notificationMessage}
        />
      )}
      <Tab tabsTitle={tabsTitle}>
        {registerForm}
        {loginForm}
      </Tab>
    </MemberContainer>
  );
}
