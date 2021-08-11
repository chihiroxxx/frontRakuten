import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import { MainContext } from '../providers/Provider';

export const LonIn = () => {
  const { name, setName, password, setPassword, configAxios, loginFlag, setLoginFlag, railsUrl } = useContext(MainContext);

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  const onChangeName = (e) => {
    setName(() => e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(() => e.target.value )
  }

  const history = useHistory();

  const onClickLogIn = () => {
    axios.post(`${railsUrl}/login`,{
    // axios.post('http://localhost:3000/users/sign_in',{
      name: name,
      password: password
    },configAxios).then((res) => {
      // console.log(res.headers.client);
      // setTargetFlag(() => false); loginflagにしようかな
      history.push("/index")
      setName(() => (""))
      setPassword(() => (""))
      setLoginFlag(() => true)
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });

  }

  return(
    <SContainer>
      ログインがめん！！！！！！
      <SInput type="name" placeholder="name!!!!"
      value={name} onChange={onChangeName}/>
      <SInput type="password" placeholder="password"
      value={password} onChange={onChangePassword}/>
      <SButton onClick={onClickLogIn} >ログイン！！！</SButton>
    </SContainer>
  )
}

const SContainer = styled.div`
  padding: 20px;
  background-color: #FAFAFA;
  height: 100vh;
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
