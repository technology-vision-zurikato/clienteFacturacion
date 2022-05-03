import React, {useRef, useState} from "react";
import Styles from "../Style/style";
import FormStoreSearch from "../Component/FormStoreSearch";
import FormStoreRetail from "../Component/FormStoreRetail";
import FacInfo from "../Component/FacInfo";
import UnAuthFormFac from "../Component/UnAuthFormFac";
import Options from "../Component/Options";
import UnAuthContainer from "../../../Components/UnAuthContainer/Page";
import AuthContainer from "../../../Components/AuthContainer/Page";

export default () => {
    const [selectStore, setSelectStore] = useState(false);
    const [showFac, setShowFac] = useState(false);
    const [total, setTotal] = useState(0);
    const [purchase, setPurchase] = useState(0);
    const scroll = useRef();

    const handleSelectStore = (state) => {
        setSelectStore(state);
        setShowFac(false);
    }

    const handleShowFac = (isFac,total,purchase_id) => {
        setShowFac(isFac);
        setTotal(total);
        setPurchase(purchase_id);
        console.log(total);
        scroll.current && scroll.current.scrollTo(0, scroll.current.scrollHeight);
    }

    return (<div className="overflow-y-auto h-screen" ref={scroll}><UnAuthContainer title="Sistema de Facturación Electrónica CFDI 3.3">
                <Styles>
                    <Options handleSelectStore={handleSelectStore} selectStore={selectStore}/>
                    {selectStore && <FormStoreSearch handleShowFac={handleShowFac} fac={handleShowFac} />}
                    {!selectStore && <FormStoreRetail handleShowFac={handleShowFac} fac={handleShowFac} />}
                    { showFac && <FacInfo total={total}  />}
                    {showFac && <UnAuthFormFac purchase={purchase}/>}
                </Styles>
    </UnAuthContainer></div>)
}
