import axios from 'axios'
import React, { useContext, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import styled from 'styled-components'
import { MainContext } from '../providers/Provider'
import { MyButton } from './atoms/MyButton'

export const Result = () => {
  const { data, setData, setText, configAxios, railsUrl, userId } = useContext(MainContext);

  // const {data} = props

  const [idea, setIdea] = useState('')
  const [targetItem, setTargetItem] = useState({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}})
  const [targetFlag, setTargetFlag] = useState(false)

  const [time, setTime] = useState()

  const targetFlagChange = () => {
    setTargetFlag(() => true);
  }
  const targetFlagChangeReset = () => {
    setTargetFlag(() => false);
    setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}}))
    setData(() => [])
    setText(() => '')
    setIdea(() => (""))
  }

  const onChangeIdea = (e) => {
    setIdea(() => e.target.value)
  }

  const onClickTargetItem = (e) => {
    setTargetItem(() => e)

    targetFlagChange()
  }



  axios.interceptors.request.use(
    config => {

      return config
    }
  )

  axios.interceptors.response.use(response => {

    return response
  })



  const onClickPostRails = () => {
    const trans = time / 1000
    axios.post(`${railsUrl}/books`,{
      booktitle: targetItem.Item.title,
      author: targetItem.Item.author,
      bookimage: targetItem.Item.mediumImageUrl,
      thoughts: idea,
      date: trans,
      user_id: userId
    },configAxios).then((res) => {
      // console.log(res.data);        // レスポンスデータ
      // console.log(res.status);      // ステータスコード
      // console.log(res.statusText);  // ステータステキスト
      // console.log(res.headers);     // レスポンスヘッダ
      // console.log(res.config);      // コンフィグ
      setTargetFlag(() => false);
      setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}}))
      setIdea(() => (""))

    })
    .catch(error => {

    });

  }

  const onChangeTime = (e) => {
    setTime(() => e.target.valueAsNumber)
  }





  const [ show, setShow] = useState(false)
  // モーダル用

  const targetFlagResetOnlyModal = () => {
    setTargetFlag(() => false);
    setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}}))
    setIdea(() => (""))
  }

  return(
    <SContainer>
            <div className=" flex flex-wrap justify-end  mt-4 mr-1">
        <button onClick={targetFlagChangeReset} className="px-6 py-2 font-medium text-white transition duration-500 ease-in-out transform bg-yellow-300  rounded-md ext-base focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-yellow-200">
          RESET</button>
      </div>
      {/* <SButton onClick={targetFlagChangeReset}>リセット！</SButton> */}

      {/* { targetFlag ?
        <SItemTarget>
        <h3>感想入力部</h3>
        <SList>{ targetItem.Item.title }</SList>
        <SImage src={targetItem.Item.mediumImageUrl} />
        <SList>{ targetItem.Item.author }</SList>
        <SInput placeholder="感じたこと"
        value={idea} onChange={onChangeIdea}
        />
        <input type="datetime-local" value={time} onChange={onChangeTime}/>
        <SButton onClick={onClickPostRails}>感想送信</SButton>
      </SItemTarget>

      : <div>
        <br />
        </div>} */}
           <>
        <h1 className="my-20 font-black tracking-tighter text-black hover:text-indigo-700 text-5xl title-font text-center cursor-default
          transition duration-500 ease-in-out transform
        ">Welcome to MEMENTO TIME!
                  <div className="mt-3 ml-1 tracking-tighter text-gray-400  text-base font-medium">Search Books now!</div>
                  </h1>
        </>

        {data !== "" &&


      <ul>
        {data.map((item, index) => {
          return(
            // <SItem key={index}>


        // <div className="text-center ">
        <div className="m-3 inline-block ">


        <div key={index} className="overflow-hidden shadow-lg rounded-lg h-90 w-80 md:w-100 cursor-pointer ml-1 hover:opacity-85">
            <a className="w-full block h-full">
              <div className="h-80">
                <a href={item.Item.itemUrl} target="_blank" rel="noopener noreferrer">
                <img alt="blog photo" src={item.Item.largeImageUrl} className="max-h-full w-full object-cover"/>

                </a>

              </div>
                <div className="bg-white dark:bg-gray-800 w-full p-4">
                    <p className="text-indigo-500 text-md font-medium">
                        Book
                    </p>
                    <div className="h-32 relative p-2">

                    <p className="text-gray-800 dark:text-white text-base font-medium mb-2">
                    { item.Item.title }
                    </p>
                    <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                    { item.Item.author }
                    </p>
                    <div onClick={() => onClickTargetItem(item)}
                     className="object-cover rounded-full bg-indigo-600 h-10 w-10 hover:opacity-80 absolute top-20 right-0">
                    <svg className="text-white object-cover p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>

                    </div>
                    </div>
                </div>
            </a>
        </div>
        </div>

            //   {/* <SList>{ item.Item.title }</SList>
            //   <a href={item.Item.itemUrl} target="_blank" rel="noopener noreferrer"><SImage src={item.Item.mediumImageUrl} /></a>
            //   <SList>{ item.Item.author }</SList>
            //   <SList>{ item.Item.itemUrl }</SList>
            //   <SMyButton onClick={() => onClickTargetItem(item)}>感想をかく</SMyButton> */}

            // {/* </SItem> */}
              );
        })}
      </ul>


      }




      { targetFlag &&
        <>
         {/* <div className="z-50 fixed top-0 left-0 w-full h-full  flex items-center justify-center bg-opacity-50">

        <div className="overflow-hidden shadow-lg rounded-lg h-4/5 w-2/4 md:w-100 cursor-pointer ml-1 hover:opacity-85">

            <a href="#" className="w-full block h-full">
              <div className="h-4/5">
                <img alt="blog photo" src={targetItem.Item.largeImageUrl} className="max-h-full w-full object-cover"/>

              </div>
                <div className="bg-white dark:bg-gray-800 w-full p-4">
                    <p className="text-indigo-500 text-md font-medium">
                        Book
                    </p>
                    <div className="h-32 relative p-2">

                    <p className="text-gray-800 dark:text-white text-base font-medium mb-2">
                    { targetItem.Item.title }
                    </p>
                    <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                    { targetItem.Item.author }
                    </p>
                    <div
                     className="object-cover rounded-full bg-indigo-600 h-10 w-10 hover:opacity-80 absolute top-20 right-0">
                    <svg className="text-white object-cover p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>

                    </div>
                    </div>
                </div>
            </a>
        </div>
         </div> */}

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
                <h2 className="mb-3 text-xs font-semibold tracking-widest text-black uppercase title-font">full in your thought </h2>
                {/* <h1 className="text-2xl font-semibold leading-none tracking-tighter text-black title-font"> A headline to switch your visitors into users. </h1> */}
                {/* <div className="h-80"> */}

                <img alt="blog photo" src={targetItem.Item.largeImageUrl} className="object-cover"/>
                {/* </div> */}
              </div>
              <div className="flex flex-col w-full mx-auto mb-8 lg:px-20 md:mt-0">
                <div className="relative mt-4">
                  <label for="text" className="text-base leading-7 text-blueGray-500">Thought</label>
                  <input value={idea} onChange={onChangeIdea}
                  type="text" name="name" placeholder="感じたこと" className="border-2 border-gray-200 w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
                </div>
                <div className="relative mt-4">
                  <label for="name" className="text-base leading-7 text-blueGray-500">Time</label>
                  <input onChange={onChangeTime} type="datetime-local" className="border-2 border-gray-200 w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
                </div>
                <div className="flex my-6 mt-4">
                  <label className="flex items-center">

                  </label>
                </div>
                <button onClick={onClickPostRails} className="w-full px-16 py-2 mr-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-yellow-300 border-yellow-300 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-yellow-400 ">
                   SEND </button>
                <p className="mx-auto mt-3 text-xs text-blueGray-500"> memento mori..</p>
              </div>
            </div>
          </div>
        </div>

      <div onClick={targetFlagResetOnlyModal} className="z-0 fixed top-0 left-0 w-full h-full bg-gray-800 flex items-center justify-center bg-opacity-50">
        {/* <div className="z-10 w-auto p-1 bg-white"> */}
        </div>
      {/* // </div> */}
      </>
      // :
      // <>
      // <h1 className="my-12 font-black tracking-tighter text-black hover:text-indigo-700 text-5xl title-font text-center cursor-default
      //   transition duration-500 ease-in-out transform
      // ">Welcome to MEMENTO TIME!
      //           <div className="mt-3 ml-1 tracking-tighter text-gray-400  text-base font-medium">Search Books now!</div>
      //           </h1>
      // </>
      }
    </SContainer>
  )
}





const SContainer = styled.div`
  margin: 10px 10px;
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
const SMyButton =styled(MyButton)`
  background-color: #FFCCBC;
  color: #FAFAFA;
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

const SInput = styled.input`
  height: 20px;
  border-radius: 8px;
  border: solid #81C784 1px;
  outline: none;
  padding: 4px;
  width: 400px;
  margin: 10px;
  `

const SItemTarget = styled.div`

  border: solid #81C784 1px;
  background-color: #FAFAFA;
  margin: 10px;
  border-radius: 8px;
  `

const STexst = styled.p`
  color: #81C784;
  display: inline-block;
  margin: 0 auto;
  `
