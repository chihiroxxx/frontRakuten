import logo from './logo.svg';
import React, { useContext } from 'react'

import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import './App.css';
import styled from 'styled-components';

import { Header } from './components/Header';

import { MainProvider, MainContext } from './providers/Provider';

import { Router } from './router/Router';

function App() {
  // const { configAxios, setLoginFlag } = useContext(MainContext);
  // (()=>{
  //   axios.get('http://localhost:3000/books',configAxios).then((res) => {
  //     // setLoginFlag(() => true)
  //     console.log(res);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // })()
  // ああああああ プロバイダーのデータとかとってこれないのかあああああああ！！！
  return (
    <MainProvider>
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
    </MainProvider>
  );
}

export default App;

const SContainer = styled.div`
  min-height: 100vh;
  /* padding: 10px; */
`
