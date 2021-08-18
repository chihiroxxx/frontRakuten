import axios from "axios";
import { useContext, useState } from "react"
import { MainContext } from "../../providers/Provider";

export const Modal = () =>{
  const { data, setData, setText, configAxios, railsUrl, userId, onClickPostRails,idea, setIdea,targetItem, setTargetItem,targetFlag, setTargetFlag, setTime } = useContext(MainContext);

  // const [targetFlag, setTargetFlag] = useState(false)
  // const targetFlagResetOnlyModal = () => {
  //   setTargetFlag(() => false);
  //   setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}}))
  //   setIdea(() => (""))
  // }
  // const [targetItem, setTargetItem] = useState({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}})

  // const [idea, setIdea] = useState('')

  // const onChangeIdea = (e) => {
  //   setIdea(() => e.target.value)
  // }
  // const [time, setTime] = useState()
  // const onChangeTime = (e) => {
  //   setTime(() => e.target.valueAsNumber)
  // }

  // const onClickPostRails = () => {
  //   const trans = time / 1000
  //   axios.post(`${railsUrl}/books`,{
  //     booktitle: targetItem.Item.title,
  //     author: targetItem.Item.author,
  //     bookimage: targetItem.Item.mediumImageUrl,
  //     thoughts: idea,
  //     date: trans,
  //     user_id: userId
  //   },configAxios).then((res) => {
  //     setTargetFlag(() => false);
  //     setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}}))
  //     setIdea(() => (""))

  //   })
  //   .catch(error => {

  //   });

  // }


  const onChangeIdea = (e) => {
    setIdea(() => e.target.value)
  }

  const onChangeTime = (e) => {
    setTime(() => e.target.valueAsNumber)
  }

  // モーダル用

  const targetFlagResetOnlyModal = () => {
    setTargetFlag(() => false);
    setTargetItem(() => ({}))
    setIdea(() => (""))
  }



  return(
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
                <h2 className="mb-3 text-xs font-semibold tracking-widest text-black uppercase title-font">full in your thought </h2>
                {/* <h1 className="text-2xl font-semibold leading-none tracking-tighter text-black title-font"> A headline to switch your visitors into users. </h1> */}
                {/* <div className="h-80"> */}

                <img alt="blog photo" src={targetItem.imageUrl} className="object-cover"/>
                {/* </div> */}
              </div>
              <div className="flex flex-col w-full mx-auto mb-8 lg:px-20 md:mt-0">
                <div className="relative mt-4">
                  <label for="text" className="text-base leading-7 text-blueGray-500">Thought</label>
                  <input value={idea} onChange={onChangeIdea}
                  type="text" placeholder="感じたこと" className="border-2 border-gray-200 w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
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
  )
}
