import axios from 'axios'
import React, { useContext, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import styled from 'styled-components'
import { MainContext } from '../providers/Provider'
import { MyButton } from './atoms/MyButton'
import { Modal } from './organisms/Modal'

export const ResultGoogleTest = (props) => {
  const {  } = props;
  const {setText, configAxios, railsUrl, userId,  googleData, setGoogleData, targetFlagChangeReset, targetItem, setTargetItem, onClickPostRails, setTime , idea, setIdea
  ,targetFlag, setTargetFlag } = useContext(MainContext);

  // const [idea, setIdea] = useState('')

  // const [targetFlag, setTargetFlag] = useState(false)

  // const [time, setTime] = useState()

  const targetFlagChange = () => {
    setTargetFlag(() => true);
  }
  // const targetFlagChangeReset = () => {
  //   setTargetFlag(() => false);
  //   setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", imageUrl: ""}}))
  //   // setData(() => [])
  //   setText(() => '')
  //   setIdea(() => (""))
  // }

  const onChangeIdea = (e) => {
    setIdea(() => e.target.value)
  }

  const onClickTargetItem = (e) => {
    const Target = {title: e.volumeInfo.title, author: e.volumeInfo.authors, imageUrl: e.volumeInfo.imageLinks.thumbnail }
    console.log(Target)
    setTargetItem(Target)

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
  //     setTargetFlag(() => false);
  //     setTargetItem(() => ({}))
  //     setIdea(() => (""))

  //   })
  //   .catch(error => {

  //   });

  // }

  const onChangeTime = (e) => {
    setTime(() => e.target.valueAsNumber)
  }





  const [ show, setShow] = useState(false)
  // モーダル用

  const targetFlagResetOnlyModal = () => {
    setTargetFlag(() => false);
    setTargetItem(() => ({}))
    setIdea(() => (""))
  }





  return(
    <SContainer>
            {/* <div className=" flex flex-wrap justify-end  mt-4 mr-1">
        <button onClick={targetFlagChangeReset} className="px-6 py-2 font-medium text-white transition duration-500 ease-in-out transform bg-yellow-300  rounded-md ext-base focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-yellow-200">
          RESET</button>
      </div> */}


        {googleData !== "" &&


      <ul>
        {googleData.map((item, index) => {
          return(

        <div className="m-3 inline-block ">


        <div key={index} className="overflow-hidden shadow-lg rounded-lg h-90 w-72 md:w-100 cursor-pointer ml-1 hover:opacity-85">
            <a className="w-full block h-full">
              <div className="h-80">
                <a href={item.volumeInfo.infoLink } target="_blank" rel="noopener noreferrer">
                <img alt="blog photo" src={item.volumeInfo.imageLinks == null ? false : item.volumeInfo.imageLinks.thumbnail} className="max-h-full w-full object-cover"/>

                </a>

              </div>
                <div className="bg-white dark:bg-gray-800 w-full p-4">
                    <p className="text-indigo-500 text-md font-medium">
                        GoogleBook
                    </p>
                    <div className="h-32 relative p-2">

                    <p className="text-gray-800 dark:text-white text-base font-medium mb-2">
                      {/* タイトル */}
                    { item.volumeInfo.title }
                    </p>
                    <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                    { item.volumeInfo.authors == null ?
                    false
                  :item.volumeInfo.authors[0] }
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
            //   <a href={item.Item.itemUrl} target="_blank" rel="noopener noreferrer"><SImage src={item.Item.imageUrl} /></a>
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
        <Modal />
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
