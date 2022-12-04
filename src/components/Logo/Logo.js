import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';



const Logo = ({onHoverImage}) => {
    
    return (
        
        <div className='ma4 mt0 center'>
            
            <div className='flexLogo'>

            <canvas id='zoomCanvas' className='zoomBox'>
                

            </canvas>
            
            <Tilt className='Tilt br2 shadow-2 ' style={{padding:'50px'}}>
                <div className='Tilt-inner pa3 '>

                    <img className='logo' alt='logo' src={brain} />
                    <canvas id= "canvas" 
                            className="canvas"
                            onMouseMove = {onHoverImage}>
                    </canvas>
                </div>
            </Tilt>

            </div>
        
        </div>
        
        
        
        );
        
        
    }
    
    export default Logo;