import styled from "styled-components";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";

import { navItems, dashboardItems } from "./data";
import Socials from "../Socials";
import { Context } from "../../context/Context";



const SideContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  transition: all ease-in-out 0.3s;
  background: ${({ theme }) => theme.colorBackgroundPrimary};
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transform: ${({ show }) => (show ? "" : "translateX(-150vw)")};

  .nav-list {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: .8rem 0 0 0;
    padding: 0;
  }

  .activeLink a{
      border-bottom: 1px solid ${({ theme }) => theme.colorTextPrimary};
    }

  .nav-list li {
    transition: all ease-in-out 0.5s 0.4s;
    list-style: none;
    padding: ${({ show }) => (show ? "1.3rem" : "0")};
    border-bottom: 1px solid #1fe5ff24;
    text-align: center;
    opacity: ${({ show }) => (show ? "1" : "0")};

    &:hover a {
      color: ${({ theme }) => theme.colorTextHover};
    }
  }
  a {
    color: ${({ theme }) => theme.colorTextPrimary};
    font-size: .9rem;
    font-weight: 300;
    text-align: center;
  }
`;

export default function Sidebar() {
  const { clicked, setClicked,loggedInUser } = useContext(Context);
  const router = useRouter();
  const displayItems = (loggedInUser && loggedInUser.firstName) ? dashboardItems : navItems


  return (
    <SideContainer show={clicked}>
      <div className="logo">Logo</div>
      <ul className={"nav-list"}>
        {displayItems &&
          displayItems.map((nav, i) => {
            return (
              <li className={router.pathname === nav.link ? "activeLink" : ""} onClick={() => setClicked(!clicked)} key={i}>
                <Link href={nav.link}>{nav.title}</Link>
              </li>
            );
          })}
      </ul>
      <Socials show={clicked} />
    </SideContainer>
  );
}
