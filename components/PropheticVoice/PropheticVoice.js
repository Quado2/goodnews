import styled from "styled-components";
import Image from "next/image";

import bible from "../../assets/images/bible.png";

const TopContainer = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 7rem 0;
  padding: 0;

 

  @media screen and (min-width: ${({ theme }) => theme.tablet}) {
    padding: 3rem 5%;

  }

  .level-3{
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   @media screen and (min-width: ${({ theme }) => theme.tablet}) {
    flex-direction: row;
    
  }

 }

 .call{
   width: 85%;
   margin-top: 2rem;
   box-shadow: 1px 1px .5rem #ccc;
   padding: 2rem;
   border-radius: .5rem;
;

  h2{
    
    font-size: 1.5rem;
    font-weight: 400;
    font-style: italic;
    color: ${({theme}) => theme.colorTextMuted};
    font-family: 'Quintessential',
    
  }

  a{
    border: 1px solid ${({theme})=> theme.colorButtonPrimary};
    color: ${({theme})=> theme.colorButtonPrimary};
    margin: 2rem;
    width: auto;
  }
 }

 

`;

const ImageContainer = styled.div`
  width: 85%;
  border-radius: 0.2rem;
  margin-bottom: 4rem;

  img {
    border-radius: 0.2rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.tablet}) {
    width: 50%;
  }
`;

const TextContainer = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;

  h4 {
    text-align: left;
    width: 100%;
    font-weight: 400;
    text-transform: capitalize;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colorTextPrimary};
  }

  h2 {
    width: 100%;
    color: #1594a5;
    margin: 0.1rem 0;
    font-weight: 400;
    font-size: 1.5rem;
  }
  div {
    width: 5rem;
    height: 2px;
    background-color: #c4c9ce;
    align-self: flex-start;
    margin: 0.2rem 0;
  }

  p {
    font-weight: 200;
    margin: 1rem 0;
    text-align: justify;
    color: ${({theme}) => theme.colorTextSecondary};
  }

  h3 {
    width: 100%;
    font-weight: 400;
  }

  @media screen and (min-width: ${({ theme }) => theme.tablet}) {
    width: 50%;
    margin: 0;
    margin-left: 1.5rem;
  }
`;

export default function PropheticVoice() {
  return (
    <TopContainer>
      <Container>
        <div className="level-3">
          <ImageContainer>
            <Image alt="bible" src={bible} />
          </ImageContainer>
          <TextContainer>
            <h4>The message of deliverance</h4>
            <h2>Prophetic Voice Outreach</h2>
            <div></div>
            <p>
              Prophetic voice is a radio program from which the man of God
              reaches out to the lorem lorem ipsum lsdfa jadf ot aad da lore
            </p>
            <h3>Join us every friday by 7pm at ABS, 88.5fm</h3>
          </TextContainer>
        </div>
        <div className="level-3 call">
          <h2>
          &quot;Then he said to his disciples, “The harvest is plentiful, but the
            laborers are few&quot;
          </h2>
          <a>Partner with Prophetic voice </a>
        </div>
      </Container>
    </TopContainer>
  );
}
