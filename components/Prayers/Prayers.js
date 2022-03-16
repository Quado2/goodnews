import { useState } from "react";
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

  .quickform-wrapper {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
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
    inputName: "name",
  },
  {
    type: "input",
    inputType: "text",
    placeHolder: "Phone Number",
    inputName: "phone",
  },
  {
    type: "textarea",
    inputType: "",
    placeHolder: "Prayer Request",
    inputName: "content",
  },
  {
    type: "input",
    inputType: "submit",
    placeHolder: "Submit",
    inputName: "submit",
  },
];

export default function Prayers() {

  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState([])

  function handleQuickform(content) {
    console.log({ content });
    setErrorFlag(false)
    Object.keys(content).map(key => {
      if(content[key].length < 1){
        setErrorFlag(true);
        setErrorMessage(prevMessage=> ([...prevMessage, key+" cannot be empty"]));
      }
    })
  }

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
        <QuickForm
          handleQuickform={handleQuickform}
          inputData={inputData}
          message={"Send a Prayer Request"}
          errorFlag={errorFlag}
          errorMessage={errorMessage}
        />
      </div>
    </PrayerContainer>
  );
}
