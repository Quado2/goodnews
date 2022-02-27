import MainNavigation from "./MainNavigation";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Hambuger from "../Hambuger";
import Footer from "../Footer/Footer";
import DashboardNav from './DashboardNav'
import { Context } from "../../context/Context";
import { useContext } from "react";

const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorBackgroundPrimary};
`;

const Main = styled.main`
  width: 100%;
`;

function Layout(props) {

  const {showDashboard} = useContext(Context)
   
  return (
    <LayoutContainer>
      
        <MainNavigation />
        <Sidebar />
        <Hambuger />
        {showDashboard && <DashboardNav />}
        
      
      <Main>{props.children}</Main>
      <Footer />
    </LayoutContainer>
  );
}

export default Layout;
