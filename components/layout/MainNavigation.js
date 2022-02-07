import Link from "next/link";
import styled from "styled-components";

import { navItems } from "./data";
import Hambuger from "../Hambuger";

const Header = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #010e08;
  padding: 2% 4%;
  border-bottom: 1px solid #1fe5ff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  nav {
    @media screen and (max-width: ${({ theme }) => theme.tablet}) {
      display: none;
    }
  }

  .logo {
    font-size: 2rem;
    color: #1fe5ff;
    font-weight: bold;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: baseline;
  }

  li {
    margin-left: 3rem;
  }

  a {
    text-decoration: none;
    font-size: 1rem;
    color: #1fe5ff;
    padding: 2px 0;
  }

  a:hover,
  a:active,
  a.active {
    border-bottom: 1px solid #1fe5ff;
  }
`;

function MainNavigation() {
  return (
    <Header>
      <div className="logo">Logo</div>
      <nav>
        <ul>
          {navItems &&
            navItems.map((nav, i) => {
              return (
                <li key={i}>
                  <Link href={nav.link}>{nav.title}</Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </Header>
  );
}

export default MainNavigation;
