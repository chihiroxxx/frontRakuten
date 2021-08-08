import axios from 'axios'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { MainContext } from '../providers/Provider'

export const Index = () => {
  const { configAxios, booksIndex, setBooksIndex, loginFlag, setLoginFlag, railsUrl, onClickTop } = useContext(MainContext)

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

  console.log(booksIndex)

  return(
    <SContainer>
      〜投稿一覧〜
      <SButton onClick={onClickGetIndexRails}>一覧取得！！！</SButton>

      <SButton onClick={onClickTest}>test！！！</SButton>


      {/* あー、これが再レンダリングしてほしくないってことか！！！ */}
      <ul>
        {booksIndex.map((item, index) => {
          return(
            <SItem key={index}>
              <SList>{ item.booktitle }</SList>
              <SImage src={item.bookimage} />
              <SList>{ item.author }</SList>
              <SList>感想： { item.thoughts }</SList>
              <SList>読んだ時間： { item.date }</SList>
              {/* <SList>{ item.Item.itemUrl }</SList> */}
              <SButton >編集する！！</SButton>
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
