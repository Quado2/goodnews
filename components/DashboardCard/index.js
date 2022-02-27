import styled from "styled-components";
import Link from "next/link";

const DCContainer = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 2rem;
  background-color: ${({bColor}) => bColor};

  h3{
    color: ${({textColor}) => textColor}
  }

`;

export default function DashboardCard({ title, icon, textColor, bColor, link }) {
  return (
    <Link href={link}>
      <DCContainer textColor={textColor} bColor={bColor} >
        <h3>{title}</h3> {icon}
      </DCContainer>
    </Link>
  );
}
