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

  const configAxios = {withCredentials: true}
  // const configAxios = {headers: { 'X-Requested-With': 'XMLHttpRequest'}, withCredentials: true}

  const [ booksIndex, setBooksIndex ] = useState([])

  const [ loginFlag, setLoginFlag ] = useState(false)

  const onClickTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const [userId, setUserId] = useState()
  return (
    <MainContext.Provider value={{ testName, data, setData, text, setText,
    name, setName, password, setPassword, configAxios, booksIndex, setBooksIndex,loginFlag ,setLoginFlag ,railsUrl, onClickTop,
    userId, setUserId}}>
      { children }
    </MainContext.Provider>
  )
}
