import React from 'react';
import styled from 'styled-components'

export const Footer = () => {
  return(
    <>
<div className=" h-28">

<div class="w-full items-center fixed bottom-0 right-0">
            <footer class="text-blueGray-700 transition duration-500 ease-in-out transform  ">
              <div class="h-11 flex justify-between flex-col p-1 mx-auto md:items-center md:flex-row">
                <div className="fixed right-0 ">

                <a href="/" class="pr-2 lg:pr-8 lg:px-6 focus:outline-none">
                  <div class="inline-flex items-center">
                    <div class="block p-2 text-base tracking-tighter text-black transition duration-500 ease-in-out transform cursor-pointer hover:text-blueGray-500 lg:text-x lg:mr-8">
                       &copy; memento time. </div>
                  </div>
                </a>
                </div>







              </div>
            </footer>
          </div>
</div>

    {/* <SContainer> */}
      {/* <SButton>ログイン</SButton>
      <SButton>ログアウト</SButton> */}


      {/* <div className="fixed bottom-0 bg-indigo-900 w-full h-12">&copy;title Inc.</div> */}
    {/* </SContainer> */}
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
