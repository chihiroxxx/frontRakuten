import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { MainContext } from '../providers/Provider'

export const Index = () => {
  const { configAxios, booksIndex, setBooksIndex, loginFlag, setLoginFlag, railsUrl, onClickTop } = useContext(MainContext)

  const [targetEditItem, setTargetEditItem] = useState({})
  const [targetEditThoughts, setTargetEditThoughts] = useState()

  const onClickGetIndexRails = () => {
    axios.get(`${railsUrl}/books`,configAxios).then((res) => {
      setBooksIndex(() => res.data.books)
    })
    .catch(error => {
      console.error(error);
    });
  }

  const onClickTest = () => {
    axios.get(`${railsUrl}`,configAxios).then((res) => {
    console.log(res)
    setLoginFlag(() => true)
  })
  .catch(error => {
    console.error(error);
    setLoginFlag(() => false)
    });
  }

  // loginFlag ? onClickGetIndexRails() : console.log("home画面に戻す処理にする") ;

  const onClickTargetEdit = (e) => {
      setTargetEditItem(e)
      setTargetEditThoughts(e.thoughts)
  }
  // onClickTargetEditはいじらない

  console.log(targetEditThoughts)

  const onChangeTargetEditThought = (e)=>{
    // setTargetEditItem({item: {thoughts: e.target.value}})
    setTargetEditThoughts(e.target.value)
  }


  const onClickEditPostRails = () =>{
    axios.put(`${railsUrl}/books/${targetEditItem.id}`,{
      // id: targetEditItem.item.id,
      thoughts: targetEditThoughts
    },configAxios).then((res) => {
      // console.log(res.data);        // レスポンスデータ
      // console.log(res.status);      // ステータスコード
      // console.log(res.statusText);  // ステータステキスト
      // console.log(res.headers);     // レスポンスヘッダ
      // console.log(res.config);      // コンフィグ

      // setTargetFlag(() => false);
      // setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}}))
      // setIdea(() => (""))
      setTargetEditThoughts()
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });


  }
  const fileDownload = require('js-file-download');

  const onClickGetCsvRails = () => {
    axios.get(`${railsUrl}/csv`,configAxios).then((res) => {
      console.log(res);
      fileDownload(res.data, "bookIndex.csv")
    })
    .catch(error => {
      console.error(error);
    });

  }


  useEffect(() => onClickGetIndexRails(), [])
  return(
    <SContainer>
      〜投稿一覧〜
      <SButton onClick={onClickGetIndexRails}>一覧更新！！！</SButton>
      <SButton onClick={onClickGetCsvRails}>CSV出力！！！</SButton>

      <SButton onClick={onClickTest}>test！！！</SButton>
      { targetEditThoughts ?
        <>
        <SInput
        value={targetEditThoughts} onChange={onChangeTargetEditThought}
        />
        <SButton onClick={onClickEditPostRails}>へんしゅ送信</SButton>
        </>

      : false}


      {/* あー、これが再レンダリングしてほしくないってことか！！！ */}
      <ul>
        {booksIndex.map((item) => {
          return(
            <SItem key={item.id}>
              <SList>{ item.booktitle }</SList>
              <SImage src={item.bookimage} />
              <SList>{ item.author }</SList>
              <SList>感想： { item.thoughts }</SList>
              <SList>読んだ時間： { item.date }</SList>
              {/* <SList>{ item.Item.itemUrl }</SList> */}
              <SButton onClick={() => onClickTargetEdit(item)}>編集する！！</SButton>
            </SItem>
              );
        })}
      </ul>
      {/* <SButton onClick={onClickTop}>ウエーに戻る</SButton> */}
    </SContainer>
  )
}


const SContainer = styled.div`
  margin: 10px 10px;
  height: 100vh;
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
const SInput = styled.input`
  height: 20px;
  border-radius: 8px;
  border: solid #81C784 1px;
  outline: none;
  padding: 4px;
  width: 400px;
  margin: 10px;
  `
