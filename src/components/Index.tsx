import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Tooltip, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { ChangeEvent, memo, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
// import './Index.scss';
import './RightUp.scss';
import { MainContext } from '../providers/Provider'
// import IndexItems from './IndexItems'
import BookCalendar from './organisms/BookCalendar'
import EditThoughtsModal from './organisms/index/EditThoughtsModal'

import TotalLabelItem from './organisms/TotalLabelItem'
import BookChartItem from './organisms/BookChartItem'
import TopButton from './atoms/TopButton'
import BookPaginateItem from './organisms/BookPaginateItem'
import IndexItem from './IndexItem'
import DeleteThoughtsDialog from './organisms/index/DeleteThoughtsDialog'


export const Index = memo(() => {
  const { configAxios, booksIndex, setBooksIndex, loginFlag, setLoginFlag, railsUrl, userId, token,editIsOk, SetEditIsOk,onClickGetIndexRails,showToast } = useContext(MainContext)
  // const { booksIndex }:{booksIndex: Item[]} = useContext(MainContext)

  // const [targetEditItem, setTargetEditItem] = useState<TargetEditItem>({id: 0,date: "", author: "",booktitle: "", bookimage: "", thoughts: ""})
  // const [targetEditThoughts, setTargetEditThoughts] = useState<string>()



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
// テスト！！！！！

const [ daialogFlag, setDaialogFlag ] = useState(false)
// テスト！！！！！


  const [deleteId, setDeleteId] = useState<number>(0)
  const onClickTargetDelete =  (e: Item)  => {
    // onOpen() //ここを...変えれば良さそう！？

    (() => {
      // onOpen()
      // ここでonOpenじゃなくて、propsとして渡すのをtrueにしたいんだから...
      // // 即時関数！！！
      // (() =>{

      // })()
      if (!daialogFlag){
        setDaialogFlag(true)

      }else{
        setDaialogFlag(false)

      }
      // setFinishId(c.id)
    })()


    // うーん....削除しちゃうなあ....
    // console.log(e.id)

    setDeleteId(e.id)
    // const deleteId = e.id

    // onClickDeleteRails(deleteId);
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


  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<any>()

  useEffect(() => calendarDate(),[booksIndex])
  // useEffect(() => calendarDate(),[])

  // 無限レンダリング注意！！！！
  // 無限レンダリング注意！！！！
  // 無限レンダリング注意！！！！
  // 無限レンダリング注意！！！！
  // 無限レンダリング注意！！！！
  // 無限レンダリング注意！！！！
  // 無限レンダリング注意！！！！
  // これが原因だわuseEffect(() => onClickGetIndexRails(),このディペンシーズで、ずーーーーーーーっっとサーバーに通信し続けて、[booksIndex])
  // で、コンポーネントが無限レンダリングになってた。
  useEffect(() => onClickGetIndexRails(),[])

  const calendarDate = () => {
    // let arr: [string]
    if (booksIndex.length !== 0){
      const arr = booksIndex.map((i: Item) => {
        const arrangDate  = new Date(i.date)
        return(`${arrangDate.getFullYear()}${arrangDate.getMonth()}${arrangDate.getDate()}`)
      })

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

  const wantPageInit = 5
  const [viewPages, setViewPages] = useState<ViewPages>({startpage: 0 ,endpage: wantPageInit})
  interface ViewPages {
    startpage: number
    endpage: number
  }
  return(
    <>
      <>
      <div className="">
        {/* <BookPaginateItem
        viewPages={viewPages} setViewPages={setViewPages}/> */}
        {/* <button onClick={getTotalTest} >get total test!!!!</button> */}
        <h1 className="right-up my-10 font-black tracking-tighter text-black hover:text-indigo-700 text-3xl title-font text-center cursor-default
          transition duration-500 ease-in-out transform
        ">Awesome YOUR THOUGHTS!
                  <div className="mt-3 ml-1 tracking-tighter text-gray-400  text-base font-medium">Enjoy Books now!</div>
                  </h1>
                  <div className="mb-3">
<nav className="flex flex-wrap items-center justify-center text-base md:ml-auto md:mr-auto">
<Tooltip label="インデックスをリロードします！" placement="top"
                bg="gray.600" closeDelay={500}>
                  <div onClick={onClickGetIndexRails}
                   className="down-up flex items-center cursor-pointer mr-5 hover:text-yellow-400 transition duration-500 ease-in-out transform">
                    <svg className=" w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    <div className="px-4 py-1 mr-1 text-base text-blueGray-500  rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ">
                      Reload</div>

                  </div>
                  </Tooltip>

                  <Tooltip label="CSVをダウンロードします！" placement="top"
                bg="gray.600" //defaultIsOpen
                closeDelay={500}>
                  <div onClick={onClickGetCsvRails}
                  className="down-up flex items-center cursor-pointer mr-5 hover:text-yellow-400 transition duration-500 ease-in-out transform">
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

      <ul>

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


      </ul>

      </div>
      <TopButton />
        {/* よし！deleteダイアログもコンポーネント化できた！！ */}
      <DeleteThoughtsDialog
        deleteId={deleteId}
        daialogFlag={daialogFlag}
        setDaialogFlag={setDaialogFlag}
      />
      {/* <>
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
      </> */}
    </>
  )
})
