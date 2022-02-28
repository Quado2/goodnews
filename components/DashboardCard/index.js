import styled from "styled-components";
import Link from "next/link";

const DCContainer = styled.div`
  width: 90%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  border-radius: .25rem;
  background-color: ${({bColor}) => bColor};
  transition: transform .2s ease-in;

  &:hover{
   transform: scale(1.02);
   cursor: pointer;
  }

  @media screen and (min-width: ${({theme})=> theme.mobile}) {
    width: 250px;
  }

  h3{
    color: ${({textColor}) => textColor};
    font-weight: 400;
    margin-left: 1rem;
  }

`;

export default function DashboardCard({ title, icon, textColor, bColor, link }) {
  return (
    <Link href={link}>
      <DCContainer textColor={textColor} bColor={bColor} >
      {icon} <h3>{title}</h3> 
      </DCContainer>
    </Link>
  );
}
