import React from 'react';
import styled from 'styled-components'

export const Footer = () => {
  return(
    <>
    <SContainer>
      {/* <SButton>ログイン</SButton>
      <SButton>ログアウト</SButton> */}
      <STexst>&copy;title Inc.</STexst>
    </SContainer>
    </>
  )
}
const SContainer = styled.footer`
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #81C784;
  bottom: 0;
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
const STexst = styled.p`
  color: #FFCCBC;
  display: inline-block;
  margin: 0 auto;
  `
