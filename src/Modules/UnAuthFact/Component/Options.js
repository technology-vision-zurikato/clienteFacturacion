import React from 'react'
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const ContainerOptions = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  
  &:hover {
    cursor: pointer;
  }
`;

const BuyStore = styled.div`
  margin: 0 20px;
  padding-bottom:6px;
  
  &:hover {
    cursor: pointer;
  }
`;

const BuyRetail = styled.div`
  margin: 0 20px;
  padding-bottom:6px;
  
`;

const Options = ({handleSelectStore, selectStore}) => {

    const changeSelectStore = (state) => {
        handleSelectStore(state);
    }

    return <ContainerOptions>
        <BuyStore>{selectStore ? <Button variant="primary">Compra en Mostrador</Button> : <Button onClick={()=>changeSelectStore(true)} variant="outline-primary">Compra en Mostrador</Button>}</BuyStore>
        <BuyRetail>{selectStore ? <Button onClick={()=>changeSelectStore(false)} variant="outline-primary">Compra en Retail</Button> : <Button  variant="primary">Compra en Retail</Button>}</BuyRetail>
    </ContainerOptions>
}

export default Options;