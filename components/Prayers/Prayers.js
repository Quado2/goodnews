import styled from "styled-components";
import PrayerCard from "../PrayerCard/PrayerCard";
import QuickForm from "../QuickForm/QuickForm";
import data from "./data";

const PrayerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colorBackgroundPrimary};

  .quickform-wrapper{
    width: 100%;
    padding: 1rem
  }
`;

const PrayerCardContainer = styled(PrayerContainer)`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const RequestContainer = styled(PrayerCardContainer)``;

const inputData = [
  {
    type: "input",
    inputType: "text",
    inputName: "name",
    placeHolder: "Full Name",
  },
  {
    type: "input",
    inputType: "email",
    placeHolder: "Phone Number",
  },
  {
    type: "textarea",
    inputType: "",
    placeHolder: "Prayer Request",
  },
  {
    type: "input",
    inputType: "submit",
    placeHolder: "Submit",
  },
];

export default function Prayers() {
  return (
    <PrayerContainer>
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
      <div className="quickform-wrapper">
        <QuickForm inputData={inputData} message={"Send a Prayer Request"}/>
      </div>
      
    </PrayerContainer>
  );
}
