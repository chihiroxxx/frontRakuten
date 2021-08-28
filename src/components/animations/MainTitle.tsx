import React, { useEffect } from 'react'
import './MainTitle.scss';

const MainTitle = () => {
  /*


  const title = "Welcome To MEMENTOTIME!"
  document.addEventListener('DOMContentLoaded', ()=>{
    // e.preventDefault();

    // const el = document.querySelector(".animate-title")
    // const str = el.innerHTML.trim()
    let concatStr = ""

    for (let c of title) {

      concatStr += `<span className="char">${c}</span>`
      console.log(c)
    }
    document.querySelector(".animate-title").innerHTML = concatStr;
    document.querySelector(".animate-title").classList.add("inview")

    console.log(concatStr)
  })


  */

  return (
    <div>
      <div id="container " >
        <div className="animate-title"
        // onLoad={onLoad}
        >
          {/* Welcome To MEMENTOTIME! */}

        </div>


        <div className="animate-title inview ">
          <span className="char mini">W</span>
          <span className="char mini">e</span>
          <span className="char mini">l</span>
          <span className="char mini">c</span>
          <span className="char mini">o</span>
          <span className="char mini">m</span>
          <span className="char mini">e</span>
          <span className="char mini">T</span>
          <span className="char mini">o</span>
            <br />
          <span className="char">M</span>
          <span className="char">E</span>
          <span className="char">M</span>
          <span className="char">E</span>
          <span className="char">N</span>
          <span className="char">T</span>
          <span className="char">O</span>
          <span className="char">T</span>
          <span className="char">I</span>
          <span className="char">M</span>
          <span className="char">E</span>
          <span className="char">!</span>
        </div>



      </div>
        {/* <div className="animate-title inview mini pb-32 md:pb-52">
          <span className="char">W</span>
          <span className="char">e</span>
          <span className="char">l</span>
          <span className="char">c</span>
          <span className="char">o</span>
          <span className="char">m</span>
          <span className="char">e</span>
          <span className="char">T</span>
          <span className="char">o</span>
        </div>

        <div className="animate-title inview ">

          <span className="char">M</span>
          <span className="char">E</span>
          <span className="char">M</span>
          <span className="char">E</span>
          <span className="char">N</span>
          <span className="char">T</span>
          <span className="char">O</span>
          <span className="char">T</span>
          <span className="char">I</span>
          <span className="char">M</span>
          <span className="char">E</span>
          <span className="char">!</span>
        </div>
      </div> */}
    </div>
  )
}

export default MainTitle
