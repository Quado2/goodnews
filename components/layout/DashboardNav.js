import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../context/Context";


import { MdAccountCircle } from "react-icons/md";
import { GiPrayer, GiLoveSong } from "react-icons/gi";
import { FaRegHandshake, FaMoneyCheckAlt } from "react-icons/fa";

const DNContainer = styled.div`
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: ${({ theme }) => theme.navHeight};
  left: 0;
  background-color: ${({ theme }) => theme.colorBackgroundSecondary};

  .top{
    height: 150px;
    width: 90%;
     border-bottom: 1px solid ${({theme})=> theme.colorBorderSecondary};
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     color: ${({theme})=> theme.colorTextSecondary};
 
    h3{
      font-weight: 400;
      font-size: 1.2rem;
    }
  }

  .nav-links{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1.3rem .7rem;
    

    div{
      width:  100%;;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${({theme})=> theme.colorTextPrimary};
      border-bottom: 1px solid ${({theme})=> theme.colorBorderSecondary};


      h3{
        font-weight: 400;
        margin-left: .5rem;
        font-size: 1rem;
        
      }
    }
  }
`;

const DashboardNav = () => {
  const { loggedInUser } = useContext(Context);

  return <DNContainer>
    <div className="top">
      <MdAccountCircle size="5rem" />
      <h3>{loggedInUser && loggedInUser.firstName}</h3>
    </div>
    <div className="nav-links">
      <div>
        <GiPrayer />
        <h3>Prayer Requests</h3>
      </div>
    </div>
  </DNContainer>;
};

export default DashboardNav;
