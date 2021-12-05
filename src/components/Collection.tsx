import axios from 'axios';
import React, { memo, useContext, useEffect, useState } from 'react'
import { MainContext } from '../providers/Provider';
import { Accordion, AccordionButton, Box, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react'
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useHistory } from 'react-router';
import CountupItem from './organisms/collections/CountupItem';
import CreateThoughtsModal from './organisms/collections/CreateThoughtsModal';
import FinishDetail from './organisms/collections/FinishDetail';
import TopButton from './atoms/TopButton'
import BookPaginateItem from './organisms/BookPaginateItem';
import './RightUp.scss';
import Confetti from 'react-confetti'

const Collection = memo(() => {

  // まずuseEffectで同じタイトルだけで、新しい配列を作る
  // ...てなってくるとさ、BookテーブルとThoughtテーブルに分けた方が良さそう....
  // うん、それだな。
  // 分けたよ！！！！！！テーブル！！！！！う！！！！
  // つまりブックの情報だけ返して欲しいのか。
  // URL /books/のgetをこのcollectionに使いたいな。
  // 違ったわ、現状使ってるのはPOSTだわ。
  // つまり、とりあえず/books/のgetしよ
  const { configAxios, railsUrl, userId,loginFlag ,countIsOk, SetCountIsOk,bookCollections, setBookCollections,
    createIsOk, SetCreateIsOk,setTargetItem } = useContext(MainContext)


  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<any>()
  interface Collection {
    id: number
    booktitle: string
    author: string
    bookimage: string
    bookurl: string
    finishcount: number
    date: string
    createdat: string
    updatedat: string
    userid: number
  }
  useEffect(() => checkAuth(), [loginFlag])
  const history = useHistory()
  const checkAuth = () => {
    !loginFlag && history.push("/")
  }

  useEffect(() => {
    axios.get(`${railsUrl}/restricted/books/${userId}`,configAxios
    ).then((res) => {
      console.log(res)
      // setBooksIndex(() => res.data.books)

      if (res.data !== null){
        setBookCollections(() => res.data) //のちにres.data.booksとしてgoから返却させる！！！！
      }

    })
    .catch(error => {
      // console.error(error);
    });
  },[])

  const [finishId, setFinishId] = useState<number>(-1)




  const onClickFinished = (c :Collection) => {
    // onOpen()
    // ここでonOpenじゃなくて、propsとして渡すのをtrueにしたいんだから...
    // // 即時関数！！！
    // (() =>{

    // })()
    if (!countIsOk){
      SetCountIsOk(true)

    }else{
      SetCountIsOk(false)

    }
    setFinishId(c.id)
  }

  const [createCollection, SetCreateCollection] = useState<Collection>({id: -1,booktitle:"",author:"",bookimage:"",
                                                                        bookurl:"",finishcount: -1,date:"",createdat: "", updatedat:"",userid: -1})
  const onClickThoughtCreate = (c :Collection) => {
    if (!createIsOk){
      SetCreateIsOk(true)

    }else{
      SetCreateIsOk(false)

    }
    SetCreateCollection(c)
    // ここで処理すべきものだったからか！？！？
    const Target = {title: c.booktitle, author: c.author, imageUrl: c.bookimage}
    setTargetItem(Target)
    // setFinishId(c.id)
  }
  // const onClickFinishCountUp = (finishId :number) => {
  //   onClose()
  //   axios.get(`${railsUrl}/restricted/books/finish/${finishId}`,configAxios
  //   ).then((res) => {
  //     console.log(res)
  //     // setBooksIndex(() => res.data.books)
  //     onClickGetCollection()
  //     // if (res.data !== null){
  //     //   setBookCollections(() => res.data) //のちにres.data.booksとしてgoから返却させる！！！！
  //     // }

  //   })
  //   .catch(error => {
  //     // console.error(error);
  //   })
  // }

  // ページネーションの設定！！！
  // 変数化 共通化って便利いいいいいいいいい！！！
  const wantPageInit = 10
  const [viewPages, setViewPages] = useState<ViewPages>({startpage: 0 ,endpage: wantPageInit})
  interface ViewPages {
    startpage: number
    endpage: number
  }


  return (
    <div>
      {/* <Confetti
        recycle={false}
      /> */}
        {/* <BookPaginateItem
        viewPages={viewPages}
        setViewPages={setViewPages}
        wantPage={5}/> */}
      {/* <button onClick={onClickGetCollection}>get collection!!!</button> */}
      <h1 className="right-up my-10 font-black tracking-tighter text-black hover:text-indigo-700 text-3xl title-font text-center cursor-default
          transition duration-500 ease-in-out transform
        ">Your Book Collections!
                  <div className="mt-3 ml-1 tracking-tighter text-gray-400  text-base font-medium">Enjoy Books now!</div>
                  </h1>
                  <BookPaginateItem
        viewPages={viewPages}
        setViewPages={setViewPages}
        wantPage={wantPageInit}
        indexArray={bookCollections}
        />
      {bookCollections.length !== 0 &&
        <>
          <div className="text-center">


          {bookCollections.slice(viewPages.startpage, viewPages.endpage).map((c :Collection)=> {
            return(
              // <div className="flex items-center justify-center scrolled" >
              <div className="inline-block scrolled mx-3" >
                <div key={c.id} className="my-4 mx-auto w-80
                  flex items-center justify-center flex-col
                  overflow-hidden shadow-lg rounded-lg cursor-pointer hover:opacity-85 relative
                  ">
                    {c.finishcount > 0 &&
                      <div className="absolute flex text-red-700 top-3 right-2 items-center border-4 p-2 rounded-xl border-red-700" >
                        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path>
                        </svg>
                        <p className="text-lg font-semibold">
                          Finished!
                        </p>
                      </div>

                    }

                    <img src={c.bookimage} alt="NOImage" className=" h-96 w-80 object-scale-down md:object-cover object-center"/>

                    {/* ここからボタンのとこ */}
                    <div onClick={() => onClickThoughtCreate(c)}//onClick={onOpen} //切り離せたか、テスト！！！！
                     className="object-cover rounded-full bg-indigo-600 h-10 w-10 hover:opacity-80 absolute top-80 right-20">
                    <svg className="text-white object-cover p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>

                    </div>
                    <div onClick={() => onClickFinished(c)}
                     className="object-cover rounded-full bg-red-700 h-10 w-10 hover:opacity-80 absolute top-80 right-5">
                    {/* <svg className="text-white object-cover p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> */}
                    <svg className="text-white object-cover p-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>

                    </div>
                    {/* <p className="break-normal text-gray-800 dark:text-white text-sm font-medium mb-2">
                      {c.booktitle}
                    </p> */}

                    <div className="bg-white dark:bg-gray-800 w-full p-4 text-left">
                      <div className="flex justify-end">
                        {/* <p className="text-indigo-500 text-md font-medium">
                            BookTitle
                        </p> */}
                        <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                        { c.finishcount === 0 && <span>未読！！！</span> }
                        { c.finishcount !== 0 && <span className="text-red-700"> 読破！！！</span> }
                        {/* { c.finishcount !== 0 && <span className="text-red-700">{c.finishcount}回 読破！！！</span> } */}
                        </p>

                      </div>
                    {/* <div className="h-32 relative p-2">

                    <p className="text-gray-800 dark:text-white text-base font-medium mb-2">
                    { c.booktitle }
                    </p>
                    <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                    { c.author }
                    </p>


                    </div> */}
                        <div className=" relative">
                        <Accordion defaultIndex={[1]} allowMultiple>
                        <AccordionItem>
                        <AccordionButton>
                        <Box flex="1" textAlign="left">
                        <p className="text-indigo-500 text-md font-medium">
                            BookTitle
                        </p>
                        </Box>
                        <AccordionIcon />

                        </AccordionButton>
                        <AccordionPanel pb={2}>
                        <p className="text-gray-800 dark:text-white text-base font-medium mb-2">
                          { c.booktitle }
                          </p>
                          <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                          { c.author }
                          </p>
                        </AccordionPanel>

                        </AccordionItem>
                        <AccordionItem>
                        <AccordionButton>
                        <Box flex="1" textAlign="left">
                    <p className="text-indigo-500 text-md font-medium">
                            Details
                        </p>
                        </Box>
                        <AccordionIcon />

                        </AccordionButton>
                        <AccordionPanel pb={2}>
                      {/* ようはここをfinishesテーブル叩いて持ってくる... */}
                      {/* どうやって紐づいているのを感知できるかというと...books_idをpropsとして渡そう！ */}
                    {/* <p className="text-gray-800 dark:text-white  font-medium mb-2">
                     <span className="mr-2">
                      読破合計

                     </span>
                     { c.finishcount }回
                    </p> */}
                    <FinishDetail collerctionBookid={c.id} finishcount={c.finishcount}/>
                    {/* <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                    { c.author }
                    </p> */}
                    </AccordionPanel>
                    </AccordionItem>
                    </Accordion>

                    </div>
                </div>
                {/* <div //onClick={() => onClickTargetItem(item)}
                     className="object-cover rounded-full bg-indigo-600 h-10 w-10 hover:opacity-80 absolute top-20 right-0">
                    <svg className="text-white object-cover p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>

                    </div> */}
                </div>
              </div>
            )
          })}
          </div>
        </>
      }
      {/* 今から修正するよ！！！！！！！！！！！！！！！
          切り離せたーーーーーーーーー！！！！！！！！！！
          これから、入力用モーダル作る！！！
      */}
      <CountupItem finishId={finishId}
      // isOk={countIsOk}
      // SetCountIsOk={()=>SetCountIsOk}
      />
      <CreateThoughtsModal collection={createCollection}/>
{/*
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
          <AlertDialogHeader>TEST IS OK??????</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            you want to finish up?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3}
            // onClick={() => onClickFinishCountUp(finishId)}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </> */}
      <TopButton />
    </div>
  )
})

export default Collection
