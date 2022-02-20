import Particles from 'react-tsparticles'
import styles from './OurParticles.module.css'

function  OurParticles (){

    return (
        <Particles
          className={styles.our_particles}
          params={{
                  
            'particles':{
                'number':{
                    'value': 10,
                    
                },
                'size':{
                    'value':2,
                    'random': true,
                    
                },
                "color":{
                    "value":'#fff'
                },
                "shape":{
                    "type":"circle"
                },
                'opacity':{
                    'value':1,
                    'anim':{
                        'enable':false
                    }
                },
                "lineLinked":{
                    'enable': false
                },
                'move': {
                    'speed': .7, 
                    'direction': 'top',
                    'straight': true,
                    'random': true,
                    'outMode': 'out'
                }
                
            }
        }}
            height='99vh'
        />
    )
}

export default OurParticles