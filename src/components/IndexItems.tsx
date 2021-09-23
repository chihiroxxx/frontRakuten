// import { useDisclosure } from '@chakra-ui/react'
// import React, { useState } from 'react'


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

const IndexItems = (booksIndex: Item[]) => {


//   const onClickTargetEdit = (e: Item) => {
//     // console.log(e)
//     setTargetEditItem(e)
//     setTargetEditThoughts(e.thoughts)
// }
// const [deleteId, setDeleteId] = useState<number>(0)
// const onClickTargetDelete =  (e: Item)  => {
//   onOpen()
//   // うーん....削除しちゃうなあ....
//   console.log(e.id)

//   setDeleteId(e.id)
//   // const deleteId = e.id

//   // onClickDeleteRails(deleteId);
// }
// const { isOpen, onOpen, onClose } = useDisclosure()
// const cancelRef = React.useRef<any>()

// const [targetEditItem, setTargetEditItem] = useState<TargetEditItem>({id: 0,date: "", author: "",booktitle: "", bookimage: "", thoughts: ""})
// const [targetEditThoughts, setTargetEditThoughts] = useState<string>()
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



//   return (
//     <>
//      { booksIndex.map((item: Item) => {
//     const dateStr = new Date(item.date).toDateString()

//     return(
//       <div className="flex items-center justify-center">

//       <div className="my-4 mx-auto
//       flex items-center justify-center">


//   <div key={item.id} className="overflow-hidden shadow-lg rounded-lg cursor-pointer ml-1 hover:opacity-85
//   md:w-4/5 w-72"
//   //  style={{width: "800px"}}
//    >
//       <div className="md:flex">

//         <div className="h-40 md:h-full md:max-h-full md:w-2/5 cursor-default bg-gray-100">
//           {/* <a href={item.Item.itemUrl} target="_blank" rel="noopener noreferrer"> */}
//           <img alt="NO IMAGE" src={item.bookimage} className=" max-h-full w-80 object-scale-down md:object-cover object-center"/>

//           {/* </a> */}

//         </div>


//         <div className="h-full  relative"
//         style={{width: "550px"}}
//         >

//           <div className="w-72 ml-2 md:m-0 bg-white dark:bg-gray-800 md:w-full h-80 p-4 cursor-default">
//               <p className="text-indigo-500 text-md font-medium">
//                   Book Title
//               </p>
//               <div className="h-20 mb-2 md:mb-0 md:h-32 p-2  md:w-full">

//                   <p className="break-normal text-gray-800 dark:text-white text-base font-medium mb-2">
//                   { item.booktitle }
//                   </p>
//                   <p className="text-gray-400 dark:text-gray-300 font-light text-md">
//                   { item.author }
//                   </p>
//               </div>
//                   <p className="text-indigo-500 text-md font-medium">
//                       Your Thought
//                   </p>
//                   <div className="h-32 p-2">
//                   <p className="text-gray-800 dark:text-white text-base font-medium mb-8">
//                   { item.thoughts }
//                   </p>
//                   <p className=" text-gray-400 dark:text-gray-300 font-light text-md">
//                   { dateStr }
//                   {/* { item.date } */}
//                   {/* { (item.date).toDateString() } */}
//                   </p>

//               </div>
//           </div>
//               <div onClick={() => onClickTargetEdit(item)}
//                className="mr-1 object-cover rounded-full bg-indigo-600 h-10 w-10 hover:opacity-80
//                 absolute bottom-6 left-44 md:left-auto md:bottom-8 md:right-20 "
//                 // style={{right: "300px"}}
//                 >
//               <svg className="text-white object-cover p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>

//               </div>

//                <div onClick={() => onClickTargetDelete(item)}
//                className="object-cover rounded-full bg-red-600 h-10 w-10 hover:opacity-80
//                 absolute bottom-6 left-56 md:left-auto md:bottom-8 md:right-8 "
//                 // style={{right: "300px"}}
//                 >
//                   <svg className="text-white object-cover p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>

//               </div>
//         </div>
//       </div>
//   {/* <CommentItem /> */}

//   </div>
//   </div>

//       </div>

//         );
//   })}
//     </>
//   )
}

export default IndexItems
