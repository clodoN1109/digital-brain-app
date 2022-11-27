import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {

    return (

        <div className='center' style={{padding:'0px'}}> 
            <p className='f3'>
                {'Feed the brain with some pixels.'}
            </p>
            <div className='pa4 br3 shadow-5 form' style={{width:'70%'}}>
                <input className='f4 pa2 w-70' type='text' onChange={onInputChange}/> 
                <button style={{backgroundColor:'rgba(0,0,0,0.4)'}} className='w-30 f4 link ph3 pv2 dib white'
                        onClick = {onButtonSubmit}
                > Feed </button>
            </div>

        </div>
        



    );


}

export default ImageLinkForm;