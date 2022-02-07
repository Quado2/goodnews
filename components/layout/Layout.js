import MainNavigation from "./MainNavigation";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Hambuger from "../Hambuger";
import HambugerContextProvider from "../../context/HambugerContext";
import Footer from "../Footer/Footer";

const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  background-color: ${({theme})  => theme.colorBackgroundPrimary};
`;

const Main = styled.main`
  width: 100%;
`;

function Layout(props) {
  return (
    <LayoutContainer>
      <HambugerContextProvider>
        <MainNavigation />
        <Sidebar />
        <Hambuger />
      </HambugerContextProvider>
      <Main>{props.children}</Main>
      <Footer />
    </LayoutContainer>
  );
}

export default Layout;
