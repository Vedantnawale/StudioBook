import React from 'react'
import logoImage from "../assets/Images/logoImage.png"

function Logo({width = '100px'}) {
    return (
        <div>
            <img 
            width={56}
            className='rounded-full py-0'
            src={logoImage} 
            alt="logo" 
             />
        </div>
    )
}

export default Logo
