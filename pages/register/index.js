import Head from "next/head";
import GitForm from '../../components/GitForm/GitForm';
import Tab from '../../components/Tab/Tab'



import {registerInputs, loginInputs} from './data'


export default function Register() {

  function processInputs(inputValues){
    console.log(inputValues)
  }

  const welcomeMessage = "Welcome to Goodnews Baptist church";
  const actionMessage = "Let's get you registered";

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
    

<Tab>
  
</Tab>
    <GitForm 
      processInputs={processInputs}  
      formInputs={registerInputs}
      actionMessage={actionMessage}
      welcomeMessage={welcomeMessage}
      />


    </>
  );
}
