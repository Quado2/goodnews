import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colorBackgroundPrimary};
`;
const Title = styled.h1`
  font-size: 6rem;
  text-align: center;
  margin: 0;
  color: ${({ theme }) => theme.colorTextPrimary}; ;
`;

const Desc = styled.h1`
  font-size: 2rem;
  margin: 1rem;
  color: #1594a5;
`;

const Stroked = styled.span`
  color: ${({ theme }) => theme.colorBackgroundPrimary};
  text-shadow: -1px -1px 0 #1fe5ff, 1px -1px 0 #1fe5ff, -1px 1px 0 #1fe5ff,
    1px 1px 0 #1fe5ff;
`;

const InnerContainer = styled(Container)`
  height: auto;
  margin: 6rem;
`;

const LinkContainer = styled(Container)`
  height: auto;
  flex-direction: row;
  justify-content: flex-start;
  margin: 4rem;
  padding-left: 5rem;
`;

const Image = styled.image``;

const Link = styled.a`
  width: 10rem;
  padding: .75rem;
  font-size: 1.1rem;
  background-color: ${props => props.green ? '#45f845':  '#a82be2'};
  color: white;
  margin: 0 1rem;
  text-align: center;
  border-radius: .2rem;
  cursor: pointer;

`;

function Landing(props: any) {
  return (
    <Container>
      <InnerContainer>
        <Title>
          Love, <Stroked>Faith and Freedom</Stroked>
        </Title>
        <Desc>Goodnews of Christ Baptist Church</Desc>
      </InnerContainer>
      <LinkContainer>
        <Link>Join us</Link>
        <Link green >Partner with us</Link>
      </LinkContainer>
    </Container>
  );
}

export default Landing;
