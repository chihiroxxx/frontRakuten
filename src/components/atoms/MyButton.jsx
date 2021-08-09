import styled from 'styled-components'



export const MyButton = (props) => {
  const { children } = props
  return(
    <SButton>{ children }</SButton>
  )
}



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
