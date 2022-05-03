import React from "react";
import Styles from "../Style/style";
import AuthContainer from "../../../Components/AuthContainer/Page";
import Alert from "react-bootstrap/Alert";

export default () => {


    return (<AuthContainer title="Sistema de Facturación Electrónica CFDI 3.3">
        <Styles>
            <Alert variant="primary" className="text-xl">
                Su compra ha sido facturada con éxito, si desea revisar sus facturas, seleccione la opción del menu "Mis Facturas".
            </Alert>
        </Styles>
    </AuthContainer>)
}