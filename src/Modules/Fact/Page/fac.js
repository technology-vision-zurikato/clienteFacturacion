import React, {useState,useRef} from "react";
import Styles from "../Style/style";
import FormStoreSearch from "../../UnAuthFact/Component/FormStoreSearch";
import FormStoreRetail from "../../UnAuthFact/Component/FormStoreRetail";
import FacInfo from "../../UnAuthFact/Component/FacInfo";
import FormFac from "../Component/FormFac";
import UnAuthFormFac from "../Component/UnAuthFormFac";
import Options from "../../UnAuthFact/Component/Options";
import AuthContainer from "../../../Components/AuthContainer/Page";
import {useAuth} from "../../../Modules/Auth/Content/AuthContext";


export default () => {
    const [selectStore, setSelectStore] = useState(true);
    const [showFac, setShowFac] = useState(false);
    const [total, setTotal] = useState(0);
    const [purchase, setPurchase] = useState(0);
    /*const [auth,setAuth] = useState(localStorage.getItem('localStoreAuth') || '' );*/
    const {Auth} = useAuth();

    const scroll = useRef();

    const [scrollTo, setScrollTo] = useState(0);




    const handleSelectStore = (state) => {
        setSelectStore(state);
        setShowFac(false);
    }

    const handleShowFac = (isFac,total,purchase_id) => {
        setShowFac(isFac);
        setTotal(total);
        setPurchase(purchase_id);
        console.log(total);
        console.log(scroll.current);
        scroll.current && scroll.current.scrollTo(0, scroll.current.scrollHeight);
    }

    return (<div className="overflow-y-auto h-screen" ref={scroll}><AuthContainer title="Sistema de Facturación Electrónica">

                    <Styles>
                        <Options handleSelectStore={handleSelectStore} selectStore={selectStore}/>
                        {selectStore && <FormStoreSearch handleShowFac={handleShowFac} fac={handleShowFac} />}
                        {!selectStore && <FormStoreRetail handleShowFac={handleShowFac} fac={handleShowFac} />}
                        {showFac && <FacInfo total={total} />}
                        {showFac && Auth.state.localStoreAuth=="true" && <FormFac purchase={purchase} />}
                        {/*showFac && Auth.state.localStoreAuth=="false" && <UnAuthFormFac purchase={purchase} />*/}
                    </Styles>

            </AuthContainer></div>)
}
