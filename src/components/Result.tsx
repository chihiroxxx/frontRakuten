import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { ChangeEvent, useContext, useState } from 'react'
// import ReactDatePicker from 'react-datepicker'
import styled from 'styled-components'
import { MainContext } from '../providers/Provider'
// import { MyButton } from './atoms/MyButton'
import { Modal } from './organisms/Modal'
import ModalTest from './organisms/ModalTest'
// import './Result.scss'; //うーーーーん楽天だけ？？ //レンダリングのしようか...

interface Props{
  data: PreparedData[]
  apiName: string
}

interface PreparedData{
  title: string,
  author: string,
  itemUrl: string,
  imageUrl: string,
}

export const Result = (props: Props) => {
  const { setData, setText, configAxios, railsUrl, userId, targetFlagChangeReset, targetItem, setTargetItem, onClickPostRails, setTime , idea, setIdea
  ,targetFlag, setTargetFlag} = useContext(MainContext);

  const {data, apiName} = props

  const { isOpen, onOpen, onClose } = useDisclosure()



  // const [targetFlag, setTargetFlag] = useState(false)

  // const [time, setTime] = useState()

  const targetFlagChange = () => {
    setTargetFlag(() => true);
  }
  // const targetFlagChangeReset = () => {
  //   setTargetFlag(() => false);
  //   setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", imageUrl: ""}}))
  //   setData(() => [])
  //   setText(() => '')
  //   setIdea(() => (""))
  // }

  const onChangeIdea = (e: ChangeEvent<HTMLInputElement>) => {
    setIdea(() => e.target.value)
  }

  const onClickTargetItem = (e: TargetItem) => {
    const Target = {title: e.title, author: e.author, imageUrl: e.imageUrl}
    // console.log(Target)
    setTargetItem(Target)

    targetFlagChange()
    onOpen()
  }



  axios.interceptors.request.use(
    config => {

      return config
    }
  )

  axios.interceptors.response.use(response => {

    return response
  })



  // const onClickPostRails = () => {
  //   const trans = time / 1000
  //   axios.post(`${railsUrl}/books`,{
  //     booktitle: targetItem.title,
  //     author: targetItem.author,
  //     bookimage: targetItem.imageUrl,
  //     thoughts: idea,
  //     date: trans,
  //     user_id: userId
  //   },configAxios).then((res) => {
  //     // console.log(res.data);        // レスポンスデータ
  //     // console.log(res.status);      // ステータスコード
  //     // console.log(res.statusText);  // ステータステキスト
  //     // console.log(res.headers);     // レスポンスヘッダ
  //     // console.log(res.config);      // コンフィグ
  //     setTargetFlag(() => false);
  //     setTargetItem(() => ({}))
  //     setIdea(() => (""))

  //   })
  //   .catch(error => {

  //   });

  // }

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(() => e.target.valueAsNumber)
  }





  const [ show, setShow] = useState(false)
  // モーダル用

  const targetFlagResetOnlyModal = () => {
    setTargetFlag(() => false);
    setTargetItem(() => ({}))
    setIdea(() => (""))
  }


  interface TargetItem {
    title: string;
    author: string;
    imageUrl: string;
    itemUrl: string;
  }

  const styleJSX: React.CSSProperties ={
    marginTop: "-2px"
  }




  // #scrolled

  // const cb = (entris:any, observer:any) => {
  //   console.log("intersecting!!!?")
  //   entris.forEach((entry:any) => {
  //     if(entry.isIntersecting) {
  //       console.log("inview!!")
  //       console.log(entry.target)
  //       entry.target.classList.add("viewing")
  //       // entry.target.classList.remove("invisible")

  //     }else{
  //       console.log("outview!!")
  //       // entry.target.classList.add("invisible")


  //       // entry.target.classList.remove("testclass") //これつけるとズーーーっと出たり入ったりする
  //       // つまり、一覧だから、初回に入るときにエフェクトがあればいいかな？と思う
  //       // 見づらいかなって

  //     }
  //   })
  // }
  // const options = {
  //   // rootMargin: "-300px  0px"
  // }
  // const io = new IntersectionObserver(cb, options)
  // if(document.querySelector('.scrolled')){
  //   const els = document.querySelectorAll('.scrolled')
  //   console.log(els)
  //   els.forEach(el => io.observe(el))
  //   // io.observe(document.querySelector('.scrolled')!)

  // }
  // // if(document.querySelector('#scrolled')){
  // //   io.observe(document.querySelector('#scrolled')!)

  // // }







  return(
    <SContainer>

        {data.length !== 0 &&
        <>
        <div className="hidden md:block">

        <div
       className="bg-indigo-900 text-white cursor-default rounded-b-none border-t-2 border-r-2 border-l-2 border-gray-900  w-32 text-center px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-white hover:bg-indigo-900 ">
                {apiName}
                {/* <div className="border-b-4 border-purple-400 ">
                </div> */}

                </div>
                <div className="border-t-2 border-gray-900  h-1 w-11/12 pr-2" style={styleJSX}></div>
        </div>




        {/* <h1 className="ml-1 text-indigo-900 font-bold text-xl hidden md:block">{apiName} */}
        {/* <div className="border-b-4 w-10/12 border-purple-400 ">
                </div> */}
        {/* </h1> */}
      <ul>
        {data.map((item, index) => {
          return(
            // <SItem key={index}>


        // <div className="text-center ">
        <div className="m-3 inline-block scrolled">


        <div key={index} className="overflow-hidden shadow-lg rounded-lg h-90 w-72 cursor-pointer ml-1 hover:opacity-85">
            <a className="w-full block h-full">
              <div className="h-80">
                <a href={item.itemUrl} target="_blank" rel="noopener noreferrer">
                <img alt="NO IMAGE" src={item.imageUrl} className="max-h-full w-full object-cover"/>

                </a>

              </div>
                <div className="bg-white dark:bg-gray-800 w-full p-4">
                    <p className="text-indigo-500 text-md font-medium">
                        {apiName}Book
                    </p>
                    <div className="h-32 relative p-2">

                    <p className="text-gray-800 dark:text-white text-base font-medium mb-2">
                    { item.title }
                    </p>
                    <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                    { item.author }
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


              );
        })}
      </ul>
        </>

      }




      { targetFlag &&
        <>
        {/* <Modal indexFlag={false}/> */}
        <ModalTest indexFlag={false} isOpen={isOpen} onClose={onClose}/>

      </>

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
// const SMyButton =styled(MyButton)`
//   background-color: #FFCCBC;
//   color: #FAFAFA;
// `

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
