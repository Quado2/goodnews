import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";

import { registerInputs, loginInputs } from "../../components/data";
import GitForm from "../../components/GitForm/GitForm";
import Tab from "../../components/Tab/Tab";

import { useMutation, gql } from "@apollo/client";

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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      }).then(resp => {
        const {userErrors, token} =  resp.data.signup;
        
        if(userErrors.length >= 1) {
          console.log("Failed");
          setErrorMessage(userErrors);
        }
        if (token) {
          localStorage.setItem("nekot", token);
          console.log("We are succesful bitch");
        }
        setLoading(false);
      });
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      setLoading(false);
    }
  }




  const registerForm = (
    <GitForm
      processInputs={processInputs}
      formInputs={registerInputs}
      actionMessage={actionRegisterMessage}
      welcomeMessage={welcomeRegisterMessage}
      submitLabel={"Register"}
      loading={loading}
    />
  );

  const loginForm = (
    <GitForm
      processInputs={processInputs}
      formInputs={loginInputs}
      actionMessage={actionLoginMessage}
      welcomeMessage={welcomeLoginMessage}
      submitLabel={"Login"}
      loading={loading}
    />
  );

  const tabs = [
    {
      form: registerForm,
      title: "Register",
      id: "register",
    },
    {
      form: loginForm,
      title: "Login",
      id: "login",
    },
  ];

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

      <Tab tabs={tabs} />
    </MemberContainer>
  );
}
