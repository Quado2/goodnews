import styled from "styled-components";
import PrayerCard from "../PrayerCard/PrayerCard";
import data from "./data";

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

export default function Prayers() {
  return (
    <PrayerCardContainer>
      {data &&
        data.map((datum, i) => (
          <PrayerCard
            key={i}
            imageUrl={datum.imageUrl}
            downloadUrl={datum.downloadUrl}
            title={datum.title}
            date={datum.date}
          />
        ))}
    </PrayerCardContainer>
  );
}
