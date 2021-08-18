import axios from 'axios';
import React, { createContext, useState } from 'react'
import { API_KEY } from '../api/API_KEY';


export const MainContext = createContext({});

export const MainProvider = (props) => {
  const { railsUrl } = API_KEY
  const { children } = props;

  const testName = "aaaa";

  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  // const configAxios = {withCredentials: true}
  const configAxios = {headers: { 'X-Requested-With': 'XMLHttpRequest'}, withCredentials: true}

  const [ booksIndex, setBooksIndex ] = useState([])

  const [ loginFlag, setLoginFlag ] = useState(false)

  const onClickTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // const targetFlagResetOnlyModal = () => {
  //   setTargetFlag(() => false);
  //   setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}}))
  //   setIdea(() => (""))
  // }

  const [userId, setUserId] = useState()

  const [googleData, setGoogleData] = useState([]);

  const [targetItem, setTargetItem] = useState({})
  const [time, setTime] = useState(new Date()) // .toLocaleString("en","Asia/Tokyo") したいなああ
  const [targetFlag, setTargetFlag] = useState(false)
  const onClickPostRails = () => {
    const trans = time / 1000
    axios.post(`${railsUrl}/books`,{
      booktitle: targetItem.title,
      author: targetItem.author,
      bookimage: targetItem.imageUrl,
      thoughts: idea,
      date: trans,
      user_id: userId
    },configAxios).then((res) => {
      // console.log(res.data);        // レスポンスデータ
      // console.log(res.status);      // ステータスコード
      // console.log(res.statusText);  // ステータステキスト
      // console.log(res.headers);     // レスポンスヘッダ
      // console.log(res.config);      // コンフィグ
      setTargetFlag(() => false);
      setTargetItem(() => ({}))
      setIdea(() => (""))

    })
    .catch(error => {

    });

  }

  const [idea, setIdea] = useState('')


  // const [targetFlag, setTargetFlag] = useState(false)
  const targetFlagChangeReset = () => {
    setTargetFlag(() => false);
    setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}}))
    setData(() => [])
    setGoogleData(() => [])
    setText(() => '')
    setIdea(() => (""))
  }

  return (
    <MainContext.Provider value={{ testName, data, setData, text, setText,
    name, setName, password, setPassword, configAxios, booksIndex, setBooksIndex,loginFlag ,setLoginFlag ,railsUrl, onClickTop,
    userId, setUserId, googleData, setGoogleData, targetFlagChangeReset, targetItem, setTargetItem,onClickPostRails, setTime,idea, setIdea,targetFlag, setTargetFlag}}>
      { children }
    </MainContext.Provider>
  )
}
