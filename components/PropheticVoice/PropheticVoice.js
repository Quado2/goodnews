import styled from "styled-components";
import Image from "next/image";

import bible from "../../assets/images/bible.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorBackgroundSecondary};
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  padding: 0;

  @media screen and (min-width: ${({ theme }) => theme.tablet}) {
    padding: 3rem 5%;
  }

  .church_details {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: ${({ theme }) => theme.mobile}) {
      flex-direction: column;
      
    }
    

    .service_detail {
      width: 50%;
      margin: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;

      @media screen and (max-width: ${({ theme }) => theme.mobile}) {
        width: 90%;
      
    }

      div {
        margin: 1rem;
      }
      .icon {
        font-size: 3rem;
        color: ${({ theme }) => theme.colorTextPrimary};
      }

      .service_lower h3 {
        color: ${({ theme }) => theme.colorTextSecondary};
        font-weight: 300;
        font-size: 1rem;
      }
    }
  }

  .level-3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: ${({ theme }) => theme.tablet}) {
      flex-direction: row;
    }
  }

  .call {
    width: 90%;
    margin-top: 2rem;
    box-shadow: 1px 1px 0.2rem ${({ theme }) => theme.colorBorderPrimary},
      -1px -1px 0.2rem ${({ theme }) => theme.colorBorderPrimary};
    padding: 2rem;
    border-radius: 0.5rem;

    h2 {
      font-size: 1.5rem;
      font-weight: 400;
      font-style: italic;
      color: ${({ theme }) => theme.colorTextSecondary};
      font-family: "Quintessential";
      min-width: 50%;
    }

    a {
      border: 1px solid ${({ theme }) => theme.colorButtonPrimary};
      color: ${({ theme }) => theme.colorButtonPrimary};
      margin: 2rem;
      min-width: 15rem;
      &:hover {
        border: 1px solid ${({ theme }) => theme.colorButtonMuted};
        color: ${({ theme }) => theme.colorButtonMuted};
      }
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
    margin: 1rem;
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
    color: ${({ theme }) => theme.colorPrimaryMuted};
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
    color: ${({ theme }) => theme.colorSecondaryMuted};
  }

  h3 {
    width: 100%;
    font-weight: 400;
    color: ${({ theme }) => theme.colorTextSecondary};
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
            &quot;Then he said to his disciples, “The harvest is plentiful, but
            the laborers are few&quot;
          </h2>
          <a>Partner with Prophetic voice </a>
        </div>
        <div className="church_details">
          <div className="service_detail">
            <div className="icon">
              <FaMapMarkerAlt />
            </div>
            <div className="service_lower">
              <h3>
                Worship with us at Goodnews of Christ Baptist Church, Obu ofu
                Umuike, Awka, Anambra State.
              </h3>
            </div>
          </div>

          <div className="service_detail">
            <div className="icon">
              <FiActivity />
            </div>
            <div className="service_lower">
              <h3>Sunday service : 8am - 12noon</h3>
              <h3>Tuesdays : 9am - 12noon</h3>
              <h3>Friday : 9am - 12noon</h3>
            </div>
          </div>
        </div>
      </Container>
    </TopContainer>
  );
}
