import styled, { useTheme } from "styled-components";
import Image from "next/image";
import daddyImage from "../../assets/images/prophet.png";

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
  transition: ease-in 2s opacity 2s;

  @media screen and (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0.5rem;
    margin-top: 2rem;
    height: 96vh;
  }

  @keyframes appear-in {
    0%,
    30% {
      opacity: 0;
      transform: translateY(0.3rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes appear-in-faded {
    0%,
    30% {
      opacity: 0;
      transform: translateY(-0.3rem);
    }
    100% {
      opacity: 0.3;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
  opacity: 0;
  color: ${({ theme }) => theme.colorTextPrimary};
  animation: appear-in 1s forwards ease-in-out;

  @media screen and (max-width: ${({ theme }) => theme.tablet}) {
    font-size: 3.7rem;
  }
`;

const Desc = styled.h1`
  font-size: 2rem;
  margin: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colorSecondaryMuted};
  opacity: 0;
  animation: appear-in 1s 0.4s forwards ease-in-out;

  @media screen and (max-width: ${({ theme }) => theme.tablet}) {
    font-size: 1.2rem;
  }
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
  animation: appear-in 1s 0.7s forwards ease-in-out;
  opacity: 0;

  @media screen and (max-width: ${({ theme }) => theme.tablet}) {
    padding: 0;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40vw;
  z-index: 0;
  opacity: 0;
  animation: appear-in-faded 1s 0.2s forwards ease-in-out;

  @media screen and (max-width: ${({ theme }) => theme.tablet}) {
    width: 60vw;
  }
`;

const Link = styled.a`
  width: 10rem;
  padding: 0.75rem;
  font-size: 1.1rem;
  border: 1px solid
    ${(props) =>
      props.green
        ? props.theme.colorTextPrimary
        : props.theme.colorButtonPrimary};
  color: ${(props) =>
    props.green
      ? props.theme.colorTextPrimary
      : props.theme.colorButtonPrimary};
  margin: 0 1rem;
  text-align: center;
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    border: 1px solid
      ${(props) =>
        props.green
          ? props.theme.colorPrimaryMuted
          : props.theme.colorButtonMuted};
    color: ${(props) =>
      props.green
        ? props.theme.colorPrimaryMuted
        : props.theme.colorButtonMuted};
  }

  @media screen and (max-width: ${({ theme }) => theme.tablet}) {
    width: auto;
    min-width: 5rem;
    padding: 0.4rem;
    font-size: 0.75rem;
    margin: 0 0.75rem;
  }
`;

function Landing() {
  const theme = useTheme();

  return (
    <Container>
      <InnerContainer>
        <Title>
          Love,{" "}
          <span
            style={{
              color: `${theme.colorBackgroundPrimary}`,
              textShadow: `-1px -1px 0 ${theme.colorTextPrimary}, 1px -1px 0 ${theme.colorTextPrimary}, -1px 1px 0 ${theme.colorTextPrimary},
                      1px 1px 0 ${theme.colorTextPrimary}`,
            }}
          >
            Faith and Freedom
          </span>
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
