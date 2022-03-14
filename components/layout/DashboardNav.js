import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../context/Context";
import Link from "next/link";
import { useRouter } from "next/router";

import { HiLogout } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";
import { GiPrayer, GiLoveSong } from "react-icons/gi";
import { FaRegHandshake, FaMoneyCheckAlt } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";



const DNContainer = styled.div`
  width: ${({ theme }) => theme.adminWidth};
  height: 100vh;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: ${({ theme }) => theme.navHeight};
  left: 0;
  background-color: ${({ theme }) => theme.colorBackgroundSecondary};

  @media screen and (min-width: ${({ theme }) => theme.mobile}) {
    display: flex;
  }

  .top {
    height: 150px;
    width: 90%;
    border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colorTextSecondary};

    h3 {
      font-weight: 400;
      font-size: 1.2rem;
    }
  }

  .nav-links {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1.3rem 0.75rem;

    div {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: ${({ theme }) => theme.colorTextPrimary};
      margin-bottom: 2rem;
      span {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: .2rem .4rem;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colorPrimaryMuted};
        }
      }

      h3 {
        font-weight: 400;
        margin-left: 0.5rem;
        font-size: 1rem;
      }
    }

    .activeLink span{
      border-bottom: 1px solid ${({ theme }) => theme.colorPrimaryMuted};
      color: ${({ theme }) => theme.colorPrimaryMuted};
    }
  }
`;

const navData = [
  {
    link: "/dashboard",
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
  },
  {
    link: "/dashboard/requests",
    title: "Prayer Requests",
    icon: <GiPrayer />,
  },
  {
    link: "/dashboard/testimonies",
    title: "Testimonies",
    icon: <GiLoveSong />,
  },
  {
    link: "/dashboard/tithing",
    title: "Tithes",
    icon: <FaMoneyCheckAlt />,
  },
  {
    link: "/dashboard/partnership",
    title: "Partnership",
    icon: <FaRegHandshake />,
  },
  {
    link: "/dashboard/logout",
    title: "Logout",
    icon: <HiLogout />,
  },
];
const DashboardNav = () => {
  const { loggedInUser } = useContext(Context);
  const router = useRouter();

  return (
    <DNContainer>
      <div className="top">
        <MdAccountCircle size="5rem" />
        <h3>{loggedInUser && loggedInUser.firstName}</h3>
      </div>
      <div className="nav-links">
        {navData.map((data, i) => (
          <div className={router.pathname === data.link ? "activeLink" : ""} key={i} >
            <Link href={data.link}>
              <span>
                {data.icon}
                <h3>{data.title}</h3>
              </span>
            </Link>
          </div>
        ))}
      </div>
    </DNContainer>
  );
};

export default DashboardNav;
