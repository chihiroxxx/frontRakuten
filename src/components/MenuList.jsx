import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MainContext } from '../providers/Provider'


export const MenuList = () => {
  const [flag, setFlag ] = useState(true)
  const SList = styled.li`
    display: ${ flag ? "none" : "block" };
    padding: 8px 0 ;
  `
  const onClickMenu = () => {
    setFlag(!flag)
  }
  const onMouseOutMenu = () => {
    setFlag(false)
  }





// いつものところ
const { loginFlag } = useContext(MainContext);

  const SMenuButton = styled.button`
  background-color: #FAFAFA;
  border: none;
  padding: 8px;
  border-radius: 8px;
  /* margin: 0 10px; */
  color: #81C784;
  &:hover {
    cursor: pointer;
    background-color: #FFCCBC;
    color: #FAFAFA;
  }
  `
  const SButton = styled.button`
  background-color: #FAFAFA;
  border: none;
  padding: 8px;
  /* z-index: 200; */
  /* border-radius: 8px; */
  /* margin: -20px 0; */
  /* width: 80px; */
  color: #81C784;
  &:hover {
    cursor: pointer;
    background-color: #FFCCBC;
    color: #FAFAFA;
  }
  `

const SContainer = styled.div`
  margin: 30px 10px 10px 10px;
  height: 50px;
`




  return(
    <SContainer>
      {/* <h1>menuuuuuu</h1> */}
      <SMenuButton onMouseEnter={onClickMenu} onMouseOut={onMouseOutMenu}>MENU</SMenuButton>

      <SList><Link to="/">
      <SButton>HOME</SButton>
      </Link></SList>
      <SList>
    <Link to="/login">
      <SButton>LOG IN</SButton>
    </Link>


      </SList>
    { loginFlag ?
    <>
    {/* <SButton onClick={onClickLogOut}>LOG OUT</SButton> */}
    <SList>
    <Link to="/index">
    <SButton>INDEX</SButton>
    </Link>


    </SList>
    </>
      : false
    }
        {/* <SList><a href="#">coffee</a></SList>
        <SList>tea</SList>
        <SList>cake</SList> */}
    </SContainer>
  )
}


// const colorRed = "#adf4ff"
