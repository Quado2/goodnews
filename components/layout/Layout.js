import MainNavigation from "./MainNavigation";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Hambuger from "../Hambuger";
import HambugerContextProvider from "../../context/HambugerContext";

const LayoutContainer = styled.div`
  width: 100%;
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
    </LayoutContainer>
  );
}

export default Layout;
