import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../context/Context";

const DNContainer = styled.div`
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: fixed;
  top: ${({ theme }) => theme.navHeight};
  left: 0;
  background-color: ${({ theme }) => theme.colorBackgroundSecondary};
`;

const DashboardNav = () => {
  const { loggedInUser } = useContext(Context);

  return <DNContainer></DNContainer>;
};

export default DashboardNav;
