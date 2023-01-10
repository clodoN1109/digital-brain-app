import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit, sample, onCopyFromClipboard}) => {

    return (

        <div className='center' style={{padding:'0 0 60px 0'}}> 
            <p className='f3' style ={{fontSize:'20px', margin:'10px' }}>
                {'Exchange pixels for information.'}
            </p>
            <div className='pa4 br3 shadow-5 form' style={{width:'70%'}}>
                
                <div className='linkBox'>
                    <input style={{fontSize:'15px'}} 
                           placeholder = 'enter image URL or local address' 
                           id='linkSpace' 
                           className='f4 pa2 w-70 input-reset ba bg-transparent' 
                           type='text' 
                           onChange={onInputChange}/> 

                    <button style={{backgroundColor:'rgba(0,0,0,0.4)'}} 
                            className='copyButton w-15 link ph2 dib white'
                            onClick = {onCopyFromClipboard}> 
                        <img width="100%" height="100%" src="copyIcon_Vivid.png" 
                             title="Paste URL."/>
                    </button>

                    <button style={{backgroundColor:'rgba(0,0,0,0.4)'}} 
                            className='folderButton w-15 link ph2 dib white'
                            onClick = {onCopyFromClipboard}> 
                        <img width="100%" height="100%" alt='r' src="directoryIcon.png"
                             title="Choose folder."/>
                    </button>

                
                    <button style={{backgroundColor:'rgba(0,0,0,0.4)', fontSize:'1.2vw'}} 
                            className='w-15 link dib white sendButton'
                            onClick = {onButtonSubmit}
                    > 

                        <img width="100%" height="100%" alt='r' src="sendIcon.png"
                             title="Submit image."/> 

                    </button>
                </div>
                <div className='subBox'>
                    
                    <button style={{backgroundColor:'rgba(0,0,0,0.4)', fontSize:'1.2vw'}} 
                            className='w-15 f4 link ph3 pv2 dib white randomButton'
                            onClick = {sample}
                    > <img width="100%" height="100%" alt='r' src="randomIcon.png"
                             title="Random sample."/> 
                    </button>

                </div>

            </div>

        </div>
        



    );


}

export default ImageLinkForm;