import styled from 'styled-components';

export const Container = styled.div`
 
  display:flex;
  flex-direction:column;  
  height: 100%;
  width: 100%;
  img{  
    object-fit: cover;
    width: 8em;
    height: 15em;
  }
  button{
    margin-top:1em;
    width:10em;
  }
`
export const ContImage = styled.div`
  width:100%;
  height:52%;
  display:flex;
  justify-content:center;
  
`