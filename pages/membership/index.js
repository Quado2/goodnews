import Head from "next/head";
import styled from "styled-components";
import GitForm from "../../components/GitForm/GitForm";
import Tab from "../../components/Tab/Tab";

export const registerInputs = [
  {
    inputType: "text",
    prompt: "Enter your first name",
    name: "firstName",
    rules: {
      maxLength: {
        expectedValue: 20,
        errorMessage: "Should not be more than 20 characters",
      },
      minLength: {
        expectedValue: 2,
        errorMessage: "Should not be less than 2 characters",
      },
    },
  },

  {
    inputType: "text",
    prompt: "Enter your sure name",
    name: "sureName",
    rules: {
      maxLength: {
        expectedValue: 20,
        errorMessage: "Should not be more than 20 characters",
      },
      minLength: {
        expectedValue: 2,
        errorMessage: "Should not be less than 2 characters",
      },
    },
  },
  {
    inputType: "selectInput",
    prompt: "What is your gender",
    name: "gender",
    list: "Choose, Male, Female",
    rules: {
      minLength: {
        expectedValue: 1,
        errorMessage: "You need to select at least one",
      },
    },
  },

  {
    inputType: "email",
    prompt: "Enter your email address",
    name: "email",
    rules: {
      isEmail: {
        expectedValue: true,
        errorMessage: "Not a valid email address",
      },
    },
  },

  {
    inputType: "text",
    prompt: "What is your phone number",
    name: "phone",
    rules: {
      maxLength: {
        expectedValue: 20,
        errorMessage: "Phone number should not be more than 15 characters",
      },
      minLength: {
        expectedValue: 8,
        errorMessage: "Phone number should not be less than 8 characters",
      },
    },
  },
  {
    inputType: "password",
    prompt: "Choose a password",
    name: "password",
    rules: {
      minLength: {
        expectedValue: 6,
        errorMessage: "Password should be atleast 6 characters",
      },
    },
  },
  {
    inputType: "password",
    prompt: "Repeat your password",
    name: "passwordRepeat",
    rules: {
      compareWithExisting: {
        expectedValue: "password",
        errorMessage: "Password doesn't match",
      },
    },
  },
];

export const loginInputs = [
  {
    inputType: "email",
    prompt: "What is your email or phone number",
    name: "email",
  },
  {
    inputType: "password",
    prompt: "What is your password",
    name: "password",
  },
];

const MemberContainer = styled.div`
  width: 100%;
  padding-bottom: 15rem; ;
`;

export default function Register() {
  function processInputs(inputValues) {
    console.log(inputValues);
  }

  const welcomeRegisterMessage = "Welcome to Goodnews of Christ Baptist church";
  const actionRegisterMessage = "Let's get you registered";

  const welcomeLoginMessage = "Welcome back";
  const actionLoginMessage = "Let's log you in";

  const registerForm = (
    <GitForm
      processInputs={processInputs}
      formInputs={registerInputs}
      actionMessage={actionRegisterMessage}
      welcomeMessage={welcomeRegisterMessage}
    />
  );

  const loginForm = (
    <GitForm
      processInputs={processInputs}
      formInputs={loginInputs}
      actionMessage={actionLoginMessage}
      welcomeMessage={welcomeLoginMessage}
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
