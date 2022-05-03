import React from "react";
import Styles from "../Style/style";
import UnAuthContainer from "../../../Components/UnAuthContainer/Page";
import Alert from "react-bootstrap/Alert";

export default () => {


    return (<UnAuthContainer title="Sistema de Facturación Electrónica CFDI 3.3">
        <Styles>
            <Alert variant="primary" className="text-xl">
                Su compra ha sido facturada con éxito, se le ha enviado a su correo electrónico  una copia de su factura.
            </Alert>
        </Styles>
    </UnAuthContainer>)
}