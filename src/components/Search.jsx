import axios from 'axios'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { MainContext } from '../providers/Provider'
import { Result } from './Result'
import { API_KEY } from '../api/API_KEY'
import { MyButton } from './atoms/MyButton'
import { Footer } from './Footer'
import { Test } from './Test'
import { ResultGoogleTest } from './ResultGoogleTest'
import { PhoneResult } from './PhoneResult'
import mainImage from '../assets/main.jpg'


export const Search = () => {
  const { data, setData, text, setText, onClickTop, googleData, setGoogleData,targetFlagChangeReset } = useContext(MainContext);

  // console.log(API_KEY.RakutenAPI_KEY)
  // const [text, setText] = useState('');
  // const [data, setData] = useState([]);
  const [page, setPage] = useState(2)

  // const onClickSearch = () => {
  //   const appId = API_KEY.RakutenAPI_KEY
  //   axios.get("https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?", {
  //     params: {format: "json",
  //     keyword: text,
  //     applicationId: appId}
  //   }).then((res) => {
  //     // console.log(...res.data.Items);
  //     const newArray = [...res.data.Items]
  //     setData(newArray);
  //     setPage(2)
  //   })
  // }
  const onClickNextPage = () => {
    onClickRakutenAPINextPage()
    onClickGoogleAPINextPage()
    setPage(page + 1)
    setGooglePage(googlePage + 30)
  }

  const onClickRakutenAPINextPage = () => {
    const appId = API_KEY.RakutenAPI_KEY
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

  const onChangeTarget = (e) => {
    setText(() => e.target.value)
  }





  const onClickSearch = () => {
    onClickGetGoogleAPI();
    onClickGetRakutenAPI();
  }


  const dataArrangeRakutenAPI = (items) => {
    const newArray = [];
    items.map((item, index) => {
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

  const dataArrangeGoogleAPI = (items) => {
    const newArray = [];
    items.map((item, index) => {
      const oneItem = {
        title: item.volumeInfo.title,
        author:
          item.volumeInfo.authors == null ?
          null:
          item.volumeInfo.authors[0] ,
        itemUrl: item.volumeInfo.infoLink,
        imageUrl:
            item.volumeInfo.imageLinks == null ?
           null :
           item.volumeInfo.imageLinks.thumbnail,
    }
    newArray.push(oneItem)
      // console.log(oneItem,index)
    })
    return newArray

  }

  const onClickGetRakutenAPI= ()=>{
    const appId = API_KEY.RakutenAPI_KEY
    axios.get("https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?", {
      params: {format: "json",
      keyword: text,
      applicationId: appId}
    }).then((res) => {
      // console.log(...res.data.Items);
      // console.log(dataArrangeRakutenAPI(res.data.Items))
      // const newArray = [...res.data.Items] //これもいらなくなる！
      setData(dataArrangeRakutenAPI(res.data.Items));
      setPage(2)
    })
  }



  const onClickGetGoogleAPI = () => {
    axios.get('https://www.googleapis.com/books/v1/volumes',{params:{
      q: `intitle:${text}`,
      // startIndex: 1
      maxResults: 30,
      startIndex: 0,
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
      // startIndex: 1
      maxResults: 30,
      startIndex: googlePage,
    }})
    .then((res) => {
      if (res.data.items != null) {
        const newArray = [...googleData, ...dataArrangeGoogleAPI(res.data.items)]
        setGoogleData(newArray);

      }
    })
  }
  const [phoneTabsState, setPhoneTabsState] = useState(true)
  const onClickGoogleTabs = () => {
    setPhoneTabsState(true)
  }
  const onClickRakutenTabs = () => {
    setPhoneTabsState(false)
  }

  // const mainImage = require('../assets/main.jpg');

  return(
    <>
    <div>
      {/* <Test /> */}
      <div className="flex flex-wrap justify-end ml-auto items-en xl:flex-nowrap md:flex-nowrap lg:flex-wrap mt-8 mr-4 mb-5">
        <div className="relative w-72 mr-2">
          <input value={text} onChange={onChangeTarget} type="text" placeholder="検索タイトルを入力！"
           className="bg-gray-200 w-full px-3 py-1 leading-8 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
        </div>
        <div>
        <button onClick={onClickSearch} className="px-6 py-2 font-medium text-white transition duration-500 ease-in-out transform bg-indigo-900  border-blue-600 rounded-md ext-base focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-indigo-500 mr-3">
        SEARCH</button>
        <button onClick={targetFlagChangeReset} className="px-6 py-2 font-medium text-white transition duration-500 ease-in-out transform bg-yellow-300  rounded-md ext-base focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-yellow-200 mr-3">
          RESET</button>

        </div>
      </div>


    {/* Result画面 */}

      <div className="md:flex">
            {/* スマホ用 */}
      <div className="md:hidden">
      {/* <PhoneResult /> */}

      <>

        {/* うーん...切り替えボタンがなあ... */}
          {data.length !== 0 && googleData.length !== 0 &&
        <div className="ml-4">
          {/* <div className="cursor-default mt-3 ml-1 tracking-tighter text-gray-400  text-base font-medium">On Click Contents Change!!</div> */}

          <div className="flex">
      <div>
      <div onClick={onClickGoogleTabs}
       className="rounded-b-none border-t-2 border-r-2 border-l-2 border-gray-900 cursor-pointer w-32 text-center px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-white hover:bg-indigo-900 ">
                Google
                {phoneTabsState &&
                <div className="border-b-4 border-purple-400 ">
                </div>
                }
                </div>

      </div>
      <div>
      <div onClick={onClickRakutenTabs}
       className="rounded-b-none border-t-2 border-r-2 border-l-2 border-gray-900 cursor-pointer w-32 text-center px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-white hover:bg-indigo-900 ">
                Rakuten
                {!phoneTabsState &&
                <div className="border-b-4 border-purple-400 ">
                </div>
                }
                </div>

      </div>

          </div>
                <div className="border-t-2 border-gray-900  h-1 w-11/12 pr-2" style={{"margin-top": "-2px"}}></div>

        </div>
                 }
                {phoneTabsState ?

                <>
                <div className=" max-w-screen-md mx-auto">
                <Result data={googleData} apiName="Google"/>
                </div>
                </>

                :
                <>
                <div className=" max-w-screen-md mx-auto">
                  <Result data={data} apiName="Rakuten"/>
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
        <div className="relative w-full">

        <img src={mainImage} alt="memento time" className="mx-auto"/>
        <div style={{position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"}}>

        <h1 className=" font-black tracking-tighter text-black hover:text-white text-5xl title-font text-center cursor-default
          transition duration-500 ease-in-out transform
        ">Welcome to MEMENTO TIME!
                  <div className="mt-3 ml-1 tracking-tighter text-gray-400  text-base font-medium">Search Books now!</div>
                  </h1>
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
