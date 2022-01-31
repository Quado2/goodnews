import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  width: 100%;
`

const Main = styled.main`
width: 100%;
margin-top: 3rem;

`

function Layout(props) {
  return (
    <LayoutContainer>
      <MainNavigation />
      <Main>{props.children}</Main>
    </LayoutContainer>
  );
}

export default Layout;
