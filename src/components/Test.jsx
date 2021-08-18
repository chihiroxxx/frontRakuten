import axios from "axios"
import { useState } from "react"

export const Test = () => {
  const [ keyword ,setKeyword] = useState();

  const onClickGetGoogleAPI = () => {
    axios.get('https://www.googleapis.com/books/v1/volumes',{params:{
      q: keyword,
      // startIndex: 1
      maxResults: 30,
      startIndex: 3,
    }})
    .then((res) => {
      console.log(res);
    })
  }
  const OnChangeKeyword = (e)=> {
    setKeyword(e.target.value)
    console.log(e.target.value)
  }
  return(
  <>
  <input type="text" onChange={OnChangeKeyword}/>
  <button onClick={onClickGetGoogleAPI}>googleAPIから</button>
  </>
  )
}
