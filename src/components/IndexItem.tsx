import React, { memo, useContext } from 'react'
// import { MainContext } from '../providers/Provider';
import './Index.scss';


interface Props {
  viewPages: ViewPages
  indexArray: Array<any>
  onClickThoughtCreate: (item: Item)=>void
  onClickTargetDelete: (item: Item)=>void

}

interface ViewPages {
  startpage: number
  endpage: number
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
}





const IndexItem = memo((props:Props ) => {
  // const { configAxios, booksIndex, setBooksIndex, loginFlag, setLoginFlag, railsUrl, userId, token,editIsOk, SetEditIsOk,onClickGetIndexRails,showToast } = useContext(MainContext)
  const {viewPages,indexArray,onClickThoughtCreate,onClickTargetDelete} =props
  // コンポーネント化！できた！！


  console.log("レンダリング")
  return (
    <>
     {indexArray.slice(viewPages.startpage, viewPages.endpage).map((item: Item) => {
    // const dateStr = new Date(item.date).toDateString()

    return(
      <div className="flex items-center justify-center scrolled" >{/*id="scrolled"*/}
      {/* <div className="flex items-center justify-center"> */}

      <div className="my-4 mx-auto
      flex items-center justify-center">


  <div key={item.id} className="overflow-hidden shadow-lg rounded-lg cursor-pointer ml-1 hover:opacity-85
  md:w-4/5 w-72"
  //  style={{width: "800px"}}
   >
      <div className="md:flex">

        <div className="h-40 md:h-full md:max-h-full md:w-2/5 cursor-default bg-gray-100">
          {/* <a href={item.Item.itemUrl} target="_blank" rel="noopener noreferrer"> */}
          <img alt="NO Image..." src={item.bookimage} className=" max-h-full w-80 object-scale-down md:object-cover object-center"/>

          {/* </a> */}

        </div>


        <div className="h-full  relative"
        style={{width: "550px"}}
        >

          <div className="h-80 w-72 ml-2 md:m-0 bg-white dark:bg-gray-800 md:w-full  p-4 cursor-default flex justify-between flex-col">
              <div className="h-24">
              <p className="text-indigo-500 text-md font-medium">
                  Book Title
              </p>
              <div className="mb-2 md:mb-0  p-2  md:w-full">

                  <p className="break-normal text-gray-800 dark:text-white text-sm font-medium mb-2">
                  { item.booktitle }
                  </p>
                  <p className="text-gray-400 dark:text-gray-300 font-light text-sm">
                  { item.author }
                  </p>
              </div>
              </div>
              <div className="h-52">
                  <p className="text-indigo-500 text-md font-medium">
                      Your Thought
                  </p>
                  <div className="flex flex-col justify-between h-44 p-2">
                    <div className=" text-gray-800 dark:text-white text-md font-medium mb-8 break-all">
                    { item.thoughts }
                    </div>
                    <div>

                      <div className="flex  mb-1">
                      <p className="text-gray-800 dark:text-white text-base font-medium">
                      { item.page }<span className="text-yellow-400  text-xs pl-1 pr-4">Page</span>
                      </p>
                      <p className="text-gray-800 dark:text-white text-base font-medium">
                      { item.readingtime }<span className="text-yellow-400 text-xs pl-1">Minutes (Reading Time)</span>
                      </p>
                      </div>
                      <p className=" text-gray-400 dark:text-gray-300 font-light text-md">
                      { item.date }
                      {/* { item.date } */}
                      {/* { (item.date).toDateString() } */}
                      </p>
                    </div>

                  </div>
              </div>
          </div>
          {/* ここか！！Editボタン！！ 何を送ってるかというと.... */}
              <div onClick={() => onClickThoughtCreate(item)}
              //onClick={() => onClickTargetEdit(item)}
               className="mr-1 object-cover rounded-full bg-indigo-600 h-10 w-10 hover:opacity-80
                absolute bottom-6 left-44 md:left-auto md:bottom-8 md:right-20 "
                // style={{right: "300px"}}
                >
              <svg className="text-white object-cover p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>

              </div>

               <div onClick={() => onClickTargetDelete(item)}
               className="object-cover rounded-full bg-red-600 h-10 w-10 hover:opacity-80
                absolute bottom-6 left-56 md:left-auto md:bottom-8 md:right-8 "
                // style={{right: "300px"}}
                >
                  <svg className="text-white object-cover p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>

              </div>
        </div>
      </div>
  </div>
  </div>
      </div>

        );
  })}
    </>
  )
})

export default IndexItem
