import MainNavigation from "./MainNavigation";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Hambuger from "../Hambuger";
import ContextProvider from "../../context/Context";
import Footer from "../Footer/Footer";
import DashboardNav from './DashboardNav'

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
  return (
    <LayoutContainer>
      
        <MainNavigation />
        <Sidebar />
        <Hambuger />
        <DashboardNav />
      
      <Main>{props.children}</Main>
      <Footer />
    </LayoutContainer>
  );
}

export default Layout;
