import React from 'react'
import styled from 'styled-components';

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
  border-bottom:  ${props => props.selectStore ? '2px solid blue' : 'none'};
  
  &:hover {
    cursor: pointer;
  }
`;

const BuyRetail = styled.div`
  margin: 0 20px;
  padding-bottom:6px;
  border-bottom:  ${props => !props.selectStore ? '2px solid blue' : 'none'}
`;

const Options = ({handleSelectStore, selectStore}) => {

    const changeSelectStore = (state) => {
        handleSelectStore(state);
    }

    return <ContainerOptions>
        <BuyRetail onClick={()=>changeSelectStore(true)} selectStore={selectStore}>Compra en Retail</BuyRetail>
        <BuyStore onClick={()=>changeSelectStore(false)} selectStore={selectStore}>Compra en Mostrador</BuyStore>
    </ContainerOptions>
}

export default Options;