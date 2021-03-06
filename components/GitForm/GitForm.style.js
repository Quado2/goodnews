import styled from "styled-components";

export const GitFormWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: radial-gradient(
      circle at -20% -20%,
      rgb(8, 80, 187) 0%,
      transparent 35%
    ),
    radial-gradient(circle at 110% 15%, rgb(8, 80, 187) 0%, transparent 30%),
    radial-gradient(circle at 110% 80%, rgb(136, 8, 187) 0%, transparent 20%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .logo {
    width: 100%;
    text-align: left;

    img {
      width: 100px;
      margin: 20px;
    }
  }

  form {
    z-index: 1;
    width: 95%;
    max-width: 600px;
    min-height: 50px;
    border: 1px solid rgb(20, 37, 77);
    background-color: rgb(12, 22, 45);
    opacity: 0.95;
    padding: 24px;
    margin-top: 20vh;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;;
    .ticking {
      width: 1px;
      height: 30px;
      background-color: #627597;
      animation: tick-anime 0.7s ease-in infinite;
    }
    .form-top-text {
      width: 100%;

      .wait_alil{
        opacity: 0;
        animation: enterLater forwards 1s ease-in 1.5s;

        @keyframes enterLater {
          to{
            opacity: 1;
          }
        }
      }
    }

    .submit {
      border: 1px solid green;
      color: green;
      padding: 10px;
      min-width: 10rem;
      background-color: transparent;
      outline: transparent;
      border-radius: 5px;
      font-size: 20px;
      margin: 3rem ;
      align-self: center;
    }
  }

  .team-form-bottom {
    width: 90%;
    max-width: 600px;
    margin: 10vh 0;
    p {
      color: #627597;
      font-size: 12px;
      text-align: left;
    }
  }

  @media screen and (min-width: 600px) {
    form {
      margin-top: 19vh;
    }
  }
  @keyframes tick-anime {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
`;
