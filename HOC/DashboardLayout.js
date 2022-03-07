import styled from "styled-components";

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
    justify-content: center;
    flex: 1;
    overflow-x: scroll;
  }
`;

const DashboardLayout = ({ children }) => {
  return <div></div>;
};

export default DashboardLayout;
