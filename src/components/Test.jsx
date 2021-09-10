import axios from "axios"
import { useState } from "react"
import './Test.scss';
import mainImage from '../assets/main.jpg' //TOP画面のimage画像

export const Test = () => {
  // const [ keyword ,setKeyword] = useState();

  // const onClickGetGoogleAPI = () => {
  //   axios.get('https://www.googleapis.com/books/v1/volumes',{params:{
  //     q: keyword,
  //     // startIndex: 1
  //     maxResults: 30,
  //     startIndex: 3,
  //   }})
  //   .then((res) => {
  //     console.log(res);
  //   })
  // }
  // const OnChangeKeyword = (e)=> {
  //   setKeyword(e.target.value)
  //   console.log(e.target.value)
  // }

  const onClickGetGo = () => {
    axios.get('http://localhost:9090/api/go/books/tsutaya?',{params:
    {q: "react",
  }}).then((res)=> {
      console.log(res)
    })
  }


  const onClickCookie = () => {
    // document.cookie = "aaa=1123"
    document.cookie = "aaa=; expires=0";
  }

  // const sytle = {
  //   ".three-dot-spinner": {

  //   }
  // }

  return(
    <>

    {/* <div className="cover-slide hover-darken inview">
    <img src={mainImage} alt="memento time" className="mx-auto img-zoom"/>
    </div> */}
    <button onClick={onClickGetGo}>GO GETTTTTTTT</button>
    {/* <div className="three-dot-spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
    </div>

    <div className="rect-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div id="container">
      <div className="animate-title inview">
        <span className="char">M</span>
        <span className="char">E</span>
        <span className="char">M</span>
        <span className="char">E</span>
        <span className="char">N</span>
        <span className="char">T</span>
        <span className="char">O</span>
        <span className="char">T</span>
        <span className="char">O</span>
      </div>
    </div> */}

          <>
          {/* <button onClick={onClickGetGo}>sssss</button> */}
          {/* <input type="text" onChange={OnChangeKeyword}/>
          <button onClick={onClickGetGoogleAPI}>googleAPIから</button> */}
          {/* <button onClick={onClickCookie}>クッキー！</button> */}
          </>
  </>

  )
}
