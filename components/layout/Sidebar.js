import styled from "styled-components";
import Link from "next/link";
import { useContext } from "react";

import { navItems } from "./data";
import Socials from "../Socials";
import { HambugerContext } from "../../context/HambugerContext";


const SideContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  transition: all ease-in-out .3s;
  background: ${({ theme }) => theme.colorBackgroundPrimary};
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transform: ${({show}) => show ? '': 'translateX(-100vw)'}; 

  .nav-list {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 2rem 0 0 0;
    padding: 0;
  }
  .nav-list li {
    transition: all ease-in-out .5s .4s;
    list-style: none;
    padding: ${({show}) => show ? '1.3rem': '0'};
    border-bottom: 1px solid #1fe5ff24;
    text-align: center;
    opacity: ${({show}) => show ? '1': '0'};;
    
    &:hover a{
      color: ${({theme}) => theme.colorTextHover}
    }
    
  }
  a {
    color: ${({ theme }) => theme.colorTextPrimary};
    font-size: 1.1rem;
    font-weight: 300;
    text-align: center;
  }
`;

export default function Sidebar() {
  const {clicked} = useContext(HambugerContext)
  return (
    <SideContainer show={clicked}>
      <div className='logo'>Logo</div>
      <ul className={'nav-list'}>
        {navItems &&
          navItems.map((nav, i) => {
            return (
              <li key={i}>
                <Link href={nav.link}>
                  {nav.title}
                </Link>
              </li>
            );
          })}
      </ul>
      <Socials show={clicked} />
    </SideContainer>
  );
}
