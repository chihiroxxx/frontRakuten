import axios from "axios"
import { useContext, useState } from "react"
import './Test.scss';
import mainImage from '../assets/main.jpg' //TOP画面のimage画像
import { MainContext } from "../providers/Provider";

export const Test = () => {
  const { configAxios} = useContext(MainContext);
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

  const dateTimeFormat = () =>  {
    const date = new Date() // まあ、ここをinputで受け取れるようにする
    console.log(`${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`)
    console.log(`${date.getFullYear()}-0${date.getMonth()}-${date.getDate()} 0${date.getHours()}:0${date.getMinutes()}:${date.getSeconds()}`)

    const m = (`00${date.getMonth()}`).slice(-2)
    const d = (`00${date.getDate()}`).slice(-2)
    const h = (`00${date.getHours()}`).slice(-2)
    const mi = (`00${date.getMinutes()}`).slice(-2)
    const s = (`00${date.getSeconds()}`).slice(-2)

    console.log(`${date.getFullYear()}${m}${d}${h}${mi}${s}`)



    return `${date.getFullYear()}${m}${d}${h}${mi}${s}`
  }
/*
  const deleteData = new FormData()

  const formDataCreateDelete = () => {
    const params = {
      id: 10,
      thoughts: "updated now!!!! from react!!! is delete???",
    }
    Object.entries(params).forEach(([key, value]) => {
      deleteData.append(key, value)
    })
  }
*/


  const updateData = new FormData()

  const formDataCreateUpdate = () => {
    const params = {
      id: 7,
      thoughts: "updated now!!!! from react!!! is valid???",
      // date: dateTimeFormat(),
      date: "", // 空文字バリデーションテスト
    }
    // data.append("booktitle", "react")
    Object.entries(params).forEach(([key, value]) => {
      updateData.append(key, value)
    })
  }

  const data = new FormData()
  const formDataCreate = () => {
    const params = {
      booktitle: "react",
      author: "大好きまん",
      bookimage: "NO image...",
      thoughts: "from react now!!!!",
      date: dateTimeFormat(),
      userid: 1,
    }
    // data.append("booktitle", "react")
    Object.entries(params).forEach(([key, value]) => {
      data.append(key, value)
    })
  }
  const onClickBackGo = () =>{
    formDataCreate()
    axios.post('http://localhost:9090/api/v1/books',data
  /*  {
      booktitle: "react",
      author: "大好きまん",
      bookimage: "NO image...",
      thoughts: "よおおおおおん",
      userid: 1,
  } */
  ).then((res)=> {
      console.log(res)
    })
  }
  const onClickBackGoUpdate = () =>{
    formDataCreateUpdate()
    console.log(updateData)
    axios.patch('http://localhost:9090/api/v1/books',updateData
  /*  {
      booktitle: "react",
      author: "大好きまん",
      bookimage: "NO image...",
      thoughts: "よおおおおおん",
      userid: 1,
  } */
  ).then((res)=> {
      console.log(res)
    })
  }
  const id = 11
  const onClickBackGoDelete = () =>{
    // formDataCreateDelete()
    // console.log(deleteData)
    axios.delete(`http://localhost:9090/api/v1/books?id=${id}`,//deleteData
    // {id: 10}
  ).then((res)=> {
      console.log(res)
    })
  }

  const onClickAuthTest = ()=> {
    // const token = document.cookie
    // .split('; ')
    // .find(row => row.startsWith('token'))
    // .split('=')[1];
    axios.get(`http://localhost:9090/restricted`,configAxios

    /*{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    } */
  //  ,{withCredentials: true}
  ).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const onClickGetCookie = ()=>{
    // console.log(document.cookie)
    const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))
    .split('=')[1];

    console.log(cookieValue)
  }
  return(
    <>
    <button onClick={onClickBackGo}>go post!!!!</button><br/>
    <br/>
    <button onClick={onClickBackGoUpdate}>go update!!!!</button><br/>
    <br/>
    <button onClick={onClickBackGoDelete}>go delete!!!!</button><br/>
    <br/>
    <button onClick={onClickAuthTest}>go auth test!!!!</button><br/>
    <br/>
    <button onClick={onClickGetCookie}>cookey test!!!!</button><br/>
    <br/>
    <button onClick={dateTimeFormat}>print console!!!</button>




    {/* <div className="cover-slide hover-darken inview">
    <img src={mainImage} alt="memento time" className="mx-auto img-zoom"/>
    </div> */}
    {/* <button onClick={onClickGetGo}
    className="rounded-full">GO GETTTTTTTT</button> */}
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
