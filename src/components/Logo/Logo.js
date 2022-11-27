import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    
    return (
        
        <div className='ma4 mt0 center'>
        
            <Tilt className='Tilt br2 shadow-2' style={{padding:'50px'}}>
                <div className='Tilt-inner pa3'>

                    <img alt='logo' src={brain} />
                    
                </div>
            </Tilt>
        
        </div>
        
        
        
        );
        
        
    }
    
    export default Logo;