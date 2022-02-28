import Head from "next/head";
import styled from "styled-components";
import { useState, useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

import { registerInputs, loginInputs } from "../../components/data";
import GitForm from "../../components/GitForm/GitForm";
import Tab from "../../components/Tab/Tab";
import BriefNotification from "../../components/Notification/BriefNotification";
import Spinner from "../../components/Spinner/Spinner";
import { Context } from "../../context/Context";
import { setCookie } from "../../utils/index";

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

const LOGIN_MUTATION = gql`
  mutation ($credentials: CredentialsInput!) {
    signIn(credentials: $credentials) {
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

  const { setShowDashboard } = useContext(Context);
  setShowDashboard(false);

  const router = useRouter();

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

  const [submitLogin] = useMutation(LOGIN_MUTATION, {
    variables: {
      credentials: {
        email: "",
        password: "",
      },
    },
  });

  function displayNotification(message, stats) {
    setNotificationMessage(message);
    setNotificationStatus(stats);
    setLoadingState(false);
    setShowBriefNotification(true);
    const timeout = setTimeout(() => {
      setShowBriefNotification(false);
      return () => clearTimeout(timeout);
    }, 4000);
  }

  async function processRegister(inputValues) {
    setLoadingState(true);
    console.log("pressed setLoading");
    const { email, firstName, gender, password, phone, sureName } = inputValues;

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
    })
      .then((resp) => {
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
          //localStorage.setItem("nekot", token);
          setCookie("nekot", token, 45);

          setNotificationMessage("Great! We will head to logging you in");
          setNotificationStatus("success");
          setShowBriefNotification(true);
          const timeout = setTimeout(() => {
            setShowBriefNotification(false);
            clearTimeout(timeout);
          }, 4000);
        }
        setLoadingState(false);
        router.push("/dashboard");
      })
      .catch((err) => {
        displayNotification(
          "Something went wrong. We are not sure what. Check your network and try again",
          "failure"
        );
      });
  }

  //HANDLE LOGIN
  async function processLogin(inputValues) {
    setLoadingState(true);
    const { email, password } = inputValues;

    try {
      submitLogin({
        variables: {
          credentials: {
            email,
            password,
          },
        },
      }).then((res) => {
        const { userErrors, token } = res.data.signIn;
        if (userErrors.length >= 1) {
          displayNotification(userErrors[0].message, "failure");
        } else {
          //localStorage.setItem("nekot", token)
          console.log("about to set cookie");

          setCookie("nekot", token, 45);
          console.log(document.cookie)
          displayNotification("Great! You are in", "success");
          router.push("/dashboard");
        }
      });
    } catch (err) {
      displayNotification(
        "Something went wrong. We are not sure what. Check your network and try again",
        "failure"
      );
      console.log(JSON.stringify(err));
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
      processInputs={processRegister}
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
      processInputs={processLogin}
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
