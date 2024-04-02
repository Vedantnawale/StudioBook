import React from 'react'


function Logo({width = '100px'}) {
    return (
        <div>
            <img 
            width={48}
            className=' rounded-full  py-0'
            src="./assets/images/ocassion_1.png" 
            alt="logo" 
             />
        </div>
    )
}

export default Logo
