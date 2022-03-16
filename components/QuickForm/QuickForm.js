import { useEffect, useState } from "react";
import styled from "styled-components";
import data from "../Prayers/data";

import Spinner from "../Spinner/Spinner";

const FormContainer = styled.div`
  max-width: 650px;
  padding: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${({ theme }) => theme.tablet}) {
    padding: 1rem 0;
  }

  h2 {
    font-size: 2.3rem;
    text-transform: uppercase;
    font-weight: 600;
    color: ${({ theme }) => theme.colorTextPrimary};
    @media screen and (max-width: ${({ theme }) => theme.tablet}) {
      font-size: 2rem;
    }
  }

  .message-text {
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 400;
    margin: 0.5rem;
    color: ${({ theme }) => theme.colorTextPrimary};
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1) all;
    cursor: pointer;
  }

  .message-button {
    border: 1px solid ${({ theme }) => theme.colorButtonPrimary};
    padding: 0.7rem;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colorButtonPrimary};
    font-weight: 300;
    font-size: 0.9rem;
    border-radius: 0.2rem;
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1) all;
    cursor: pointer;
  }

  p {
    color: ${({ theme }) => theme.colorTextSecondary};
    font-weight: 200;
    font-size: 0.95rem;
    margin: 1rem 0;
  }

  form {
    margin: 0.5rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    input,
    textarea {
      transition: margin 1s ease-in;
      outline: none;
      border: 1px solid transparent;
      padding: 0.7rem;
      font-size: 1rem;
      background-color: ${({ theme }) => theme.colorBackgroundSecondary};
      margin: 0;
      opacity: 0;
      color: ${({ theme }) => theme.colorTextSecondary};
      font-weight: 400;
      width: 100%;
      border-radius: 0.2rem;
      animation: appear-ina 1s forwards;

      &:hover,
      &:active,
      &:focus {
        outline: none;
      }

      @keyframes appear-ina {
        to {
          margin: 0.6rem 0;
          opacity: 1;
        }
      }
    }

    textarea {
      height: 10rem;
      resize: none;
    }

    .input-name {
      width: 100%;
    }
    .input-submit {
      width: 31%;
      align-self: center;
      color: ${({ theme }) => theme.colorTextPrimary};
      border: 1px solid ${({ theme }) => theme.colorTextPrimary};

      &:hover {
        color: ${({ theme }) => theme.colorPrimaryMuted};
        border: 1px solid ${({ theme }) => theme.colorPrimaryMuted};
        cursor: pointer;
      }
    }

    h3 {
      color: red;
      font-size: 0.8rem;
      font-weight: 300;
    }
  }
`;

export default function QuickForm({
  inputData,
  message,
  handleQuickform,
  errorFlag,
  errorMessage,
  loading,
  loadingMessage,
  clearFormInputs,
}) {
  const [showForm, setShowForm] = useState(false);
  const [formContent, setFormContent] = useState({});

  function handleInputChange(e, inputName) {
    const { value } = e.target;
    setFormContent((prevContent) => ({ ...prevContent, [inputName]: value }));
  }

  useEffect(() => {
    inputData.map((data) =>
      setFormContent((prevContent) => {
        return { ...prevContent, [data.inputName]: "" };
      })
    );
  }, [inputData, clearFormInputs]);

  function handleformSubmit(e) {
    e.preventDefault();
    handleQuickform(formContent, inputData);
  }

  return (
    <FormContainer showForm={showForm}>
      <h3
        className={`${showForm ? "message-text" : "message-button"}`}
        onClick={() => setShowForm(!showForm)}
      >
        {message}
      </h3>
      {showForm && (
        <form onSubmit={handleformSubmit}>
          {inputData &&
            inputData.map((data, i) => {
              switch (data.type) {
                case "input":
                  {
                    return (
                      <input
                        key={i}
                        className="input-name"
                        type={data.type}
                        placeholder={data.placeHolder}
                        onChange={(e) => handleInputChange(e, data.inputName)}
                        value={formContent[data.inputName]}
                      />
                    );
                  }

                  break;
                case "textarea": {
                  return (
                    <textarea
                      key={i}
                      onChange={(e) => handleInputChange(e, data.inputName)}
                      placeholder={data.placeHolder}
                      value={formContent[data.inputName]}
                    ></textarea>
                  );
                }
              }
            })}
          {errorFlag &&
            errorMessage.map((message, i) => <h3 key={i}>{message}</h3>)}
          {loading ? (
            <Spinner
              message={loadingMessage}
              color="green"
              textSize="1rem"
              spinnerSize="2rem"
            />
          ) : (
            <input className="input-submit" value={"Submit"} type={"submit"} />
          )}
        </form>
      )}
    </FormContainer>
  );
}
