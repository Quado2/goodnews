import Link from "next/link";
import styled from "styled-components";
import { useContext } from "react";

import { navItems } from "./data";
import Hambuger from "../Hambuger";
import { Context } from "../../context/Context";
import { MdAccountCircle } from "react-icons/md";
import RollText from '../../components/RollText/RollText'

const Header = styled.header`
  width: 100%;
  height: ${({ theme }) => theme.navHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #010e08;
  padding: 2% 4%;
  border-bottom: 1px solid ${({ theme }) => theme.colorTextPrimary};
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
    flex: 1 1 0px;
  }

  .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    align-self: center;
    flex: 1 1 0px;

    @media screen and (min-width: ${({theme})=> theme.mobile}) {
      display: none;
    }

    h4{
      font-size: .9rem;
      font-weight: 400;
    };
  }

  .hidden {
    flex: 1 1 0px;
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
    color: ${({ theme }) => theme.colorTextPrimary};
    padding: 2px 0.3rem;
  }

  a:hover,
  a:active,
  a.active {
    border-bottom: 1px solid ${({ theme }) => theme.colorTextPrimary};
  }
`;

function MainNavigation() {

  const {loggedInUser} = useContext(Context)
  

  return (
    <Header>
      <div className="logo">Logos</div>
      {(loggedInUser && loggedInUser.firstName) && <div className="profile"><MdAccountCircle fontSize={'2rem'} /><h4>{loggedInUser.firstName}</h4> </div>}
      <div className="hidden"></div>
      {navItems && (
        <nav>
          <ul>
            {navItems.map((nav, i) => {
              return (
                <li key={i}>
                  <Link href={nav.link}>{nav.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </Header>
  );
}

export default MainNavigation;
