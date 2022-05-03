import React from "react";
import AuthTableContainer from "../../../Components/AuthTableContainer/Page";
import Styles from "../../Fact/Style/style";
import FormMyFac from "../Component/FormMyFac";
import UnAuthAccess from "../../UnAuthAccess/Page/";
import {AuthContextProvider} from "../../Auth/Content/AuthContext";


export default () => {
    const auth = localStorage.getItem('localStoreAuth');
    return <><AuthContextProvider>
        {auth=="true" && <AuthTableContainer title="Sistema de Facturación Electrónica CFDI 3.3">
            <Styles>
                <FormMyFac />
            </Styles>
        </AuthTableContainer>}
        {auth=="false" && <UnAuthAccess/>}
        </AuthContextProvider>
    </>
}