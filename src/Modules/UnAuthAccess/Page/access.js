import React, {useState} from "react";
import Styles from "../Style/style";
import Options from "../Component/Options";
import UnAuthAccessContainer from "../../../Components/UnAuthAccessContainer/Page";
import Login from "../../Login/Page";
import Register from "../../Register/Page";


export default () => {
    const [selectAccess, setSelectAccess] = useState(false);

    const handleAccess = (state) => {
        setSelectAccess(state);
    }

    return (<UnAuthAccessContainer title="Sistema de Facturación Electrónica CFDI 3.3">
                <Styles>
                    <Options handleAccess={handleAccess} selectAccess={selectAccess}/>
                    {!selectAccess && <Login />}
                    {selectAccess && <Register />}
                    {/* showFac && <FacInfo total={total}  />*/}
                    {/*showFac && <UnAuthFormFac purchase={purchase}/>*/}
                </Styles>
            </UnAuthAccessContainer>)
}
