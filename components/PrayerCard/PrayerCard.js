import styled from 'styled-components'
import Image from 'next/image'
const Container = styled.div`
width: 300px;
height: 430px;
position: relative;
border: 1px solid ${({theme})=> theme.colorTextPrimary};

div{
position: absolute;
bottom: 0;
border: 1px solid red;
width: 100%;
}
`


export default function PrayerCard({imageUrl,downloadUrl}){

return(
<Container>
  <Image src={imageUrl} />
  <div>

  </div>
</Container>
)
}