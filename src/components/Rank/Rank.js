import React from 'react';

const Rank = ({userName, entries}) => {

    return (


        <div>

            <div className='f3'>
                
                <div style={{fontSize:"20px", padding:'0'}}>{userName + ", you have so far fed the brain with ..."}</div>
                <div className='w-15 f4 ph3 pv2 dib white' style={{color:'rgba(200,30,100)'}}>{entries + ' pixels'}</div>

            
            </div>
            


        </div>



    );


}

export default Rank;
