import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import styled from 'styled-components';

import { Footer } from '../components/Footer';
import { Search } from '../components/Search';
import { LonIn } from '../components/LogIn';
import { Index } from '../components/Index';
import { MainContext } from '../providers/Provider';
import axios from 'axios';

export const Router = () => {
    const { configAxios,loginFlag, setLoginFlag, railsUrl, setUserId } = useContext(MainContext);

  useEffect(() => {
    axios.get(`${railsUrl}`,configAxios).then((res) => {
      setUserId(res.data.user_id);
      // console.log(res)
      setLoginFlag(() => true)
  })
  .catch(error => {
    // console.error(error);
    setLoginFlag(() => false)
    });
  },[loginFlag])


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
