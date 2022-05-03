import React from 'react'
import styled from 'styled-components';

const Style = styled.div`
  margin-top: 20px;
  font-size:3rem;
  color: black;
`;

const FacInfo = (props) => {
    const {total} = props;
    return <Style>
        {total}$
    </Style>
}

export default FacInfo;


