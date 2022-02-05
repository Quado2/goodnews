import React, {Component} from 'react'

import styles from './Testimonies.module.scss'
import Testimony from './Testimony/Testimony'
import nigerian1 from '../../assets/images/nigerianman1.jpg'
import nigerian2 from '../../assets/images/nigerian2.jpg'
import nigerian3 from '../../assets/images/nigerian.jpg'
import south from '../../assets/images/south.jpg'
import malawi from '../../assets/images/malawi.webp'



class Testimonies extends Component {

 data = [
     {
         index:0,
        name: "Jacinta Akintoye",
        image: nigerian2,
        testimony:  "I joined a telegram channel and one of the member sent her link to luxafrica. I supported the community with 200,000 and got paid 300,000 after 5 days, I was so scared initially"
     },

     {
         index: 1,
         name:'Okoro David',
         image:south,
        testimony:"At first, my first supporter did not pay me immediately, I reported to the admins and was remerged to be paid immediately",
     },
     {
        index:2,
        name:'Kwame Wedeh',
        image:nigerian1,
        testimony: "This lockdown had been so tough untill someone sent her link in our whatsapp group chat, Luxafrica is the best thing that has happened to me in 2020",
     },

     {
         index:3,
         Name:'Kelvin Babafemi',
         image:nigerian3,
         testimony: "The platform is very fast and seamless in response, I got paid immediately after 5 of my support to other community member",
     },
     {
        index: 4,
        name: 'Ekrema Mayamiko',
        image:malawi,
        testimony:"I got to know about Luxafrica from my friend who had just lost his job. I was very skeptical at first, but I just decided to give it a try. I got paid on the 5th day after my payment. Please admins, remember my testimony bonus",
     }

 ]




 state = {
     index: 1,
     mark: {
        border:  '2px solid rgb(97, 88, 229)',
        backgroundColor: 'white',
     },
     intervalId: null,
 }
 
componentDidMount = () =>{
    const intervalId = setInterval(this.next, 7000)
    this.setState({intervalId: intervalId})
}

componentWillUnmount =() => {
    clearInterval(this.state.intervalId)
}

nextClicked = (index) => () =>{
    this.setState({index:index})
    //there is need to start interval afresh so we have to 
    //clear it and set it again
    clearInterval(this.state.intervalId)
    const intervalId = setInterval(this.next, 7000)
    this.setState({intervalId: intervalId})
 }


 next = () =>{
     
       if(this.state.index >= this.data.length-1){
                this.setState({index:0})
            } 
            else{
                this.setState({index: this.state.index+1})
            }
        }

    render = () =>{
    
        const {index,mark} = this.state

        return(
            <div className='testimonies-wrapper'>
                <div className='title'>
                    <h2>What the community members have to say:</h2>
                </div>
                <div className={`direct-wrapper active-testimony-${index}`}>
                   <div className='testimonies' style={{
                       'transform': `translateX(-${index*(100/5)}%)`
                   } }>
                        {this.data.map(datum => <Testimony key={datum.index} mName={datum.name} image={datum.image} testimony={datum.testimony} id={datum.index}/>)}
                    </div> 
                </div>
                
                <div className='controls'>
                    <div style={index===0? mark: null} onClick={this.nextClicked(0)}></div>
                    <div style={index===1? mark: null} onClick={this.nextClicked(1)}></div>
                    <div style={index===2? mark: null} onClick={this.nextClicked(2)} ></div>
                    <div style={index===3? mark: null} onClick={this.nextClicked(3)}></div>
                    <div style={index===4? mark: null} onClick={this.nextClicked(4)}></div>
                </div>
                <div className='join'>
                   <a to='/register' className='navlink'><h2 className='now'>Join Now</h2></a> 
                    <a to='/login' className='navlink'><h2>Login</h2></a>
                </div>
            </div>
        )
    }
}

export default Testimonies