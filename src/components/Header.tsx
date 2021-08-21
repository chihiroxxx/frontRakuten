import React, { useContext, useState, VFC } from 'react';
import styled from 'styled-components'
import { BrowserRouter, Link, Switch, Route, useHistory } from 'react-router-dom'
import axios from 'axios';
import { MainContext } from '../providers/Provider';
import { SideMenu } from './SideMenu';

export const Header: VFC = () => {
  const { configAxios, loginFlag, setLoginFlag,railsUrl } = useContext(MainContext);

  const history = useHistory();

  const onClickLogOut = (): void => {
    axios.delete(`${railsUrl}/logout`,configAxios)
    .then((res) => {
      setLoginFlag(() => false)
      history.push("/")

    })
    .catch(error => {
    });

  }
  // メニューバー！
    const [menuFlag, setMenuFlag] = useState<boolean>(false);

    const  onClickMenu = (): void => {
      setMenuFlag(!menuFlag)
    }

  return(
      <>
    <div className="container items-center -mb-1">
    <div className="text-ind-700 rounded-lg">
      <div className="w-screen flex justify-between md:justify-start  p-5 mx-auto md:items-center md:flex-row">
        <a href="/" className="pr-2 md:pr-8 md:px-6 focus:outline-none">
          <div className="inline-flex items-center">
            <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr bg-indigo-700 ">
            </div>
            <h2 className="block p-2 text-xl font-medium tracking-tighter text-black transition duration-500 ease-in-out transform cursor-pointer hover:text-indigo-900 md:text-x md:mr-8"> MEMENTO TIME </h2>
          </div>
        </a>

        {/* メニューバー */}
        <nav className="hidden md:block flex flex-wrap items-center justify-center text-base md:mr-auto">
          <ul className="items-center inline-flex list-none md:inline-flex">
            <li>
            <Link to="/">
              <div className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-white hover:bg-indigo-900 ">
                HOME</div>
                </Link>
            </li>
            <li>
            <Link to="/login">
            <div className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-white hover:bg-indigo-900 ">
                LOG IN</div>
                </Link>
            </li>
            { loginFlag &&
            <>
            <li>
              <div onClick={onClickLogOut} className="cursor-pointer px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-white hover:bg-indigo-900 ">
                LOG OUT</div>
            </li>
            <li>
            <Link to="/index">
              <div className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-white hover:bg-indigo-900 ">
                INDEX</div>
                </Link>
            </li>
            </>}
          </ul>
        </nav>

        <div onClick={onClickMenu}
        className="relative md:hidden pl-10 flex w-20 h-10 z-40">
              <button
              className="">
                <svg className="text-gray-900  w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>



        </div>
              {menuFlag &&
              <>
              <div className="absolute z-30 top-20 right-0">
              <SideMenu setMenuFlag={setMenuFlag} onClickLogOut={onClickLogOut} loginFlag={loginFlag}/>

              </div>
              </>
              }
        {/* <button className="w-auto px-8 py-2 my-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:b-gblue-700 ">Button </button> */}
      </div>
    </div>
  </div>
  <div className="bg-gray-900 h-5"></div>
  {/* <SideMenu /> */}
</>

  )
  // return(
  //   <>
  //   <header className="h-14 bg-indigo-300 flex items-center space-x-4 ">
  //     <p style={{color: "#fff"}}>sssss</p>
  //   {/* <div className="">
  //     <div className="w-20 bg-yellow-500 h-4"></div>
  //   </div> */}
  //   <div className="space-x-3 relative hidden md:block">

  //   <Link to="/">
  //     <button className="bg-white p-3 m-3 rounded-full text-yellow-400  hover:text-white hover:bg-indigo-900">HOME</button>
  //     {/* <button className="bg-white p-3 m-3 text-yellow-400 hover:text-white hover:bg-indigo-900" style={{borderRadius: "16px"}}>HOME</button> */}
  //   </Link>
  //   <Link to="/login">
  //   <button className="bg-white p-3 m-3 rounded-full text-yellow-400  hover:text-white hover:bg-indigo-900">LOG IN</button>
  //   </Link>
  //   { loginFlag ?
  //   <>
  //   <button onClick={onClickLogOut}>LOG OUT</button>
  //   <Link to="/index">
  //   <button>INDEX</button>
  //   </Link>
  //   </>
  //     : false
  //   }

  //   </div>

  //   {/* <MenuList /> */}
  //   <div className="flex items-center space-x-7">
  //     <div className="w-20 bg-yellow-500 h-4"></div>
  //   <h1 className="text-yellow-800 text-3xl font-mono mx-auto w-full" >MEMENTO TIME</h1>
  //     <div className="w-20 bg-yellow-500 h-4"></div>

  //   </div>
  //   </header>
  //   </>
  // )
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
