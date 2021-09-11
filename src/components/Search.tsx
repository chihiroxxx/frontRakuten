import axios from 'axios'
import React, { ChangeEvent, TextareaHTMLAttributes, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { MainContext } from '../providers/Provider'
import { Result } from './Result'
// import { API_KEY } from '../api/API_KEY'
import { MyButton } from './atoms/MyButton'
import { Footer } from './Footer'
import { Test } from './Test'
import { ResultGoogleTest } from './ResultGoogleTest'
import { PhoneResult } from './PhoneResult'
import mainImage from '../assets/main.jpg' //TOP画面のimage画像
import MainTitle from './animations/MainTitle'
import './Search.scss';
import { Tooltip } from '@chakra-ui/react'


export const Search = () => {
  const { data, setData, text, setText, onClickTop, googleData, setGoogleData,targetFlagChangeReset,tsutayaData,setTsutayaData,kinoData, setKinoData } = useContext(MainContext);
  const appId = process.env.REACT_APP_RAKUTEN_API_KEY
  const goUrl = process.env.REACT_APP_GO_URL
  // console.log(appId)
  const [page, setPage] = useState(2)
  // commit commit!!!!!!!!!!!

  const onClickNextPage = ():void => {
    onClickRakutenAPINextPage()
    onClickGoogleAPINextPage()
    onClickGetGoTsutayaAPINextPage()
    onClickGetGoKinoAPINextPage()
    setPage(page + 1)
    setGooglePage(googlePage + 30)
    // setKinoPage(kinoPage + 2)
  }

  const onClickRakutenAPINextPage = ():void => {
    // const appId = API_KEY.RakutenAPI_KEY
    axios.get("https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?", {
      params: {format: "json",
      keyword: text,
      applicationId: appId,
      page: page,
    }
    }).then((res) => {
      const newArray = [...data, ...dataArrangeRakutenAPI(res.data.Items)]
      setData(newArray);
    })
  }

  const onChangeTarget = (e: ChangeEvent<HTMLInputElement>) => {
  // const onChangeTarget = (e: ChangeEvent<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    setText(() => e.target.value)
  }





  const onClickSearch = (): void => {
    setData([])
    setGoogleData([])
    setTsutayaData([])
    setKinoData([])
    setPage(2)
    setGooglePage(30)
    setKinoPage(1)
    setKinoArrangeData([])


    onClickGetGoogleAPI();
    onClickGetRakutenAPI();
    onClickGetGoTsutayaAPI();
    onClickGetGoKinoAPI();

  }

  interface RakutenItems{
    Item:{
      title: string,
      author: string,
      itemUrl: string,
      largeImageUrl: string

    }
  }
  const dataArrangeRakutenAPI = (items: [RakutenItems]) => {
    const newArray: PreparedData[] = [];
    items.map((item, index: number) => {
      const oneItem = {
        title: item.Item.title,
        author: item.Item.author,
        itemUrl: item.Item.itemUrl,
        imageUrl: item.Item.largeImageUrl,
    }
    newArray.push(oneItem)
      // console.log(oneItem,index)
    })
    return newArray
  }

  interface GoogleItems{
    volumeInfo:{
      title: string,
      authors: string[],
      infoLink: string,
      imageLinks: {
        thumbnail: string
      }
    }
  }

  const dataArrangeGoogleAPI = (items: [GoogleItems]) => {
    const newArray: PreparedData[] = [];
    items.map((item, index: number) => {
      const oneItem = {
        title: item.volumeInfo.title,
        author:
          item.volumeInfo.authors == null ?
          "":
          item.volumeInfo.authors[0] ,
        itemUrl: item.volumeInfo.infoLink,
        imageUrl:
            item.volumeInfo.imageLinks == null ?
           "" :
           item.volumeInfo.imageLinks.thumbnail,
    }
    newArray.push(oneItem)
    })
    return newArray

  }

  interface PreparedData{
    title: string,
    author: string,
    itemUrl: string,
    imageUrl: string,
  }


  const onClickGetRakutenAPI= () => {
    axios.get("https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?", {
      params: {format: "json",
      keyword: text,
      applicationId: appId}
    }).then((res) => {
      setData(dataArrangeRakutenAPI(res.data.Items));
      setPage(2)
    })
  }



  const onClickGetGoogleAPI = () => {
    axios.get('https://www.googleapis.com/books/v1/volumes',{params:{
      q: `intitle:${text}`,
      maxResults: 30, //楽天に合わせた
      startIndex: 0, //ページ数などではなくItem数で取得する仕様のよう スタートは0
    }})
    .then((res) => {
      dataArrangeGoogleAPI(res.data.items)

      setGoogleData(dataArrangeGoogleAPI(res.data.items));
    })
  }

    const [googlePage, setGooglePage] = useState(30)


  const onClickGoogleAPINextPage = () => {
    axios.get('https://www.googleapis.com/books/v1/volumes',{params:{
      q: `intitle:${text}`,
      maxResults: 30, //楽天に合わせた
      startIndex: googlePage, //ページ数などではなくItem数で取得する仕様のよう スタートは0
    }})
    .then((res) => {
      if (res.data.items != null) {
        const newArray = [...googleData, ...dataArrangeGoogleAPI(res.data.items)]
        setGoogleData(newArray);

      }
    })
  }

  const onClickGetGoTsutayaAPINextPage =() =>{
    axios.get(`${goUrl}/tsutaya?`,{params:
    {q: text,
      page:  page, //ひとまずpage1 tsutayaは30件か...
    }}).then((res)=> {
      if (res.data != null) {
        const newArray = [...tsutayaData, ...res.data]

        setTsutayaData(newArray)
        // console.log(newArray)

      }
      // const newArray = [...data, ...dataArrangeRakutenAPI(res.data.Items)]
      // setData(newArray);
    })
  }
  const [kinoPage, setKinoPage] = useState(1)
  const onClickGetGoKinoAPINextPage = ()=>{
    axios.get(`${goUrl}/kino?`,{params:
    {q: text,
      page: kinoPage, //ひとまずpage1 で紀伊國屋は20件か... うーむ...
    }}).then((res)=> {
      if (res.data != null) {
        const newArray = [...kinoData, ...res.data]
        setKinoData(newArray)
        // arrngKinoData = res.data.slice(0,30)
        // console.log(arrngKinoData)
        // console.log(res)
      }
    })
    console.log( Math.floor(kinoPage / 2) + 1)


  }

  const [phoneTabsState, setPhoneTabsState] = useState(true)
  const onClickGoogleTabs = () => {
    setPhoneTabsState(true)
  }
  const onClickRakutenTabs = () => {
    setPhoneTabsState(false)
  }

  // const mainImage = require('../assets/main.jpg');
  const getTopPosition = document.scrollingElement;
  window.onscroll = () => {
    // if (document.getElementById("want") === null){
    const want = document.getElementById("want")
    if (getTopPosition === null || want === null){
      return
    }
    if(getTopPosition.scrollTop > 190){
      want.classList.add("fixed","top-0");
      // console.log(want)
      // console.log("大きくスクロール！！！")
    } else if (getTopPosition.scrollTop < 190){
      want.classList.remove("fixed","top-0");
    }
  }

  // console.log(getTopPosition.scrollTop)
  // useEffect(() => {
  //   // if (document.getElementById("google-tab") === null){
  //   if (document.getElementById("google-tab") === null){
  //     return
  //   }
  //   const googleElement = document.getElementById("google-tab")
  //   const rakutenElement = document.getElementById("rakuten-tab")
  //   if (googleElement === null || rakutenElement === null ){
  //     return
  //   }
  //   phoneTabsState &&
  //     googleElement.classList.add("bg-indigo-900","text-white");
  //     phoneTabsState &&
  //     rakutenElement.classList.remove("bg-indigo-900","text-white");

  //     !phoneTabsState &&
  //     googleElement.classList.remove("bg-indigo-900","text-white");
  //     !phoneTabsState &&
  //     rakutenElement.classList.add("bg-indigo-900","text-white");

  // },[phoneTabsState])



  const styleJSX: React.CSSProperties ={
    marginBottom: "-2px"
  }

  // let arrngKinoData : [] = [] // useStateにする...

  const onClickGetGoKinoAPI = ()=>{
    axios.get(`${goUrl}/kino?`,{params:
    {q: text,
      page: kinoPage, //ひとまずpage1 で紀伊國屋は20件か... うーむ...
    }}).then((res)=> {
      if (res.data != null) {
      setKinoData(res.data)
      // arrngKinoData = res.data.slice(0,30)
      // console.log(arrngKinoData)
      // console.log(res)
    }
    // setKinoPage(kinoPage + 2)
    })

  }
  const onClickGetGoTsutayaAPI = ()=>{
    axios.get(`${goUrl}/tsutaya?`,{params:
    {q: text,
      page:  page - 1, //ひとまずpage1 tsutayaは30件か...
    }}).then((res)=> {
      if (res.data != null) {
      setTsutayaData(res.data)
      // console.log(res)
      }
    })
  }


  const [tabStatus, setTabStatus] = useState(1)


//   const tabfunc = () : JSX.Element => {
//     switch (tabStatus){
//     case 1:
//       console.log("1です")
//       return <span>GoodMorning</span>

//     case 2:
//       console.log("2です")
//       return <span>GoodMorning2</span>

//   }
//   return <span>GoodMorning2</span>
// }

useEffect(() => {
  if (document.getElementById("google-tab") !== null){
  switch (tabStatus){
    case 1:
      document.getElementById("google-tab")!.classList.add("bg-indigo-900","text-white");
      // document.getElementById("google-tab")!.classList.toggle("bg-indigo-900");
      // document.getElementById("google-tab")!.classList.toggle("text-white");
      document.getElementById("rakuten-tab")!.classList.remove("bg-indigo-900","text-white");
      document.getElementById("tsutaya-tab")!.classList.remove("bg-indigo-900","text-white");
      document.getElementById("kinokuniya-tab")!.classList.remove("bg-indigo-900","text-white");
      break
    case 2:
      document.getElementById("rakuten-tab")!.classList.add("bg-indigo-900","text-white");
      // document.getElementById("rakuten-tab")!.classList.toggle("bg-indigo-900");
      // document.getElementById("rakuten-tab")!.classList.toggle("text-white");
      document.getElementById("google-tab")!.classList.remove("bg-indigo-900","text-white");
      document.getElementById("tsutaya-tab")!.classList.remove("bg-indigo-900","text-white");
      document.getElementById("kinokuniya-tab")!.classList.remove("bg-indigo-900","text-white");
      break
    case 3:
      document.getElementById("tsutaya-tab")!.classList.add("bg-indigo-900","text-white");
      // document.getElementById("rakuten-tab")!.classList.toggle("bg-indigo-900");
      // document.getElementById("rakuten-tab")!.classList.toggle("text-white");
      document.getElementById("google-tab")!.classList.remove("bg-indigo-900","text-white");
      document.getElementById("rakuten-tab")!.classList.remove("bg-indigo-900","text-white");
      document.getElementById("kinokuniya-tab")!.classList.remove("bg-indigo-900","text-white");
      break
    case 4:
      document.getElementById("kinokuniya-tab")!.classList.add("bg-indigo-900","text-white");
      // document.getElementById("rakuten-tab")!.classList.toggle("bg-indigo-900");
      // document.getElementById("rakuten-tab")!.classList.toggle("text-white");
      document.getElementById("google-tab")!.classList.remove("bg-indigo-900","text-white");
      document.getElementById("rakuten-tab")!.classList.remove("bg-indigo-900","text-white");
      document.getElementById("tsutaya-tab")!.classList.remove("bg-indigo-900","text-white");
      break
  }}
},[tabStatus])
  const kinoArrange = () => {

    if (kinoData.length !== 0){
      // const arr = kinoData.map((i: PreparedData) => {

      // })
      // let arr: PreparedData[] = []
      // for(let i = 0; i <= 30 ; i++){
      //   setKinoArrangeData(...kinoData ,kinoData[i])
      //   // console.log(kinoData[i])
      // }
      const i = (Math.floor(kinoPage / 2) + 1)
      console.log(i * 30)
      const arr = kinoData.slice(0,30 * i)
      setKinoArrangeData(arr)
      console.log(arr)
      // console.log(kinoData)
      // console.log(kinoArrangeData)
      setKinoPage(kinoPage + 2)
    }
  }
  useEffect(()=> kinoArrange(),[kinoData])
  const [kinoArrangeData, setKinoArrangeData ] = useState([])
  console.log(kinoArrangeData)

  return(
    <>
    <div>
      {/* <Test /> */}
      <div className="ml-2">
      <div className="flex justify-end ml-auto items-en xl:flex-nowrap md:flex-nowrap lg:flex-wrap mt-8 mr-4 mb-5">
      <Tooltip label="検索したい本のタイトルを入力してください！">
        <div className="relative w-5/12 md:w-72 mr-2">
          <input value={text} onChange={onChangeTarget} type="text" placeholder="検索タイトルを入力！"
           className="bg-gray-200 w-full px-3 py-1 leading-8 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
        </div>
        </Tooltip>
        <div className="flex">
        <button onClick={onClickSearch} className="px-3 md:px-6 py-2 font-medium text-white transition duration-500 ease-in-out transform bg-indigo-900  border-blue-600 rounded-md ext-base focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-indigo-500 mr-3">
        SEARCH</button>
        <button onClick={targetFlagChangeReset} className="px-3 md:px-6 py-2 font-medium text-white transition duration-500 ease-in-out transform bg-yellow-300  rounded-md ext-base focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-yellow-200 mr-3">
          RESET</button>

        </div>
        </div>
      </div>


    {/* Result画面 */}

      <div className="md:flex">

            {/* スマホ用 */}
      <div className="md:hidden">
      {/* <PhoneResult /> */}

      <>

        {/* うーん...切り替えボタンがなあ... length!!!!!!! */}
          {data.length !== 0 && googleData.length !== 0 &&
        <div id="want" className=" ml-4 z-50 bg-white w-full pt-2" style={styleJSX}> {/* : React.CSSProperties */}
          {/* 上 fixed したい */}
          {/* <div className="cursor-default mt-3 ml-1 tracking-tighter text-gray-400  text-base font-medium">On Click Contents Change!!</div> */}

          <div className="flex">
      <div>
      {/* <div id="google-tab" onClick={onClickGoogleTabs} */}
      <div id="google-tab" onClick={()=>setTabStatus(1)}
       className="bg-white rounded-b-none border-t-2 border-r-2 border-l-2 border-gray-900 cursor-pointer w-20 text-center px-1 py-1 mr-1 text-xs text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-white hover:bg-indigo-900 ">
                Google
                {/* {phoneTabsState &&
                <div className="border-b-4 opacity-0 border-purple-400 ">
                </div>
                } */}
                </div>

      </div>
      <div>
      {/* <div id="rakuten-tab" onClick={onClickRakutenTabs} */}
      <div id="rakuten-tab" onClick={()=>setTabStatus(2)}
       className="bg-white rounded-b-none border-t-2 border-r-2 border-l-2 border-gray-900 cursor-pointer w-20 text-center px-1 py-1 mr-1 text-xs text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-white hover:bg-indigo-900 ">
                Rakuten
                {/* {!phoneTabsState &&
                <div className="border-b-4 opacity-0 border-purple-400 ">
                </div>
                } */}
                </div>

      </div>
      <div>
      {/* <div id="rakuten-tab" onClick={onClickRakutenTabs} */}
      <div id="tsutaya-tab" onClick={()=>setTabStatus(3)}
       className="bg-white rounded-b-none border-t-2 border-r-2 border-l-2 border-gray-900 cursor-pointer w-20 text-center px-1 py-1 mr-1 text-xs text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-white hover:bg-indigo-900 ">
                TSUTAYA
                {/* {!phoneTabsState &&
                <div className="border-b-4 opacity-0 border-purple-400 ">
                </div>
                } */}
                </div>

      </div>
      <div>
      {/* <div id="rakuten-tab" onClick={onClickRakutenTabs} */}
      <div id="kinokuniya-tab" onClick={()=>setTabStatus(4)}
       className="bg-white rounded-b-none border-t-2 border-r-2 border-l-2 border-gray-900 cursor-pointer w-20 text-center px-1 py-1 mr-1 text-xs text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-white hover:bg-indigo-900 ">
                Kinokuniya
                {/* {!phoneTabsState &&
                <div className="border-b-4 opacity-0 border-purple-400 ">
                </div>
                } */}
                </div>

      </div>

          </div>
                <div className="border-t-2 border-gray-900  h-1 w-11/12 pr-2" style={styleJSX}></div>

        </div>
                 }
                {/* {phoneTabsState ?

                <>
                <div className="max-w-screen-md mx-auto">
                <Result data={googleData} apiName="Google"/>
                </div>
                </>

                :
                <>
                <div className=" max-w-screen-md mx-auto">
                  <Result data={data} apiName="Rakuten"/>
                  </div>
                </>
                } */}


                {
                  tabStatus === 1 &&
                  <>
                <div className="max-w-screen-md mx-auto">
                <Result data={googleData} apiName="Google"/>
                </div>
                </>
                }
                {
                  tabStatus === 2 &&
                  <>
                <div className=" max-w-screen-md mx-auto">
                  <Result data={data} apiName="Rakuten"/>
                  </div>
                </>
                }
                {
                  tabStatus === 3 &&
                  <>
                <div className=" max-w-screen-md mx-auto">
                <Result data={tsutayaData} apiName="TSUTAYA"/>
                  </div>
                </>
                }
                {
                  tabStatus === 4 &&
                  <>
                <div className=" max-w-screen-md mx-auto">
                <Result data={kinoArrangeData} apiName="Kinokuniya"/>
                {/* <Result data={kinoData} apiName="Kinokuniya"/> */}
                  </div>
                </>
                }


</>

      </div>
      <div className="hidden md:block max-w-screen-md mx-auto">
      {/* <ResultGoogleTest /> */}
      <Result data={googleData} apiName="Google"/>
      </div>
      <div className="hidden md:block max-w-screen-md mx-auto">
      <Result data={data} apiName="Rakuten"/>
      </div>
      <div className="hidden md:block max-w-screen-md mx-auto">
      <Result data={tsutayaData} apiName="TSUTAYA"/>
      </div>
      <div className="hidden md:block max-w-screen-md mx-auto">
      <Result data={kinoArrangeData} apiName="Kinokuniya"/>
      {/* <Result data={kinoData} apiName="Kinokuniya"/> */}
      </div>

      </div>
      { data != "" ?
      <>
      <div className="flex items-center justify-center w-full">
      <div className="rounded-full  h-20 w-20 hover:opacity-80 mb-3"
      onClick={onClickNextPage}>
      <svg className="object-cover p-3 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
      {/* <svg className="object-cover p-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> */}
        {/* さらに読み込む */}
        </div>

      </div>

      {/* <MyButton onClick={onClickTop}>ウエーに戻る</MyButton> */}
      </>
      :

      <>
        <div className="relative w-full ">

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


      }
      <div className="">

      <Footer />
      <div className="rounded-full bg-yellow-400 h-16 w-16 hover:opacity-80 fixed bottom-5 right-5 " onClick={onClickTop}>
      <svg className="text-white object-cover p-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7"></path></svg>

      </div>
      </div>
    </div>
      </>
  )
}


const SContainer = styled.div`
  margin: 20px 10px 10px 10px;
  height: 50px;
`
const SInput = styled.input`
  height: 20px;
  border-radius: 8px;
  border: solid #81C784 1px;
  outline: none;
  padding: 4px;
  width: 200px;
  `
