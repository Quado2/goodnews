import styled from "styled-components";
import { useContext } from "react";
import {HambugerContext} from '../context/HambugerContext'



const HambugerContainer = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid ${({ theme, rotate }) => rotate ? "#FF5157": theme.colorTextPrimary};
  z-index: 4;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  padding: 2px;
  position: fixed;
  right: 2rem;
  top: .9rem;

  @media screen and (min-width: ${({theme})=> theme.tablet}){
    display: none;
  }

  div{
    width: 85%;
    height: 1px;
    margin: 2px;
    background-color: ${({ theme ,rotate}) => rotate? "#FF5157": theme.colorTextPrimary};
    transform: ${({rotate}) => rotate?  'rotateZ(-45deg)': ''};
    transform-origin: center;
    transition: all .5s ease-in;
  }

  div:first-child{
    width: ${({rotate}) => rotate? "85%": "40%"};
    align-self: flex-start;
    transform: ${({rotate}) => rotate? 'rotateZ(45deg) translate3d(8px, 7px,0px);': '' }
  }

  div:last-child{
    width: 40%;
    align-self: flex-end;
    transform: ${({rotate}) => rotate?  'rotateZ(45deg) translate3d(-6px, -3px,0px)':''};
    opacity: ${({rotate}) => rotate? "0": "1"};
  }
`;
export default function Hambuger() {
const {clicked, setClicked} = useContext(HambugerContext)

  return (
    <HambugerContainer onClick={()=>setClicked(!clicked)} rotate={clicked}>
      <div></div>
      <div></div>
      <div></div>
    </HambugerContainer>
  );
}
