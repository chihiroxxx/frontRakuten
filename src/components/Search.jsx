import axios from 'axios'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { MainContext } from '../providers/Provider'
import { Result } from './Result'
import { API_KEY } from '../api/API_KEY'


export const Search = () => {
  const { data, setData, text, setText } = useContext(MainContext);

  // console.log(API_KEY.RakutenAPI_KEY)
  // const [text, setText] = useState('');
  // const [data, setData] = useState([]);
  const [page, setPage] = useState(2)

  const onClickSearch = () => {
    const appId = API_KEY.RakutenAPI_KEY
    axios.get("https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?", {
      params: {format: "json",
      keyword: text,
      applicationId: appId}
    }).then((res) => {
      // console.log(...res.data.Items);
      const newArray = [...res.data.Items]
      console.log(newArray)
      setData(newArray);
      setPage(2)
    })
  }
  const onClickNextPage = () => {
    const appId = API_KEY.RakutenAPI_KEY
    axios.get("https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?", {
      params: {format: "json",
      keyword: text,
      applicationId: appId,
      page: page,
    }
    }).then((res) => {
      // console.log(...res.data.Items);
      const newArray = [...data, ...res.data.Items]
      console.log(newArray)
      setData(newArray);
      setPage(page + 1)
    })
  }

  const onChangeTarget = (e) => {
    setText(() => e.target.value)
  }

  console.log(page)

  return(
    <SContainer>
      <SInput placeholder="検索タイトルを入力！"
      value={text} onChange={onChangeTarget} />
      <SButton onClick={onClickSearch}>検索</SButton>
      { text }
      <Result />
      { data != "" ?
      <SButton onClick={onClickNextPage}>次のページを読み込む</SButton>
      : false }
    </SContainer>
  )
}


const SContainer = styled.div`
  margin: 20px 10px 10px 10px;
  height: 50px;
`
const SInput = styled.input`
  height: 20px;
  border-radius: 8px;
  border: solid #81C784 1px;
  outline: none;
  padding: 4px;
  width: 200px;
  `
const SButton = styled.button`
  background-color: #FAFAFA;
  border: none;
  padding: 8px;
  border-radius: 8px;
  margin: 0 10px;
  color: #81C784;
  &:hover {
    cursor: pointer;
    background-color: #FFF;
    color: #FFCCBC;
  }
  `
