import styled from "styled-components";
import Image from "next/image";
import daddyImage from "../../assets/images/daddy.png";



export const Container = styled.div`
  width: 100%;
  padding: 2rem;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colorBackgroundPrimary};
  z-index: 1;

  @media screen and (max-width: ${({theme})=> theme.mobile}){
    padding: .5rem;
    margin-top: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
  color: ${({ theme }) => theme.colorTextPrimary}; 

  @media screen and (max-width: ${({theme})=> theme.mobile}){
    font-size: 3.7rem;

  }
`;

const Desc = styled.h1`
  font-size: 2rem;
  margin: 1rem;
  font-weight: 300;
  color: #1594a5;
  @media screen and (max-width: ${({theme})=> theme.mobile}){
    font-size: 1.2rem;

  }
`;

const Stroked = styled.span`
  color: ${({ theme }) => theme.colorBackgroundPrimary};
  text-shadow: -1px -1px 0 #1fe5ff, 1px -1px 0 #1fe5ff, -1px 1px 0 #1fe5ff,
    1px 1px 0 #1fe5ff;
`;

const InnerContainer = styled(Container)`
  height: auto;
  margin: 6rem;
  background: transparent;
`;

const LinkContainer = styled(Container)`
  height: auto;
  flex-direction: row;
  justify-content: flex-start;
  margin: 4rem;
  padding-left: 5rem;
  background: transparent;

  @media screen and (max-width: ${({theme})=> theme.mobile}){
    padding: 0;

  }
`;

const ImageContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40vw;
  z-index: 0;
  opacity: .3;

  @media screen and (max-width: ${({theme})=> theme.mobile}){
    width: 60vw;

  }
`;

const Link = styled.a`
  width: 10rem;
  padding: 0.75rem;
  font-size: 1.1rem;
  border: 1px solid  ${(props) => (props.green ? "#1fe5ff" : "#FF5157")};
  color: ${(props) => (props.green ? "#1fe5ff" : "#FF5157")};
  margin: 0 1rem;
  text-align: center;
  border-radius: 0.2rem;
  cursor: pointer;

  @media screen and (max-width: ${({theme})=> theme.mobile}){
    width: auto;
    min-width: 5rem;
    padding: .4rem;
    font-size: .75rem;
    margin: 0 .75rem

  }
`;

function Landing() {
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
        <Link green>Partner with us</Link>
      </LinkContainer>
      <ImageContainer>
        <Image alt="Rev Ajekwe" src={daddyImage} />
      </ImageContainer>
    </Container>
  );
}

export default Landing;
