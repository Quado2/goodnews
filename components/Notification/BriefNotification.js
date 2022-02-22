
import styled from "styled-components";

const BriefNotificationContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: -100vw;
  margin: 1.25rem;
  margin-bottom: 5rem;
  max-width: 20rem;
  font-size: 1rem;
  padding: 1rem;
  color: white;
  z-index: 20;
  border-radius: 0.25rem;
  background-color: ${({ status }) => (status === "success" ? "green" : "red")};
  animation: comeAndGo 4s ease-in forwards;

  @media screen and (min-width: 600px) {
    font-size: 1.125rem;
  }

  @keyframes comeAndGo {
    0%,
    100% {
      right: -100%;
    }
    10% {
      right: 3%;
    }

    13%,
    85% {
      right: 0;
    }
    88% {
      right: 3%;
    }
  }
`;

export default function BriefNotification({ status, message }) {
  return (
    <BriefNotificationContainer status={status}>
      {message}
    </BriefNotificationContainer>
  );
}
