import React, { useContext } from 'react';
import styled from 'styled-components'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import axios from 'axios';
import { MainContext } from '../providers/Provider';

export const Header = () => {
  const { name, setName, password, setPassword, configAxios, loginFlag, setLoginFlag } = useContext(MainContext);

  const onClickLogOut = () => {
    // ログインしているユーザー情報をどうやって持ってくるかあ…
    // ここにsessionを入れて送信！！ ...sessionってそういうことじゃないんだってさ！！！！
    axios.delete('http://localhost:3000/logout',configAxios)
    .then((res) => {
      setLoginFlag(() => false)
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });

  }

  return(
    <>
    <SContainer>
    <Link to="/">
      <SButton>HOME</SButton>
    </Link>
    <Link to="/login">
      <SButton>LOG IN</SButton>
    </Link>
    { loginFlag ?
    <>
    <SButton onClick={onClickLogOut}>LOG OUT</SButton>
    <Link to="/index">
    <SButton>INDEX</SButton>
    </Link>
    </>
      : false
    }

    <STexst>タイトル！！！！</STexst>
    </SContainer>
    </>
  )
}
const SContainer = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #81C784;
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
const STexst = styled.h2`
  color: #FFCCBC;
  display: inline-block;
  margin: 0 auto;
  `
