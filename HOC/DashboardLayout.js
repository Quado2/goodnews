import styled from "styled-components";
import styles from "./styles.module.scss";

const DLContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin-top: ${({ theme }) => theme.navHeight};
  display: flex;
  justify-content: center;

  .empty-left {
    width: ${({ theme }) => theme.adminWidth};
    height: 100%;
    border: 2px solid red;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      display: none;
    }
  }
  .main-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    overflow-x: scroll;
    margin-bottom: 3rem;
  }
`;

const DashboardLayout = ({ children }) => {
  return (
    <div className={styles.DL_wrapper}>
      <div className={styles.empty_left}></div>
      <div className={styles.main_right}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
