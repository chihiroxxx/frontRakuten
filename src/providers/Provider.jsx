import React, { createContext, useState } from 'react'


export const MainContext = createContext({});

export const MainProvider = (props) => {
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

  const railsUrl = "http://54.64.212.72:3000"
  // const railsUrl = "http://localhost:3000/" 開発用

  const onClickTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <MainContext.Provider value={{ testName, data, setData, text, setText,
    name, setName, password, setPassword, configAxios, booksIndex, setBooksIndex,loginFlag ,setLoginFlag ,railsUrl, onClickTop}}>
      { children }
    </MainContext.Provider>
  )
}
