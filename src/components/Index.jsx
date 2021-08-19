import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { MainContext } from '../providers/Provider'

export const Index = () => {
  const { configAxios, booksIndex, setBooksIndex, loginFlag, setLoginFlag, railsUrl, onClickTop, userId } = useContext(MainContext)

  const [targetEditItem, setTargetEditItem] = useState({})
  const [targetEditThoughts, setTargetEditThoughts] = useState()

  const onClickGetIndexRails = () => {
    axios.get(`${railsUrl}/books`,{headers: { 'X-Requested-With': 'XMLHttpRequest'}, withCredentials: true, params: {user_id: userId}}).then((res) => {
      setBooksIndex(() => res.data.books)
    })
    .catch(error => {
      // console.error(error);
    });
  }

  const onClickTest = () => {
    axios.get(`${railsUrl}`,configAxios).then((res) => {
    // console.log(res)
    setLoginFlag(() => true)
  })
  .catch(error => {
    // console.error(error);
    setLoginFlag(() => false)
    });
  }

  // loginFlag ? onClickGetIndexRails() : console.log("home画面に戻す処理にする") ;

  const onClickTargetEdit = (e) => {
      // console.log(e)
      setTargetEditItem(e)
      setTargetEditThoughts(e.thoughts)
  }
  // onClickTargetEditはいじらない


  const onChangeTargetEditThought = (e)=>{
    // setTargetEditItem({item: {thoughts: e.target.value}})
    setTargetEditThoughts(e.target.value)
  }


  const onClickEditPostRails = () =>{
    axios.put(`${railsUrl}/books/${targetEditItem.id}`,{
      // id: targetEditItem.item.id,
      thoughts: targetEditThoughts
    },configAxios).then((res) => {
      // console.log(res.data);        // レスポンスデータ
      // console.log(res.status);      // ステータスコード
      // console.log(res.statusText);  // ステータステキスト
      // console.log(res.headers);     // レスポンスヘッダ
      // console.log(res.config);      // コンフィグ

      // setTargetFlag(() => false);
      // setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}}))
      // setIdea(() => (""))
      setTargetEditThoughts()

    })
    .catch(error => {
      // console.error(error);
    });


  }
  const fileDownload = require('js-file-download');

  const onClickGetCsvRails = () => {
    axios.get(`${railsUrl}/csv`,{headers: { 'X-Requested-With': 'XMLHttpRequest'}, withCredentials: true, params: {user_id: userId}}).then((res) => {
      fileDownload(res.data, "bookIndex.csv")
    })
    .catch(error => {
      // console.error(error);
    });

  }
  const history = useHistory()

  useEffect(() => onClickGetIndexRails(), [])
  useEffect(() => checkAuth(), [loginFlag])

  const checkAuth = () => {
    !loginFlag && history.push("/")
  }

  const { id } = useParams()

  // 共通化したくないからProviderにあげないことにする
  const [targetFlag, setTargetFlag] = useState(false)

  const targetFlagResetOnlyModal = () => {
    setTargetFlag(() => false);
    setTargetEditItem({})
    setTargetEditThoughts("")
  }

  return(
    <>
      <>
      <div>

        <h1 className="my-10 font-black tracking-tighter text-black hover:text-indigo-700 text-3xl title-font text-center cursor-default
          transition duration-500 ease-in-out transform
        ">Awesome YOUR THOUGHTS!
                  <div className="mt-3 ml-1 tracking-tighter text-gray-400  text-base font-medium">Enjoy Books now!</div>
                  </h1>
                  <div className="mb-3">
<nav class="flex flex-wrap items-center justify-center text-base md:ml-auto md:mr-auto">
                  <div onClick={onClickGetIndexRails}
                   className="flex items-center cursor-pointer mr-5 hover:text-yellow-400 transition duration-500 ease-in-out transform">
                  <svg className=" w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  <div class="px-4 py-1 mr-1 text-base text-blueGray-500  rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ">
                    Reload</div>

                  </div>
                  <div onClick={onClickGetCsvRails}
                  className="flex items-center cursor-pointer mr-5 hover:text-yellow-400 transition duration-500 ease-in-out transform">
                  <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  <div class="px-4 py-1 mr-1 text-base text-blueGray-500  rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ">
                    Get CSV</div>

                  </div>
                </nav>
                  </div>
      </div>
        </>

      {/* <button onClick={onClickGetIndexRails} className="px-6 py-2 font-medium text-white transition duration-500 ease-in-out transform bg-indigo-900  border-blue-600 rounded-md ext-base focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-indigo-500">
          UpDate</button>
      <SButton onClick={onClickGetIndexRails}>一覧更新！！！</SButton>
      <SButton onClick={onClickGetCsvRails}>CSV出力！！！</SButton>

      <SButton onClick={onClickTest}>test！！！</SButton> */}
      { targetEditThoughts ?
        <>
          <div className="z-50 fixed top-0 left-0 w-full h-full  flex items-center justify-center bg-opacity-50">

<div className="overflow-scroll h-4/5 container items-center px-5 py-12 lg:px-20 z-50">
    <div className="bg-white w-full px-5 mx-auto border rounded-lg shadow-xl lg:px-0 text-blueGray-500 lg:w-1/2" aria-hidden="false" aria-describedby="modalDescription" role="dialog">
      <div className="flex items-center justify-end px-6 pt-4 pb-2">
        <button onClick={targetFlagResetOnlyModal}
        className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-blueGray-600 focus:outline-none" type="button" aria-label="Close" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M10 10l4 4m0 -4l-4 4"></path>
          </svg>
        </button>
      </div>
      <div className="flex flex-col w-full mx-auto lg:px-20 text-center">
        <h2 className="mb-3 text-xs font-semibold tracking-widest text-black uppercase title-font">edit your thought </h2>
        {/* <h1 className="text-2xl font-semibold leading-none tracking-tighter text-black title-font"> A headline to switch your visitors into users. </h1> */}
        {/* <div className="h-80"> */}

        <img alt="blog photo" src={targetEditItem.bookimage} className="object-cover"/>
        {/* </div> */}
      </div>
      <div className="flex flex-col w-full mx-auto mb-8 lg:px-20 md:mt-0">
        <div className="relative mt-4">
          <label for="text" className="text-base leading-7 text-blueGray-500">Thought</label>
          <input value={targetEditThoughts} onChange={onChangeTargetEditThought}
          type="text" name="name" placeholder="感じたこと" className="border-2 border-gray-200 w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
        </div>
        {/* <div className="relative mt-4">
          <label for="name" className="text-base leading-7 text-blueGray-500">Time</label>
          <input type="datetime-local" className="border-2 border-gray-200 w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
        </div> */}
        <div className="flex my-6 mt-4">
          <label className="flex items-center">

          </label>
        </div>
        <button onClick={onClickEditPostRails} className="w-full px-16 py-2 mr-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-yellow-300 border-yellow-300 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-yellow-400 ">
           UPDATE </button>
        <p className="mx-auto mt-3 text-xs text-blueGray-500"> memento mori..</p>
      </div>
    </div>
  </div>
</div>

<div onClick={targetFlagResetOnlyModal} className="z-0 fixed top-0 left-0 w-full h-full bg-gray-800 flex items-center justify-center bg-opacity-50">
{/* <div className="z-10 w-auto p-1 bg-white"> */}
</div>




        {/* <SInput
        value={targetEditThoughts} onChange={onChangeTargetEditThought}
        />
        <SButton onClick={onClickEditPostRails}>へんしゅ送信</SButton> */}
        </>

      : false}


      {/* あー、これが再レンダリングしてほしくないってことか！！！ */}
      <ul>
        {booksIndex.map((item) => {
          return(
            <div className="flex items-center justify-center">

            <div className="my-4 mx-auto
            flex items-center justify-center">


        <div key={item.id} className="overflow-hidden shadow-lg rounded-lg cursor-pointer ml-1 hover:opacity-85
        w-4/5"
        //  style={{width: "800px"}}
         >
            <div className="flex">

              <div className="max-h-full w-2/5 cursor-default">
                {/* <a href={item.Item.itemUrl} target="_blank" rel="noopener noreferrer"> */}
                <img alt="blog photo" src={item.bookimage} className="max-h-full w-80 object-cover"/>

                {/* </a> */}

              </div>


              <div className="h-full  relative"
              style={{width: "550px"}}
              >

                <div className="bg-white dark:bg-gray-800 w-full h-80 p-4 cursor-default">
                    <p className="text-indigo-500 text-md font-medium">
                        Book Title
                    </p>
                    <div className="h-32 p-2">

                    <p className="text-gray-800 dark:text-white text-base font-medium mb-2">
                    { item.booktitle }
                    </p>
                    <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                    { item.author }
                    </p>
                    </div>
                    <p className="text-indigo-500 text-md font-medium">
                        Your Thought
                    </p>
                    <div className="h-32 p-2">
                    <p className="text-gray-800 dark:text-white text-base font-medium mb-8">
                    { item.thoughts }
                    </p>
                    <p className=" text-gray-400 dark:text-gray-300 font-light text-md">
                    { item.date }
                    </p>

                    </div>
                </div>
                    <div onClick={() => onClickTargetEdit(item)}
                     className="object-cover rounded-full bg-indigo-600 h-10 w-10 hover:opacity-80 absolute bottom-8 right-8">
                    <svg className="text-white object-cover p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>

                    </div>
              </div>
            </div>
        </div>
        </div>
            </div>
            // <SItem key={item.id}>
            //   <SList>{ item.booktitle }</SList>
            //   <SImage src={item.bookimage} />
            //   <SList>{ item.author }</SList>
            //   <SList>感想： { item.thoughts }</SList>
            //   <SList>読んだ時間： { item.date }</SList>
            //   <SButton onClick={() => onClickTargetEdit(item)}>編集する！！</SButton>
            // </SItem>
              );
        })}
      </ul>
      <div className="rounded-full bg-yellow-400 h-16 w-16 hover:opacity-80 fixed bottom-5 right-5 " onClick={onClickTop}>
      <svg className="text-white object-cover p-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7"></path></svg>

      </div>
      {/* <SButton onClick={onClickTop}>ウエーに戻る</SButton> */}
    </>
  )
}


const SContainer = styled.div`
  margin: 10px 10px;
  height: 100vh;
`



const SButton = styled.button`
  background-color: #FFCCBC;
  border: none;
  padding: 8px;
  border-radius: 8px;
  margin: 0 10px;
  color: #FAFAFA;
  /* border: solid #81C784 1px; */
  &:hover {
    cursor: pointer;
    background-color: #FFF;
    color: #FFCCBC;
  }
  `


const SItem = styled.div`
  height: 100%;
  border: solid #81C784 1px;
  background-color: #FAFAFA;
  margin: 10px;
  border-radius: 8px;
  padding: 8px;
  /* box-shadow: 5px 5px 5px black; */
`
const SList = styled.li`
  list-style: none;
  text-align: center;
  padding: 10px;
  /* color: #81C784;
  font-weight: bold; */
`

const SImage = styled.img`
  margin: 0 auto;
  display: block;
`
const SInput = styled.input`
  height: 20px;
  border-radius: 8px;
  border: solid #81C784 1px;
  outline: none;
  padding: 4px;
  width: 400px;
  margin: 10px;
  `
