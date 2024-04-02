import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Studio = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const role = useSelector(state => state.auth.role);
  return (
    <>
      {!isLoggedIn || role === "USER" ? (
        <>
          <div className='flex flex-col justify-center items-center gap-3 py-10 bg-gradient-to-r from-blue-500 to-purple-500 via-indigo-600'>
            <h1 className=' madimi-one-regular py-8 text-4xl '>Are You Professional Photographer ?</h1>
            <Link to="/signup"> <button className="text-white bg-red-500 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-bold">Register As Studio </button></Link>
          </div>
        </>
      ) : (
        <>
           <div className='flex flex-col justify-center items-center gap-3 py-10 bg-gradient-to-r from-blue-500 to-purple-500 via-indigo-600'>
            <h1 className=' madimi-one-regular py-8 text-4xl '>Attract Audience? Customize it!</h1>
            <Link to="/signup"> <button className="text-white bg-red-500 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-bold">Edit Your Studio </button></Link>
          </div>
        </>
      )}
    </>
  )
}

export default Studio;

{/* <div className='flex flex-col justify-center items-center gap-3 py-10 bg-gradient-to-r from-blue-500 to-purple-500 via-indigo-600'>
        <h1 className=' madimi-one-regular py-8 text-4xl '>Are You Professional Photographer ?</h1>
        <Link to="/signup"> <button className="text-white bg-red-500 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-bold">Register As Studio </button></Link>
    </div> */}