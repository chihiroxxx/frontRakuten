import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import { MainContext } from '../providers/Provider';

export const LonIn = () => {
  const { name, setName, password, setPassword, configAxios, loginFlag, setLoginFlag, railsUrl, userId, setUserId } = useContext(MainContext);

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
      setUserId(res.data.user_id);
      history.push("/index")
      setName(() => (""))
      setPassword(() => (""))
      setLoginFlag(() => true)
      console.log(res);
      console.log(res.data.user_id);
    })
    .catch((error) => {
      console.error(error);
    });

  }

  return(
    <>

<section className="flex flex-col items-center h-screen md:flex-row ">
            <div className="relative hidden w-full h-screen bg-blueGray-400 lg:block md:w-1/3 xl:w-1/3">
              <img src="https://dummyimage.com/300x600/F3F4F7/000000" alt="" className="absolute object-cover w-full h-full"/>
              <div className="relative z-10 m-12 text-left">
                <a className="flex items-center w-32 mb-4 font-medium text-blueGray-900 title-font md:mb-10">
                  {/* <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600">
                  </div> */}
                  {/* <h2 className="text-lg font-bold tracking-tighter text-black uppercase transition duration-500 ease-in-out transform hover:text-lightBlack-500 dark:text-lightBlue-400"> Wickedblocks </h2> */}
                </a>
              </div>
            </div>
            <div className="flex w-full h-screen px-6 bg-whitelack md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 items-left justify-left">
              {/* <div className="w-full py-32 lg:py-6 lg:h-100">
              </div> */}

              <div className="mt-6" action="#" method="POST">
                <h1 className="my-12 font-black tracking-tighter text-black hover:text-indigo-900 text-5xl title-font">Sign Up.
                <div className="mt-3 ml-1 tracking-tighter text-gray-400  text-base font-medium">Welcome to MEMENTO TIME!</div>
                </h1>
                <div>
                  <label className="text-base font-medium leading-relaxed text-blueGray-700">User Name</label>
                  <input onChange={onChangeName}
                  type="name" placeholder="User Name " className="border-2 border-gray-500 w-full px-4 py-2 mt-2 text-base text-indigo-900 border-transparent rounded-lg bg-blueGray-100 ext-blue-700 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" autocomplete="" required=""/>
                </div>
                <div className="mt-4">
                  <label className="text-base font-medium leading-relaxed text-blueGray-700">Password</label>
                  <input onChange={onChangePassword}
                   type="password" placeholder="Password" minlength="6" className="border-2 border-gray-500 w-full px-4 py-2 mt-2 text-base text-indigo-900 border-transparent rounded-lg bg-blueGray-100 ext-blue-700 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" required=""/>
                </div>
                <div className="mt-2 text-right">
                  {/* <a href="#" className="text-sm font-semibold leading-relaxed text-blueGray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a> */}
                </div>
                <button onClick={onClickLogIn}
                type="submit" className="bg-yellow-400 block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg  hover:bg-yellow-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black">Log In</button>
              {/* <p className="mt-8 text-center">Need an account? <a href="#" className="font-semibold text-blue-500 hover:text-blue-400">Sign Up</a></p> */}
              </div>
            </div>
  </section>

    </>
    // <SContainer>
    //   ログインがめん！！！！！！
    //   <SInput type="name" placeholder="name!!!!"
    //   value={name} onChange={onChangeName}/>
    //   <SInput type="password" placeholder="password"
    //   value={password} onChange={onChangePassword}/>
    //   <SButton onClick={onClickLogIn} >ログイン！！！</SButton>
    // </SContainer>
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
