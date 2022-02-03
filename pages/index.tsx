import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import Landing from "../components/Landing/Landing";
import PropheticVoice from "../components/PropheticVoice/PropheticVoice";
import PrayerCard from "../components/PrayerCard/PrayerCard";
import prayer from "../assets/images/prayer.png";
import arrow from "../assets/images/arrow.png";
import go from "../assets/images/go.png";
import settled from "../assets/images/settled.png";


import prayerpdf from "../assets/prayer-books/prayerpdf.pdf";
import gopdf from '../assets/prayer-books/gopdf.pdf'
import arrowpdf from '../assets/prayer-books/arrowpdf.pdf'
import settledpdf from '../assets/prayer-books/settledpdf.pdf'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colorBackgroundPrimary};
`;

const PrayerCardContainer = styled(Container)``;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Goodnews of Christ Baptist Church</title>
        <meta
          name="description"
          content="Official Website of Goodnews of Christ Baptist Church, Awka."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Landing />
        <PropheticVoice />
        <PrayerCard imageUrl={prayer} downloadUrl={prayerpdf} />
      </Container>
    </div>
  );
};

export default Home;
