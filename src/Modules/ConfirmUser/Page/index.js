import React from "react";
import UnAuthContainer from "../../../Components/UnAuthContainer/Page";
import Styles from "../../Fact/Style/style";
import ConfirmUSer from "../Component/FormConfirmUser";


export default () => {
    return <UnAuthContainer title="Sistema de Facturación Electrónica CFDI 3.3">
        <Styles>
            <ConfirmUSer />
        </Styles>
    </UnAuthContainer>
}