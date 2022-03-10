import styled from "styled-components";

export const InputWrapper = styled.div`
  margin-top: 30px;
  text-align: left;
  width: 100%;
  opacity: 0;
  animation: inputFadeIn 0.5s ease-in forwards;

  label {
    font-size: 16px;
    color: #71b7ff;
    font-weight: 200;
  }

  .error-message-desktop {
    p {
      color: rgb(234, 74, 170);
      font-size: 14px;
      margin: 4px 0;
      text-align: center;
      display: none;
    }
  }

  .error-message-mobile {
    p {
      color: rgb(234, 74, 170);
      font-size: 14px;
      margin: 4px 0;
      text-align: center;
    }
  }

  .inner-our-input {
    display: flex;
    flex-direction: column;
    width: 100%;

    .inner-level-2 {
      margin-top: 10px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;

      span {
        font-size: 15px;
        font-weight: 100;
        margin-right: 5px;
      }

      .write {
        color: rgb(234, 74, 170);
      }
      .good {
        color: green;
      }
      .bad {
        color: red;
        font-size: 17px;
      }

      input {
        background: transparent;
        border: transparent;
        color: white;
        outline: transparent;
        font-size: 16px;
        font-weight: 300;
        padding: 5px;
        border-bottom: 1px solid #899ec244;
        width: 90%;
        color-scheme: dark;
      }

      textarea {
        background: transparent;
        border: transparent;
        color: white;
        outline: transparent;
        font-size: 16px;
        font-weight: 300;
        padding: 1rem;
        border: 1px solid #899ec244;
        width: 90%;
        height: 10rem;
        resize: none;
        border-radius: 0.2rem;
      }

      select {
        width: 200px;
        font-size: 16px;
        background-color: transparent;
        color: white;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #627597;

        option {
          background-color: rgb(4, 13, 33);
          padding: 20px;
        }
      }

      .checkbox-wrapper {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .checkbox-item {
          margin: 5px 25px;
          width: 120px;
          display: flex;

          input {
            width: 20px;
            height: 20px;
          }
          label {
            margin-left: 10px;
            color: white;
          }
        }
      }
    }
    button {
      background-color: transparent;
      outline: green;
      border: 1px solid green;
      padding: 5px 7px;
      font-size: 16px;
      color: green;
      border-radius: 5px;
      margin-top: 1rem;
      cursor: pointer;
      max-height: 40px;
      align-self: center;
    }

    button:disabled {
      color: #627597;
      border: 1px solid #627597;
    }
  }

  @media screen and (min-width: 544px) {
    .inner-our-input {
      flex-direction: row;
      justify-content: space-between;
    }

    .error-message-desktop {
      p {
        display: block;
      }
    }

    .error-message-mobile {
      p {
        display: none;
      }
    }
  }

  @keyframes inputFadeIn {
    to {
      opacity: 1;
    }
  }
`;
