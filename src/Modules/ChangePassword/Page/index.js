import React from "react";
import AuthContainer from "../../../Components/AuthContainer/Page";
import Styles from "../../Fact/Style/style";
import ChangePassword from "../Component/ChangePassword";


export default () => {
    return <AuthContainer title="Sistema de Facturación Electrónica CFDI 3.3">
        <Styles>
            <ChangePassword />
        </Styles>
    </AuthContainer>
}