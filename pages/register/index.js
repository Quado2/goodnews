import Head from "next/head";
import GitForm from "../../components/GitForm/GitForm";
import Tab from "../../components/Tab/Tab";

import { registerInputs, loginInputs } from "./data";

export default function Register() {
  function processInputs(inputValues) {
    console.log(inputValues);
  }

  const welcomeRegisterMessage = "Welcome to Goodnews Baptist church";
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
    <>
      <Head>
        <title>Goodnews of Christ Baptist Church</title>
        <meta
          name="description"
          content="Official Website of Goodnews of Christ Baptist Church, Awka."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Tab tabs={tabs} />
    </>
  );
}
