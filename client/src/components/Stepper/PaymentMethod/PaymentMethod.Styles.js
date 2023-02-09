import styled from 'styled-components';



export const ContainerImagePayment = styled.div`
width: 12em;
height: 3em;
display:flex;
justify-content:center;


img{
    object-fit: cover;
    width:98%;
    height: 3em;
    
}
`
export const ContainerPaymentBtn = styled.div`
    display:flex;
    align-items:center;
    width:80em;
    height: 8em;
    margin-top: 5em;
    justify-content: space-evenly;

    button{
        border:none;
        background-color:transparent;
        padding: 5px;
    }
    button:hover{
       background-color: #ccc;
    }
`