import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import styled from 'styled-components';

import { Footer } from '../components/Footer';
import { Search } from '../components/Search';
import { Lonin } from '../components/Login';
import { Index } from '../components/Index';
import { MainContext } from '../providers/Provider';
import axios from 'axios';
import Collection from '../components/Collection';

export const Router = () => {
    const { configAxios,loginFlag, setLoginFlag, railsUrl, setUserId } = useContext(MainContext);

  useEffect(() => {
    axios.get(`${railsUrl}/restricted`,configAxios).then((res) => {
      // setUserId(res.data.user_id);
      setUserId(res.data);
      console.log(res.data)
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
          {/* <Footer /> */}

        </Route>
        <Route path="/login">
          <Lonin />
          {/* <Footer /> */}
        </Route>
        <Route path="/index">
          <Index />
          <Footer />
        </Route>
        <Route path="/collection">
          <Collection />
          {/* <Footer /> */}
        </Route>
      </Switch>
  )
}


const SContainer = styled.div`
  min-height: 100vh;
  /* padding: 10px; */
`
