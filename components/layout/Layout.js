import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const LayoutContainer = styled.div`
  width: 100%;
`;

const Main = styled.main`
  width: 100%;
`;


function Layout(props) {
  return (
    <LayoutContainer>
      <MainNavigation />
      <Sidebar />
      <Main>{props.children}</Main>
    </LayoutContainer>
  );
}

export default Layout;
