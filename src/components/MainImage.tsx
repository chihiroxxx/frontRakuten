import React from 'react'
import mainImage from '../assets/main.jpg' //TOP画面のimage画像
import MainTitle from './animations/MainTitle'
import './Search.scss';

const MainImage = () => {
  return (
    <>
        <div className="relative w-10/12 mx-auto main-sepia">

        <img src={mainImage} alt="memento time" className="mx-auto "/>
        <div className="w-screen z-10" style={{position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",}}>
              <div>

              <MainTitle />
              </div>
        {/* <h1 className=" font-black tracking-tighter  text-white hover:text-yellow-300 text-5xl title-font text-center cursor-default
          transition duration-500 ease-in-out transform
        ">Welcome to */}
                  {/* <div className="mt-3 ml-1 tracking-tighter text-gray-600  text-base font-medium">Search Books now!</div> */}
                  {/* </h1> */}
        </div>
        </div>
        </>
  )
}

export default MainImage
