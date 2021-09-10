import { Box, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { createContext, Dispatch, ReactNode, useEffect, useState } from 'react'
// import { API_KEY } from '../api/API_KEY';

// interface MainContext{
//   name?: string,
//   setName?: any,
//   password:
// }

export const MainContext = createContext<any>({});

interface Props{
  children: ReactNode
}

export const MainProvider = (props: Props) => {

  const  railsUrl  = process.env.REACT_APP_RAILS_URL //ここをENVにしたい！！
  // console.log(railsUrl)
  const { children } = props;

  const [data, setData] = useState([]);
  const [text, setText] = useState<string>();

  const [name, setName] = useState<string>()
  const [password, setPassword] = useState<string>()

  const configAxios = {withCredentials: true}
  // const configAxios = {headers: { 'X-Requested-With': 'XMLHttpRequest'}, withCredentials: true}

  const [ booksIndex, setBooksIndex ] = useState([])

  const [ loginFlag, setLoginFlag ] = useState<boolean>(false)

  const onClickTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


  const [userId, setUserId] = useState()

  const [googleData, setGoogleData] = useState([]);

  const [tsutayaData, setTsutayaData] = useState([])
  const [kinoData, setKinoData] = useState([])

  interface TargetItem {
    title: string;
    author: string;
    imageUrl: string;
    itemUrl: string;
  }
  const [targetItem, setTargetItem] = useState<TargetItem>({title: "", author: "", imageUrl: "",itemUrl: ""}) //ここでtypeエイリアスかな？？
  const [time, setTime] = useState<number>(new Date().getTime()) // .toLocaleString("en","Asia/Tokyo") したいなああ
  const [targetFlag, setTargetFlag] = useState<boolean>(false)


  const onClickPostRails = () => {
    if(loginFlag){
      const trans: number = time / 1000
      axios.post(`${railsUrl}/books`,{
        booktitle: targetItem.title,
        author: targetItem.author,
        bookimage: targetItem.imageUrl,
        thoughts: idea,
        date: trans,
        user_id: userId
      },configAxios).then((res) => {
        setTargetFlag(() => false);
        setTargetItem(() => ({title: "", author: "", imageUrl: "",itemUrl: ""}))
        setIdea(() => (""))

      })
      .catch(error => {
      });

    } else {
      showToast("ログインしてください")

    }

  }

  const [idea, setIdea] = useState<string>()



  const targetFlagChangeReset = ():void => {
    setTargetFlag(() => false);
    setTargetItem(() => ({title: "", author: "", imageUrl: "",itemUrl: ""}))
    setData(() => [])
    setGoogleData(() => [])
    setTsutayaData(() => [])
    setKinoData(() => [])
    setText(() => '')
    setIdea(() => (""))
  }

  // useEffect(()=>{
  //   const ip :string[] = window.location.href.split('/')
  //   console.log(ip[2])
  //   setMyIp(`http://${ip[2]}:3000`)
  // },[])
  // const [myIp, setMyIp] = useState<string>()
  const toast = useToast()
  const showToast = (message: string) => {
    toast({
      position: "top",
      duration: 2000,
      render: () => (
        <Box color="white" p={3} className="bg-indigo-800 rounded-md">
          {message}
        </Box>
      ),
    })}

  return (
    <MainContext.Provider value={{ data, setData, text, setText,
    name, setName, password, setPassword, configAxios, booksIndex, setBooksIndex,loginFlag ,setLoginFlag ,railsUrl, onClickTop,
    userId, setUserId, googleData, setGoogleData, targetFlagChangeReset, targetItem, setTargetItem,onClickPostRails, setTime,idea, setIdea,targetFlag, setTargetFlag,showToast,
    tsutayaData,setTsutayaData,kinoData, setKinoData}}>
      { children }
    </MainContext.Provider>
  )
}
