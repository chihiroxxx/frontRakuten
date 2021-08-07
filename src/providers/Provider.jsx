import React, { createContext, useState } from 'react'


export const MainContext = createContext({});

export const MainProvider = (props) => {
  const { children } = props;

  const testName = "aaaa";

  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const configAxios = {headers: { 'X-Requested-With': 'XMLHttpRequest'}, withCredentials: true}

  const [ booksIndex, setBooksIndex ] = useState([])

  const [ loginFlag, setLoginFlag ] = useState(false)

  return (
    <MainContext.Provider value={{ testName, data, setData, text, setText,
    name, setName, password, setPassword, configAxios, booksIndex, setBooksIndex,loginFlag ,setLoginFlag }}>
      { children }
    </MainContext.Provider>
  )
}
