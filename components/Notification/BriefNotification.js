
import styled from "styled-components";
import styles from './BriefNotification.module.scss'

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

  h3{
    padding: .35rem;
    font-size: 1rem;
    font-weight: 400;
  }

  @media screen and (min-width: 600px) {
    font-size: 1.125rem;
  }

  @keyframes comeAndGo {
    0%,
    100% {
      right: -100%;
    }
    5% {
      right: 3%;
    }

    7%,
    93% {
      right: 0;
    }
    95% {
      right: 3%;
    }
  }
`;

export default function BriefNotification({ status, message }) {
  return (
    <div className={styles.brief_wrapper} style={{  backgroundColor:  (status === "success") ? "green" : "red"}}>
        <h3>{message}</h3> 
    </div>
  );
}
