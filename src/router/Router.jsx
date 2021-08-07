import React, { useContext } from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import styled from 'styled-components';

import { Footer } from '../components/Footer';
import { Search } from '../components/Search';
import { LonIn } from '../components/LogIn';
import { Index } from '../components/Index';
import { MainContext } from '../providers/Provider';
import axios from 'axios';

export const Router = () => {
    const { configAxios, setLoginFlag, railsUrl } = useContext(MainContext);
  (() => {
    axios.get(`${railsUrl}:3000`,configAxios).then((res) => {
    console.log(res)
    setLoginFlag(() => true)
  })
  .catch(error => {
    console.error(error);
    setLoginFlag(() => false)
    });
  })()


  return(
    // { () ? () : ()}
    <Switch>
        <Route exact path="/">

          <SContainer>
          <Search />
          </SContainer>

        </Route>
        <Route path="/login">
          <LonIn />
          <Footer />
        </Route>
        <Route path="/index">
          <Index />
          <Footer />
        </Route>
      </Switch>
  )
}


const SContainer = styled.div`
  min-height: 100vh;
  /* padding: 10px; */
`
