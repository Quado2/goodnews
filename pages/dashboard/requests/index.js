import React, { useState } from "react";
import { getCookie } from "../../../utils";
import { client2 } from "../../_app";
import { gql } from "apollo-server-micro";
import styled from "styled-components";
import {GiTireIronCross} from 'react-icons/gi'

import Table from "../../../components/Table";
import {prayerRequestInputs} from '../../../components/data'
import GitForm from "../../../components/GitForm/GitForm";
import Spinner from "../../../components/Spinner/Spinner";

const RequestContainer = styled.div`
  width: 100%;
  height: 100vh; ;
  margin-top: ${({theme})=> theme.navHeight};

  .add-button {
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

  .new-request{
    width: 97%;
    height: 70vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(.85);
    background-color: black;
    overflow-y: scroll;
    border-radius: .2rem;
    animation: comeIn .3s ease-in forwards;
    opacity: 0;
    
    @keyframes comeIn {
      to{
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }

    .close{
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

const Requests = ({ dataFromServer }) => {

  const [showForm , setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)


  const requestSpinner = (
    <Spinner
      textSize="1rem"
      spinnerSize="2rem"
      color="green"
      message="Submiting Request ..."
    />
  );

  function sendNewRequest(formValues){
    setLoading(true)
    console.log({formValues})
  }

  return (
    <RequestContainer>
       {
        showForm 
        && 
        <div className="new-request">
          <div onClick ={() => setShowForm(false)} className="close">
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
      }
      <div className="add-button ">
        <button onClick={() => setShowForm(true)}>New Prayer Request</button>
      </div>
      <Table />
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
        me {
          firstName
          sureName
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
