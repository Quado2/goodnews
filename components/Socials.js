import styled from "styled-components";
import Link from "next/link";
import { FaFacebookSquare, FaYoutubeSquare, FaTwitterSquare } from "react-icons/fa";
const SocialList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0;

  li{
    list-style: none;
    transition: all .7s ease-in .3s;
    margin: ${({show}) => show ? '1rem': '0'};
    &:hover a {
      color: ${({theme}) => theme.colorTextHover}
    }
     a{
       font-size: 2rem;
     }
  }

`;


export default function Socials({show}) {
  return (
    <SocialList show={show}>
      <li>
        <a href="www.facebook.com/goodnews"> <FaFacebookSquare /></a>
      </li>
      <li>
        <a href="www.youtube.com/goodnews"><FaYoutubeSquare /></a>
      </li>
      <li>
        <a href="www.twitter.com/goodnews"><FaTwitterSquare /></a>
      </li>
    </SocialList>
  );
}
