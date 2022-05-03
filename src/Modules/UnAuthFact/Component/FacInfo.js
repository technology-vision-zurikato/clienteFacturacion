import React from 'react'
import styled from 'styled-components';

const Style = styled.div`
  margin-top: 20px;
  font-size:3rem;
  color: black;
`;

const FacInfo = (props) => {
    const {total} = props;
    return <div className="flex flex-col justify-center">
        <div className="text-blue-600 text-3xl">Verifique el total de su compra</div>
        <div className="text-black text-2xl">${parseFloat(total).toFixed(2)}</div>
    </div>
}

export default FacInfo;


