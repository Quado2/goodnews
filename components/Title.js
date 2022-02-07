import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  text-align: left;
  text-transform: capitalize;
  margin: 3rem;
  padding-left: 10vw;
  h2 {
    font-size: 2.5rem;
    font-weight: 400;
  color: ${({ theme }) => theme.colorTextPrimary};
  }

  div{
    width: 10%;
    height: 3px;
    margin: 1rem 0;
    background-color: ${({theme}) => theme.colorTextMuted};
  }
`;

export default function Title({ title }) {
  return (
    <Container>
      <h2>{title}</h2>
      <div></div>
    </Container>
  );
}
