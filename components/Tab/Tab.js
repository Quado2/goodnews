import styled from "styled-components";
import { useState } from "react";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: ${({ theme }) => theme.navHeight};

  .tab-buttons {
    border-bottom: 1px solid rgb(20, 37, 77);
    /* background-color: rgba(20, 37, 77,.5); */
    position: absolute;
    top: ${({ theme }) => theme.navHeight};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;

    button {
      padding: 0.5rem 0.7rem;
      outline: none;
      border: none;
      font-size: 20px;
      min-width: 8rem;
      background-color: transparent;
      color: ${({ theme }) => theme.colorTextPrimary};
      font-weight: 300;
    }

    button.active {
      background-color: transparent;
      border: 1px solid rgb(20, 37, 77);
      border-bottom: 1px solid ${({ theme }) => theme.colorTextPrimary};
      color: ${({ theme }) => theme.colorTextPrimary};
    }
  }
`;

export default function Tab({ tabsTitle, children }) {
  const [activeIndex, setActiveIndex] = useState(0);


  return (
    <TabContainer>
      <div className="tab-buttons">
        {tabsTitle &&
          tabsTitle.map((title, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={activeIndex === i ? "active" : null}
            >
              {title}
            </button>
          ))}
      </div>

      {children[activeIndex]}
    </TabContainer>
  );
}
