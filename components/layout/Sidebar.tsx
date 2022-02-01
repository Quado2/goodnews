import styled from "styled-components";
import Link from "next/link";

import { navItems } from "./data";
import classes from "./MainNavigation.module.css";
import { Container } from "../styledComponents";

const SideContainer = styled(Container)`
  border: 2px solid red;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;

  a {
    color: ${({ theme }) => theme.colorTextPrimary};
  }
`;

export default function Sidebar() {
  return (
    <SideContainer>
      <div className={classes.logo}>Logo</div>
      <ul>
        {navItems &&
          navItems.map((nav: { title: string; link: string }, i) => {
            return <Link key={i} href={nav.link}>{nav.title}</Link>;
          })}
      </ul>
    </SideContainer>
  );
}
