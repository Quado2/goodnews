import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import Landing from "../components/Landing/Landing";
import PropheticVoice from "../components/PropheticVoice/PropheticVoice";
import PrayerCard from "../components/PrayerCard/PrayerCard";
import Title from "../components/Title";
import Testimonies from '../components/Testimonies/Testimonies'

import prayer from "../assets/images/prayer.png";
import arrow from "../assets/images/arrow.png";
import go from "../assets/images/go.png";
import settled from "../assets/images/settled.png";

import prayerpdf from "../assets/prayer-books/prayerpdf.pdf";
import gopdf from "../assets/prayer-books/gopdf.pdf";
import arrowpdf from "../assets/prayer-books/arrowpdf.pdf";
import settledpdf from "../assets/prayer-books/settledpdf.pdf";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colorBackgroundPrimary};
`;

const PrayerCardContainer = styled(Container)`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

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
        <Title title="Monthly Prayer" />
        <PrayerCardContainer>
          <PrayerCard
            imageUrl={prayer}
            downloadUrl={prayerpdf}
            title={"Prayer swords to release your blessing and breakthrough"}
            date={"January 2022"}
          />

          <PrayerCard
            imageUrl={go}
            downloadUrl={gopdf}
            title={"Let my people go"}
            date={"December 2021"}
          />

          <PrayerCard
            imageUrl={arrow}
            downloadUrl={arrowpdf}
            title={"Arrow against shame and reproach"}
            date={"November 2021"}
          />

          <PrayerCard
            imageUrl={settled}
            downloadUrl={settledpdf}
            title={"Prayer swords to release your blessing and breakthrough"}
            date={"October 2021"}
          />
        </PrayerCardContainer>
        <Testimonies />
      </Container>
    </div>
  );
};

export default Home;
