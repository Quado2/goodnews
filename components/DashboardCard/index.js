import styled from "styled-components";
import Link from "next/link";

const DCContainer = styled.div`
  width: 250px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 2rem;
  border-radius: .25rem;
  background-color: ${({bColor}) => bColor};

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
