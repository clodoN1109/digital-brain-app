import React from 'react';

const Navigation = ({onRouteChange}) => {

    return (

        <nav style={{ height:'40px', display:'flex', justifyContent: 'flex-end'}}>

            <p onClick={() => onRouteChange('signin')}  
               style={{margin: '0', padding:'5px', alignSelf:'center'}} 
               className='f4 link dim  white pa3 pointer' > Sign Out
                
            </p>
               
        </nav>  




    );


}

export default Navigation;