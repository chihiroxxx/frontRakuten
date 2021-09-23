import { Box, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { createContext, Dispatch, ReactNode, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
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

  const token = ():string => {
    if (document.cookie.split('; ').find(row => row.startsWith('token'))){
   return(document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))!
    .split('=')[1])
  } else {
    return ""
  }
  }

//  const tokenExist = () => {
//   document.cookie.split('; ').find(row => row.startsWith('token'))
//  }



  const configAxios = {headers: {
    Authorization: `Bearer ${token()}`,
  }}
  // const configAxios = {withCredentials: true}
  // const configAxios = {headers: { 'X-Requested-With': 'XMLHttpRequest'}, withCredentials: true}

  const [ booksIndex, setBooksIndex ] = useState<Item[]>([])
  interface Item{
    id: number,
    date: string,
    booktitle: string,
    author: string,
    bookimage: string,
    thoughts: any,
    // itemUrl: string,
    // largeImageUrl: string
  }
  const [ loginFlag, setLoginFlag ] = useState<boolean>(false)

  const onClickTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const history = useHistory()
  const checkAuth = () => {
    !loginFlag && history.push("/")
  }

  const [userId, setUserId] = useState(-1)

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

  interface PostProps {
    thoughts: string
    date: number,
    page: number,
    readingtime: number,
  }
  // const onClickPostRails = (props: PostProps) => {
  //   if(loginFlag){
  //     const arrngeDate = new Date(props.date).getTime()
  //     const trans: number = arrngeDate / 1000
  //     console.log(props.thoughts)
  //     axios.post(`${railsUrl}/books`,{
  //       booktitle: targetItem.title,
  //       author: targetItem.author,
  //       bookimage: targetItem.imageUrl,
  //       thoughts: props.thoughts,
  //       // date: props.date,
  //       // thoughts: idea,
  //       date: trans,
  //       user_id: userId
  //     },configAxios).then((res) => {
  //       setTargetFlag(() => false);
  //       setTargetItem(() => ({title: "", author: "", imageUrl: "",itemUrl: ""}))
  //       setIdea(() => (""))

  //     })
  //     .catch(error => {
  //     });

  //   } else {
  //     showToast("ログインしてください")

  //   }

  // }
  const onClickPostRails = (props: PostProps): string => {

    const dateTimeFormat = (props: number) =>  {
      const date = new Date(props) // まあ、ここをinputで受け取れるようにする
      // console.log(`${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`)
      // console.log(`${date.getFullYear()}-0${date.getMonth()}-${date.getDate()} 0${date.getHours()}:0${date.getMinutes()}:${date.getSeconds()}`)

      const m = (`00${date.getMonth()+1}`).slice(-2)
      const d = (`00${date.getDate()}`).slice(-2)
      const h = (`00${date.getHours()}`).slice(-2)
      const mi = (`00${date.getMinutes()}`).slice(-2)
      const s = (`00${date.getSeconds()}`).slice(-2)
      // console.log(`月がずれてる？？？:${m}`)
      // console.log(`00${date.getMonth()}`)
      console.log(`${date.getFullYear()}${m}${d}${h}${mi}${s}`)



      return `${date.getFullYear()}${m}${d}${h}${mi}${s}`
    }

    interface CustomFormData extends FormData {
      append(name: string, value: string | Blob | number, fileName?: string):any
    }

    const formDataCreate = (props: PostProps) :CustomFormData => {
      const formData = new FormData() as CustomFormData
      const params = {
        booktitle: targetItem.title,
        author: targetItem.author,
        bookimage: targetItem.imageUrl,
        thoughts: props.thoughts,
        page: props.page,
        readingtime: props.readingtime,
        date: dateTimeFormat(props.date),
        // date: "20210817084643",
        userid: userId,
      }
      // data.append("booktitle", "react")
      Object.entries(params).forEach(([key, value]) => {
        formData.append(key, value)
      })
      console.log(formData)
      return formData
    }

    if(loginFlag){
      // formDataCreate()
      axios.post(`${railsUrl}/restricted/books`,formDataCreate(props)
      ,configAxios
      ).then((res) => {
        setTargetFlag(() => false);
        setTargetItem(() => ({title: "", author: "", imageUrl: "",itemUrl: ""}))
        setIdea(() => (""))
        return "OK!!"

      })
      .catch(error => {
        return "error!!!"
      });

    } else {
      showToast("ログインしてください")

    }
    return "OK!!!!"

  }

  const [idea, setIdea] = useState<string>()

  const [kinoArrangeData, setKinoArrangeData ] = useState([])

  const targetFlagChangeReset = ():void => {
    setTargetFlag(() => false);
    setTargetItem(() => ({title: "", author: "", imageUrl: "",itemUrl: ""}))
    setData(() => [])
    setGoogleData(() => [])
    setTsutayaData(() => [])
    setKinoData(() => [])
    setKinoArrangeData(() => [])
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


    // golangに変更関係！--------------------------------
    const dateTimeFormat = () =>  {
      const date = new Date() // まあ、ここをinputで受け取れるようにする
      console.log(`${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`)
      console.log(`${date.getFullYear()}-0${date.getMonth()}-${date.getDate()} 0${date.getHours()}:0${date.getMinutes()}:${date.getSeconds()}`)

      const m = (`00${date.getMonth()}`).slice(-2)
      const d = (`00${date.getDate()}`).slice(-2)
      const h = (`00${date.getHours()}`).slice(-2)
      const mi = (`00${date.getMinutes()}`).slice(-2)
      const s = (`00${date.getSeconds()}`).slice(-2)

      console.log(`${date.getFullYear()}${m}${d}${h}${mi}${s}`)



      return `${date.getFullYear()}${m}${d}${h}${mi}${s}`
    }
    /*
    const formDataCreate = () => {
      const formData = new FormData()
      const params = {
        booktitle: targetItem.title,
        author: targetItem.author,
        bookimage: targetItem.imageUrl,
        thoughts: props.thoughts,
        date: dateTimeFormat(),
        userid: "1",
      }
      // data.append("booktitle", "react")
      Object.entries(params).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }
    */
    const [countIsOk, SetCountIsOk] = useState(false)
    const [bookCollections, setBookCollections ] = useState([]) //うーん直接リターンでも良さそうだけど...
    const [createIsOk, SetCreateIsOk] = useState(false)
    const [editIsOk, SetEditIsOk] = useState(false)


    const onClickGetIndexRails = () => {
      axios.get(`${railsUrl}/restricted/thoughts/${userId}`,configAxios
      // {headers: { 'X-Requested-With': 'XMLHttpRequest'}, withCredentials: true, params: {user_id: userId}}
      ).then((res) => {
        console.log(res)
        // setBooksIndex(() => res.data.books)
        if (res.data !== null){
        setBooksIndex(() => res.data) //のちにres.data.booksとしてgoから返却させる！！！！
      }
      })
      .catch(error => {
        // console.error(error);
      });
    }

  return (
    <MainContext.Provider value={{ data, setData, text, setText,
    name, setName, password, setPassword, configAxios, booksIndex, setBooksIndex,loginFlag ,setLoginFlag ,railsUrl, onClickTop,
    userId, setUserId, googleData, setGoogleData, targetFlagChangeReset, targetItem, setTargetItem,onClickPostRails, setTime,idea, setIdea,targetFlag, setTargetFlag,showToast,
    tsutayaData,setTsutayaData,kinoData, setKinoData,kinoArrangeData, setKinoArrangeData, token, checkAuth,
    countIsOk, SetCountIsOk,bookCollections, setBookCollections,createIsOk, SetCreateIsOk,editIsOk, SetEditIsOk, onClickGetIndexRails }}>
      { children }
    </MainContext.Provider>
  )
}
