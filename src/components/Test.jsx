import axios from "axios"
import { useState } from "react"

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
    axios.get('http://localhost:8082').then((res)=> {
      console.log(res)
    })
  }


  const onClickCookie = () => {
    // document.cookie = "aaa=1123"
    document.cookie = "aaa=; expires=0";
  }

  return(
  <>
  <button onClick={onClickGetGo}>sssss</button>
  {/* <input type="text" onChange={OnChangeKeyword}/>
  <button onClick={onClickGetGoogleAPI}>googleAPIから</button> */}
  <button onClick={onClickCookie}>クッキー！</button>
  </>

  )
}
