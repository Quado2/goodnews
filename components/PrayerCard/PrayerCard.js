import styled from "styled-components";
import Image from "next/image";

const Container = styled.div`
  width: 300px;
  height: 400px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colorBorderPrimary};
  margin: 2rem;
  border-radius: 0.5rem;

  img {
    border-radius: 0.5rem;
  }

  div {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colorBackgroundPrimary};
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
  }

  h2 {
    color: ${({ theme }) => theme.colorTextSecondary};
    font-weight: 300;
    font-size: 1rem;
    margin: 0.5rem 0;
  }

  h3 {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colorSecondaryMuted};
    margin-bottom: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colorTextPrimary};
    border: 1px solid ${({ theme }) => theme.colorTextPrimary};
    padding: 0.3rem;
    align-self: center;
    margin: 1rem 0;
    font-size: 1rem;

    &:hover {
      color: ${({ theme }) => theme.colorTextMuted};
      border: 1px solid ${({ theme }) => theme.colorButtonMuted};
    }
  }
`;

export default function PrayerCard({ imageUrl, downloadUrl, title, date }) {
  return (
    <Container>
      <Image alt={date} src={imageUrl} />
      <div>
        <h2>{title} </h2>
        <h3>{date}</h3>
        <a href={downloadUrl} download={title}>
          Download
        </a>
      </div>
    </Container>
  );
}
