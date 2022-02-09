import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import Landing from "../components/Landing/Landing";
import PropheticVoice from "../components/PropheticVoice/PropheticVoice";
import Prayers from "../components/Prayers/Prayers";
import Title from "../components/Title";
import Testimonies from "../components/Testimonies/Testimonies";



// import prayerpdf from "../assets/prayer-books/prayerpdf.pdf";
// import gopdf from "../assets/prayer-books/gopdf.pdf";
// import arrowpdf from "../assets/prayer-books/arrowpdf.pdf";
// import settledpdf from "../assets/prayer-books/settledpdf.pdf";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colorBackgroundPrimary};
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
        <Prayers />
        <Title title={"Testimonies"} />
        <Testimonies />
      </Container>
    </div>
  );
};

export default Home;
