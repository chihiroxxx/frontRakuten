import axios from 'axios'
import React, { useContext, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import styled from 'styled-components'
import { MainContext } from '../providers/Provider'

export const Result = () => {
  const { data, setData, setText, configAxios, railsUrl } = useContext(MainContext);

  // const {data} = props

  const [idea, setIdea] = useState('')
  const [targetItem, setTargetItem] = useState({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}})
  const [targetFlag, setTargetFlag] = useState(false)

  const [time, setTime] = useState()

  const targetFlagChange = () => {
    setTargetFlag(() => true);
  }
  const targetFlagChangeReset = () => {
    setTargetFlag(() => false);
    setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}}))
    setData(() => [])
    setText(() => '')
    setIdea(() => (""))
  }

  const onChangeIdea = (e) => {
    setIdea(() => e.target.value)
  }

  const onClickTargetItem = (e) => {
    setTargetItem(() => e)
    console.log(e)
    targetFlagChange()
  }
  console.log(targetFlag)


  axios.interceptors.request.use(
    config => {
      console.log(config)
      return config
    }
  )

  axios.interceptors.response.use(response => {
    console.log(response)
    return response
  })



  const onClickPostRails = () => {
    const trans = time / 1000
    axios.post(`${railsUrl}/books`,{
      booktitle: targetItem.Item.title,
      author: targetItem.Item.author,
      bookimage: targetItem.Item.mediumImageUrl,
      thoughts: idea,
      date: trans
    },configAxios).then((res) => {
      // console.log(res.data);        // レスポンスデータ
      // console.log(res.status);      // ステータスコード
      // console.log(res.statusText);  // ステータステキスト
      // console.log(res.headers);     // レスポンスヘッダ
      // console.log(res.config);      // コンフィグ
      setTargetFlag(() => false);
      setTargetItem(() => ({Item: {title: "", author: "", itemUrl: "", mediumImageUrl: ""}}))
      setIdea(() => (""))
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });

  }

  const onChangeTime = (e) => {
    setTime(() => e.target.valueAsNumber)
  }

  return(
    <SContainer>
      <SButton onClick={targetFlagChangeReset}>リセット！</SButton>
      { targetFlag ?
        <SItemTarget>
        <h3>感想入力部</h3>
        <SList>{ targetItem.Item.title }</SList>
        <SImage src={targetItem.Item.mediumImageUrl} />
        <SList>{ targetItem.Item.author }</SList>
        <SInput placeholder="感じたこと"
        value={idea} onChange={onChangeIdea}
        />
        <input type="datetime-local" value={time} onChange={onChangeTime}/>
        <SButton onClick={onClickPostRails}>感想送信</SButton>
      </SItemTarget>

      : <div>
        <br />
        <STexst>ようこーーーそ！！！！</STexst>
        </div>}


      <ul>
        {data.map((item, index) => {
          return(
            <SItem key={index}>
              <SList>{ item.Item.title }</SList>
              <a href={item.Item.itemUrl} target="_blank" rel="noopener noreferrer"><SImage src={item.Item.mediumImageUrl} /></a>
              <SList>{ item.Item.author }</SList>
              <SList>{ item.Item.itemUrl }</SList>
              <SButton onClick={() => onClickTargetItem(item)}>感想をかく</SButton>
              {/* buttonはuseStateでいけそう */}
            </SItem>
              );
        })}
      </ul>
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
