import { useState } from "react";
import styled from "styled-components";

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
  }

  .message-button{
    border: 1px solid ${({theme}) => theme.colorButtonPrimary};
    padding: .5rem;
    text-transform: capitalize;
    color: ${({theme}) => theme.colorButtonPrimary};
    font-weight: 300;
    font-size: .75rem;
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
      outline: none;
      border: 1px solid transparent;
      padding: 0.7rem;
      font-size: 1rem;
      background-color: ${({ theme }) => theme.colorBackgroundSecondary};
      margin: 0.5rem 0;
      color: ${({ theme }) => theme.colorTextSecondary};
      font-weight: 400;
      width: 100%;
      border-radius: 0.2rem;

      &:hover,
      &:active,
      &:focus {
        outline: none;
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
      background-color: white;
      align-self: center;

      &:hover {
        background-color: gray;
        color: white;
        cursor: pointer;
      }
    }
  }
`;

export default function QuickForm({ inputData, message }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <FormContainer showForm={showForm}>
      <h3
        className={`${showForm ? "message-text" : "message-button"}`}
        onClick={() => showForm(!showForm)}
      >
        {message}
      </h3>
      <form>
        {inputData &&
          inputData.map((data) => {
            switch (data.type) {
              case "input":
                {
                  if (data.inputType === "submit") {
                    return (
                      <input
                        className="input-submit"
                        value={data.placeHolder}
                        type={data.inputType}
                      />
                    );
                  }
                  return (
                    <input
                      className="input-name"
                      type={data.type}
                      placeholder={data.placeHolder}
                    />
                  );
                }
                break;
              case "textarea": {
                return <textarea placeholder={data.placeHolder}></textarea>;
              }
            }
          })}
      </form>
    </FormContainer>
  );
}
