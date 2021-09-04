import axios from 'axios'
import React, { ChangeEvent, useContext, useState, VFC } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import { MainContext } from '../providers/Provider';
import ErrorMessage from './ErrorMessage';
import LoginInputItem from './LoginInputItem';

export const Lonin: VFC = () => {
  const { name, setName, password, setPassword, configAxios, loginFlag, setLoginFlag, railsUrl, userId, setUserId } = useContext(MainContext);


  const history = useHistory();

  const onClickLogIn = (): void => {
    axios.post(`${railsUrl}/login`,{
      name: name,
      password: password
    },configAxios).then((res) => {

      setUserId(res.data.user_id);
      history.push("/index")
      setName(() => (""))
      setPassword(() => (""))
      setLoginFlag(() => true)
    })
    .catch((error) => {
      console.log(error)
      // alert("ログインできません...（Usernameとpasswordをご確認ください...）")
    });

  }
// const [errorFlag, setErrorFlag] = useState<boolean>(false);
  //新規登録用！！！
  let errorMessage;
  const onClickSignUp = ():void => {
    axios.post(`${railsUrl}/users`,{
        name: name,
        password: password
      },configAxios).then((res) => {
        setUserId(res.data.user_id);
        history.push("/index")
        setName(() => (""))
        setPassword(() => (""))
        setLoginFlag(() => true)
      })
      .catch((error) => {
        // document.querySelector('main')?.addEventListener()
        // console.log(error)
        // alert("作成できません...（名前は小文字英数字16文字以内でお願いします）")
        // てかさ送る前にバリデーションかけよ？？？
      });
  }


  const [signupFlag, setSignupFlag] = useState<boolean>(true)

  const onClickCangeSignupFlag = ():void => {
    setSignupFlag(!signupFlag)
    // ここでifなんとかでbuttonName返せば良さそう！
    // let toggleBottonName

    // if (signupFlag) {
    //   toggleBottonName = "Sign Up?"
    // } else {
    //   toggleBottonName = "Log In?"
    // }
    // return toggleBottonName
  }
  // console.log(window.location.href)


  // const axiostest :string = `${location.href}:3000`

  return(
    <>
<section
className="flex flex-col items-center h-screen md:flex-row ">
            <div className="relative hidden w-full h-screen bg-blueGray-400 lg:block md:w-1/3 xl:w-1/3">
              <img src="https://source.unsplash.com/random" alt="" className="absolute object-cover w-full h-full"/>
              {/* <img src="https://dummyimage.com/300x600/F3F4F7/000000" alt="" className="absolute object-cover w-full h-full"/> */}
              <div className="relative z-10 m-12 text-left">
                <a className="flex items-center w-32 mb-4 font-medium text-blueGray-900 title-font md:mb-10">
                  {/* <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600">
                  </div> */}
                  {/* <h2 className="text-lg font-bold tracking-tighter text-black uppercase transition duration-500 ease-in-out transform hover:text-lightBlack-500 dark:text-lightBlue-400"> Wickedblocks </h2> */}
                </a>
              </div>
            </div>

            <div className="flex w-full h-screen px-6 bg-whitelack md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 items-left justify-left">
              <div className="mt-6">

  {signupFlag ?

          <>

            <LoginInputItem acitonTitle="Log In" onClickAciton={onClickLogIn} actionComment="Welcome Back to MEMENTO TIME!" />

            <div onClick={onClickCangeSignupFlag}
              className="text-indigo-600 cursor-pointer mt-3">{signupFlag  && "Sign Up?" }</div>


            </>
  :
<>
  <LoginInputItem acitonTitle="Sign Up" onClickAciton={onClickSignUp} actionComment="Welcome to MEMENTO TIME!" />


  <div onClick={onClickCangeSignupFlag}
              className="text-indigo-600 cursor-pointer mt-3">{!signupFlag  && "Log In?" }</div>
            </>
}
              </div>
            </div>

</section>

    </>
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
