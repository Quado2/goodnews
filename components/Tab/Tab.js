import styled from "styled-components";

const TabContainer = styled.div`
  width: 100%;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: ${({theme}) => theme.navHeight};

  .tab-buttons{
    border: 1px solid red;
  }
  
`

export default function Tab({tabs}){

  return(
    <TabContainer>
      <div className="tab-buttons"> 
    <button>Register</button>
    <button>Login</button>
      </div>

    </TabContainer>
  )

}