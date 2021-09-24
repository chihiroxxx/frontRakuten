import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Tooltip, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { MainContext } from '../providers/Provider'
// import IndexItems from './IndexItems'
import BookCalendar from './organisms/BookCalendar'
import EditThoughtsModal from './organisms/index/EditThoughtsModal'
import './Index.scss';
import TotalLabelItem from './organisms/TotalLabelItem'
import BookChartItem from './organisms/BookChartItem'
import TopButton from './atoms/TopButton'
import BookPaginateItem from './organisms/BookPaginateItem'
import IndexItem from './IndexItem'


export const Index = () => {
  const { configAxios, booksIndex, setBooksIndex, loginFlag, setLoginFlag, railsUrl, userId, token,editIsOk, SetEditIsOk,onClickGetIndexRails,showToast } = useContext(MainContext)
  // const { booksIndex }:{booksIndex: Item[]} = useContext(MainContext)

  // const [targetEditItem, setTargetEditItem] = useState<TargetEditItem>({id: 0,date: "", author: "",booktitle: "", bookimage: "", thoughts: ""})
  const [targetEditThoughts, setTargetEditThoughts] = useState<string>()


  // console.log(booksIndex)
  // const onClickTest = () => {
  //   axios.get(`${railsUrl}`,configAxios).then((res) => {
  //   // console.log(res)
  //   setLoginFlag(() => true)
  // })
  // .catch(error => {
  //   // console.error(error);
  //   setLoginFlag(() => false)
  //   });
  // }

  // loginFlag ? onClickGetIndexRails() : console.log("home画面に戻す処理にする") ;
  const [editThought, SetEditThought] = useState<Item>({id: -1, date: "",booktitle:"",author:"",bookimage:"",
                                                                        thoughts:"",page: -1,readingtime: -1,})
  const onClickThoughtCreate = (t: Item) =>{
    if (!editIsOk){
      SetEditIsOk(true)

    }else{
      SetEditIsOk(false)

    }
    SetEditThought(t)
    // ここで処理すべきものだったからか！？！？
    // const Target = {title: c.booktitle, author: c.author, imageUrl: c.bookimage}
    // setTargetItem(Target)

  }
  // const onClickTargetEdit = (e: Item) => {
  //     // console.log(e)
  //     setTargetEditItem(e)
  //     setTargetEditThoughts(e.thoughts)
  // }
  // // onClickTargetEditはいじらない


  // const onChangeTargetEditThought = (e: any)=>{
  //   // setTargetEditItem({item: {thoughts: e.target.value}})
  //   setTargetEditThoughts(e.target.value)
  // }



  // let deleteId : number
  const [deleteId, setDeleteId] = useState<number>(0)
  const onClickTargetDelete =  (e: Item)  => {
    onOpen()
    // うーん....削除しちゃうなあ....
    // console.log(e.id)

    setDeleteId(e.id)
    // const deleteId = e.id

    // onClickDeleteRails(deleteId);
  }


  const onClickDeleteRails = (deleteId: number) =>{
      axios.delete(`${railsUrl}/restricted/thoughts/${deleteId}`,configAxios).then((res) => {
         setTargetEditThoughts("")

       }).then(()=>{
         // 削除完了のフラッシュメッセージ出す！！！！！！！
         // あとはreload
         onClickGetIndexRails()
         onClose()
         showToast("削除しました")
       })
       .catch(error => {
         // console.error(error);
       });

  }

  const fileDownload = require('js-file-download');

  const onClickGetCsvRails = () => {
    axios.get(`${railsUrl}/restricted/thoughts/csv/${userId}`,
    {headers: {
      Authorization: `Bearer ${token()}`,
    },
    responseType: "blob"
  },
    /* {headers: { 'X-Requested-With': 'XMLHttpRequest'}, withCredentials: true,
     params: {user_id: userId}} */
    ).then((res) => {
      const blob = new Blob([res.data], {
        type: res.data.type
      });
      // console.log(res)
      // fileDownload(res.data, "bookIndex.csv")
      fileDownload(blob, "index.csv")
    })
    .catch(error => {
      // console.error(error);
    });

  }
  const history = useHistory()

  useEffect(() => onClickGetIndexRails(), [])
  useEffect(() => onClickGetIndexRails(), [userId])
  useEffect(() => checkAuth(), [loginFlag])

  const checkAuth = () => {
    !loginFlag && history.push("/")
  }

  // const { id } = useParams()

  // 共通化したくないからProviderにあげないことにする
  // const [targetFlag, setTargetFlag] = useState(false)

  // const targetFlagResetOnlyModal = () => {
  //   setTargetFlag(() => false);
  //   setTargetEditItem({id: 0,date: "", author: "",booktitle: "", bookimage: "", thoughts: ""})
  //   setTargetEditThoughts("")
  // }








  // const mapContent =

  interface Item{
    id: number,
    date: string,
    booktitle: string,
    author: string,
    bookimage: string,
    thoughts: any,
    page?: number,
    readingtime?: number,
    // itemUrl: string,
    // largeImageUrl: string


  }

  // interface TargetEditItem {
  //   id: number,
  //   date: string,
  //   booktitle: string,
  //   author: string,
  //   bookimage: string,
  //   thoughts: any,
  //   // title: string;
  //   // author: string;
  //   // imageUrl: string;
  //   // itemUrl: string;
  // }


  // console.log(new Date(booksIndex[0].date))


  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<any>()

  useEffect(() => calendarDate(),[booksIndex])

  const calendarDate = () => {
    // let arr: [string]
    if (booksIndex.length !== 0){
      const arr = booksIndex.map((i: Item) => {
        const arrangDate  = new Date(i.date)
        return(`${arrangDate.getFullYear()}${arrangDate.getMonth()}${arrangDate.getDate()}`)
      })
      // booksIndex.map((item: Item) => {
      //   arr += item.date
      //   // const newArray = [...googleData, ...dataArrangeGoogleAPI(res.data.items)]
      // })
      // console.log(arr)
      setIndexDateArr(arr)
    }
  }
  const [indexDateArr, setIndexDateArr] = useState([])





  // #scrolled

  const cb = (entris:any, observer:any) => {
    // console.log("intersecting!!!?")
    entris.forEach((entry:any) => {
      if(entry.isIntersecting) {
        // console.log("inview!!")
        // console.log(entry.target)
        entry.target.classList.add("viewing")
        // entry.target.classList.remove("invisible")

      }else{
        // console.log("outview!!")
        // entry.target.classList.add("invisible")


        // entry.target.classList.remove("testclass") //これつけるとズーーーっと出たり入ったりする
        // つまり、一覧だから、初回に入るときにエフェクトがあればいいかな？と思う
        // 見づらいかなって

      }
    })
  }
  const options = {
    // rootMargin: "-300px  0px"
  }
  const io = new IntersectionObserver(cb, options)
  if(document.querySelector('.scrolled')){
    const els = document.querySelectorAll('.scrolled')
    els.forEach(el => io.observe(el))
    // io.observe(document.querySelector('.scrolled')!)

  }
  // if(document.querySelector('#scrolled')){
  //   io.observe(document.querySelector('#scrolled')!)

  // }





  // const getTotalTest = () => {
  //   axios.get(`${railsUrl}/restricted/thoughts/total/${userId}`,configAxios
  //   ).then((res) => {
  //     // console.log(res)
  //   })
  //   .catch(error => {
  //   });
  // }



  // const starttestpage = 0

  const wantPageInit = 5
  const [viewPages, setViewPages] = useState<ViewPages>({startpage: 0 ,endpage: wantPageInit})
  interface ViewPages {
    startpage: number
    endpage: number
  }
  return(
    <>
      <>
      <div>
        {/* <BookPaginateItem
        viewPages={viewPages} setViewPages={setViewPages}/> */}
        {/* <button onClick={getTotalTest} >get total test!!!!</button> */}
        <h1 className="my-10 font-black tracking-tighter text-black hover:text-indigo-700 text-3xl title-font text-center cursor-default
          transition duration-500 ease-in-out transform
        ">Awesome YOUR THOUGHTS!
                  <div className="mt-3 ml-1 tracking-tighter text-gray-400  text-base font-medium">Enjoy Books now!</div>
                  </h1>
                  <div className="mb-3">
<nav className="flex flex-wrap items-center justify-center text-base md:ml-auto md:mr-auto">
<Tooltip label="インデックスをリロードします！" placement="top"
                bg="gray.600" closeDelay={500}>
                  <div onClick={onClickGetIndexRails}
                   className="flex items-center cursor-pointer mr-5 hover:text-yellow-400 transition duration-500 ease-in-out transform">
                    <svg className=" w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    <div className="px-4 py-1 mr-1 text-base text-blueGray-500  rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ">
                      Reload</div>

                  </div>
                  </Tooltip>
                  {/* <Tooltip label="読んだコレクションを見てみましょう！" placement="top"
                bg="gray.600" closeDelay={500}>
                  <div //onClick={onClickGetIndexRails}
                   className="flex items-center cursor-pointer mr-5 hover:text-yellow-400 transition duration-500 ease-in-out transform">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                    <div className="px-4 py-1 mr-1 text-base text-blueGray-500  rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ">
                      MyCollections</div>

                  </div>
                  </Tooltip> */}
                  <Tooltip label="CSVをダウンロードします！" placement="top"
                bg="gray.600" //defaultIsOpen
                closeDelay={500}>
                  <div onClick={onClickGetCsvRails}
                  className="flex items-center cursor-pointer mr-5 hover:text-yellow-400 transition duration-500 ease-in-out transform">
                  <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  <div className="px-4 py-1 mr-1 text-base text-blueGray-500  rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ">
                    Get CSV</div>

                  </div>
                  </Tooltip>
                </nav>
                  </div>
                  <BookPaginateItem
        viewPages={viewPages}
        setViewPages={setViewPages}
        wantPage={wantPageInit}
        // テスト！！<- 共通化できた！！！
        indexArray={booksIndex}
        />
      </div>
        </>

      {/* { targetEditThoughts ?
      // ここか、モーダル...
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


        <img alt="NO Image..." src={targetEditItem.bookimage} className="h-56 w-44 object-cover mx-auto"/>

      </div>
      <div className="flex flex-col w-full mx-auto mb-8 lg:px-20 md:mt-0">
        <div className="relative mt-4">
          <label htmlFor="text" className="text-base leading-7 text-blueGray-500">Thought</label>
          <textarea value={targetEditThoughts} onChange={onChangeTargetEditThought}
           name="name" placeholder="感じたこと" className="resize-none h-36 border-2 border-gray-200 w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
        </div>
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

</div>

        </>

      : false} */}



      <div className="md:flex justify-between flex-row-reverse">
      <div className="text-xs w-80 md:mr-6 mx-auto">
          {/* <TotalLabelItem title="weekly" indexDateArr={indexDateArr}/> */}
          <TotalLabelItem title="Monthly"
          //  indexDateArr={indexDateArr}
          />
          <div className="mb-5">
          <BookChartItem />

          </div>
          <BookCalendar indexDateArr={indexDateArr}/>
        </div>
      {/* あー、これが再レンダリングしてほしくないってことか！！！ */}
      <ul>
  {/* ------------------------------------------------------------------------------------------------ */}
        {/* { mapContent } */}
        {/* <IndexItems booksIndex={booksIndex}/> */}
        {/* {booksIndex.length !== 0 && <>
        {
          (()=>{
            for (let i = 0; i <= 10; i++) {
              return(
                <div>{booksIndex[i].booktitle}</div>
              )
              console.log('一歩西に歩く');
            }
          })()
        }

        </>} */}
        <div className="">
        <EditThoughtsModal thought={editThought}/>

        </div>
          {/* INDEX ITEM コンポーネント化のテスと！ */}
          {/* できたあああああ！！！ */}
          <IndexItem
            viewPages={viewPages}
            indexArray={booksIndex}
            onClickThoughtCreate={onClickThoughtCreate}
            onClickTargetDelete={onClickTargetDelete}
          />

        {/* これだ！！！sliceでページネーション の足掛かりになりそう！！！！<-できたよ！！ */}
        {
  //       booksIndex.slice(viewPages.startpage, viewPages.endpage).map((item: Item) => {
  //   // const dateStr = new Date(item.date).toDateString()

  //   return(
  //     <div className="flex items-center justify-center scrolled" >{/*id="scrolled"*/}


  //     <div className="my-4 mx-auto
  //     flex items-center justify-center">


  // <div key={item.id} className="overflow-hidden shadow-lg rounded-lg cursor-pointer ml-1 hover:opacity-85
  // md:w-4/5 w-72"
  // //  style={{width: "800px"}}
  //  >
  //     <div className="md:flex">

  //       <div className="h-40 md:h-full md:max-h-full md:w-2/5 cursor-default bg-gray-100">

  //         <img alt="NO Image..." src={item.bookimage} className=" max-h-full w-80 object-scale-down md:object-cover object-center"/>



  //       </div>


  //       <div className="h-full  relative"
  //       style={{width: "550px"}}
  //       >

  //         <div className="h-80 w-72 ml-2 md:m-0 bg-white dark:bg-gray-800 md:w-full  p-4 cursor-default flex justify-between flex-col">
  //             <div className="h-24">
  //             <p className="text-indigo-500 text-md font-medium">
  //                 Book Title
  //             </p>
  //             <div className="mb-2 md:mb-0  p-2  md:w-full">

  //                 <p className="break-normal text-gray-800 dark:text-white text-sm font-medium mb-2">
  //                 { item.booktitle }
  //                 </p>
  //                 <p className="text-gray-400 dark:text-gray-300 font-light text-sm">
  //                 { item.author }
  //                 </p>
  //             </div>
  //             </div>
  //             <div className="h-52">
  //                 <p className="text-indigo-500 text-md font-medium">
  //                     Your Thought
  //                 </p>
  //                 <div className="flex flex-col justify-between h-44 p-2">
  //                   <div className=" text-gray-800 dark:text-white text-md font-medium mb-8 break-all">
  //                   { item.thoughts }
  //                   </div>
  //                   <div>

  //                     <div className="flex  mb-1">
  //                     <p className="text-gray-800 dark:text-white text-base font-medium">
  //                     { item.page }<span className="text-yellow-400  text-xs pl-1 pr-4">Page</span>
  //                     </p>
  //                     <p className="text-gray-800 dark:text-white text-base font-medium">
  //                     { item.readingtime }<span className="text-yellow-400 text-xs pl-1">Minutes (Reading Time)</span>
  //                     </p>
  //                     </div>
  //                     <p className=" text-gray-400 dark:text-gray-300 font-light text-md">
  //                     { item.date }

  //                     </p>
  //                   </div>

  //                 </div>
  //             </div>
  //         </div>

  //             <div onClick={() => onClickThoughtCreate(item)}
  //             //onClick={() => onClickTargetEdit(item)}
  //              className="mr-1 object-cover rounded-full bg-indigo-600 h-10 w-10 hover:opacity-80
  //               absolute bottom-6 left-44 md:left-auto md:bottom-8 md:right-20 "
  //               // style={{right: "300px"}}
  //               >
  //             <svg className="text-white object-cover p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>

  //             </div>

  //              <div onClick={() => onClickTargetDelete(item)}
  //              className="object-cover rounded-full bg-red-600 h-10 w-10 hover:opacity-80
  //               absolute bottom-6 left-56 md:left-auto md:bottom-8 md:right-8 "
  //               // style={{right: "300px"}}
  //               >
  //                 <svg className="text-white object-cover p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>

  //             </div>
  //       </div>
  //     </div>
  // </div>
  // </div>
  //     </div>

  //       );
  // })
  }
   {/* ------------------------------------------------------------------------------------------------ */}
      </ul>

      </div>
      <TopButton />
{/*
      <div className="rounded-full bg-yellow-400 h-16 w-16 hover:opacity-80 fixed bottom-5 right-5 " onClick={onClickTop}>
      <svg className="text-white object-cover p-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7"></path></svg>

      </div> */}
      {/* <SButton onClick={onClickTop}>ウエーに戻る</SButton> */}
      <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>It's DELETE?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete it?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={() => onClickDeleteRails(deleteId)}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </>
    </>
  )
}
