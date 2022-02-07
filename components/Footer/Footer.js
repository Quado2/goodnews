import styled from "styled-components";
import Socials from "../Socials";

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Upper = styled.div`
  max-width: 650px;
  padding: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${({ theme }) => theme.tablet}) {
    padding: 1rem;
  }

  h2 {
    font-size: 2.3rem;
    text-transform: uppercase;
    font-weight: 600;
    color: ${({ theme }) => theme.colorTextPrimary};
    @media screen and (max-width: ${({ theme }) => theme.tablet}) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 400;
    margin: 0.5rem;
    color: ${({ theme }) => theme.colorTextPrimary};
  }

  p {
    color: ${({ theme }) => theme.colorTextSecondary};
    font-weight: 200;
    font-size: 0.95rem;
    margin: 1rem 0;
  }

  form {
    margin: 0.5rem 0;
    width: 100%;

    div {
      width: 101%;
      display: flex;
      margin: 0.2rem 0;

      @media screen and (max-width: ${({ theme }) => theme.tablet}) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        .input-other {
          width: 100%;
        }
        .input-submit {
          margin-top: 3rem;

          @media screen and (max-width: ${({ theme }) => theme.tablet}) {
            margin-top: 1rem;
            padding: 0.7rem 2.2rem;
            width: auto;
          }
        }
      }
    }

    input {
      outline: none;
      border: 1px solid transparent;
      padding: 0.7rem;
      font-size: 1rem;
      background-color: #1725256b;
      margin: 0.1rem;
      color: ${({ theme }) => theme.colorTextSecondary};
      font-weight: 400;

      &:hover,
      &:active,
      &:focus {
        outline: none;
      }
    }

    .input-name {
      width: 100%;
    }
    .input-submit {
      width: 31%;
      background-color: white;

      &:hover {
        background-color: cyan;
        color: white;
        cursor: pointer;
      }
    }
  }
`;

const Lower = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  padding: 5rem;
  background-color: ${({ theme }) => theme.colorBackgroundSecondary};

  @media screen and (max-width: ${({ theme }) => theme.tablet}) {
    padding: 3rem 1rem;
  }
  div h3,
  div span {
    color: gray;
    font-weight: 200;
    @media screen and (max-width: ${({ theme }) => theme.tablet}) {
      font-size: 13px;
    }
  }

  div h3 {
    margin: 1rem;
  }
`;

export default function Footer() {
  return (
    <Container>
      <Upper>
        <h2>Be Born again</h2>
        <h3>Say these words:</h3>
        <p>
          Lord Jesus, I believe that you died for me, that you were buried and
          that on the third day you rose from death and that you are seated at
          the right hand of the Father; Everything Jesus did by his death,
          burial resurrection and ascension, I receive into my human spirit, I
          receive the gift of the Holy Spirit, I declare that I am Born Again !
        </p>
        <form>
          <input className="input-name" type="text" placeholder="Full Name" />
          <div>
            <input className="input-other" type="email" placeholder="Email" />
            <input
              className="input-other"
              type="text"
              placeholder="Phone Number"
            />
            <input className="input-submit" type="submit" value="SUBMIT" />
          </div>
        </form>
      </Upper>
      <Lower>
        <div>
          <Socials />{" "}
        </div>
        <div>
          <h3>
            Goodnews of Christ Baptist Church{" "}
            <span> © {new Date().getFullYear()}</span>
          </h3>
        </div>
      </Lower>
    </Container>
  );
}
