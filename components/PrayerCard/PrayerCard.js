import styled from 'styled-components'
import Image from 'next/image'


const Container = styled.div`
width: 300px;
height: 400px;
position: relative;
border: 1px solid ${({theme})=> theme.colorTextMuted};
background-color: ${({theme})=> theme.colorBackgroundSecondary};
margin: 2rem;
border-radius: .5rem;

img{
  border-radius: .5rem;
}

div{
position: absolute;
bottom: 0;
width: 100%;
background-color: inherit;
padding: 0 1rem;
display: flex;
flex-direction: column;
border-radius: .5rem;
}

h2{
  color: ${({theme})=> theme.colorTextPrimary};
  font-weight: 300;
  font-size: 1rem;
  margin: .5rem 0;
}

h3{
  font-size: 0.8rem;
  color: ${({theme})=> theme.colorTextMuted};
  margin-bottom: 1rem;
}

a{
  color: ${({theme})=> theme.colorTextPrimary};
  border: 1px solid ${({theme})=> theme.colorTextPrimary};
  padding: .3rem;
  align-self: center;
  margin: 1rem 0;
  font-size: 1rem;

  &:hover{
    color: ${({theme})=> theme.colorTextMuted};
  border: 1px solid ${({theme})=> theme.colorTextMuted};
  }
}

`


export default function PrayerCard({imageUrl,downloadUrl,title,date}){

return(
<Container>
  <Image src={imageUrl} />
  <div>
    <h2>{title} </h2>
    <h3>{date}</h3>
    <a href={downloadUrl} download={title} >Download</a>
  </div>
</Container>
)
}