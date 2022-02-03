import styled from 'styled-components'
import Image from 'next/image'
const Container = styled.div`

`


export default function PrayerCard({imageUrl,downloadUrl}){

return(
<Container>
  <Image src={imageUrl} />
</Container>
)
}