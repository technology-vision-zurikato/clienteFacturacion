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

const Loguin = styled.div`
  margin: 0 20px;
  padding-bottom:6px;
  
  &:hover {
    cursor: pointer;
  }
`;

const Register = styled.div`
  margin: 0 20px;
  padding-bottom:6px;
  
`;

const Options = ({handleAccess, selectAccess}) => {

    const changeSelectAccess = (state) => {
        handleAccess(state);
    }

    return <ContainerOptions>
        <Register>{selectAccess ? <Button variant="primary">Registre una cuenta</Button> : <Button onClick={()=>changeSelectAccess(true)} variant="outline-primary">Registre una cuenta</Button>}</Register>
        <Loguin>{selectAccess ? <Button onClick={()=>changeSelectAccess(false)} variant="outline-primary">Ya estoy registrado</Button> : <Button  variant="primary">Ya estoy registrado</Button>}</Loguin>
    </ContainerOptions>
}

export default Options;