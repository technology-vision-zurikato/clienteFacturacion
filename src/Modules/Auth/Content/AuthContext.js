import React, {createContext, useContext, useState} from "react";
import {Redirect} from "react-router-dom";

const AuthContext = createContext();

const AuthContextProvider = props => {

    const [localStoreData, setLocalStoreData] = useState(
        localStorage.getItem('localStoreData') || ''
    );

    const [localStoreId, setLocalStoreId] = useState(
        localStorage.getItem('localStoreId') || ''
    );

    const [localStoreAuth, setLocalStoreAuth] = useState(
        localStorage.getItem('localStoreAuth') || "false"
    );

    const [localStoreRole, setLocalStoreRole] = useState(
        localStorage.getItem('localStoreRole') || ''
    );

    const [localStoreToken, setLocalStoreToken] = useState(
        localStorage.getItem('localStoreToken') || ''
    );

    const instanceAuth = {
        Auth: {
            state: {
                localStoreData,
                localStoreId,
                localStoreAuth,
                localStoreRole,
                localStoreToken
            },
            mutations: {
                setLocalStoreData,
                setLocalStoreId,
                setLocalStoreAuth,
                setLocalStoreRole,
                setLocalStoreToken
            }
        }
    };

    return (<>
        {localStoreToken=='' && <Redirect to="/uifac/recurrente" />}
        <AuthContext.Provider value={instanceAuth}>
            {props.children}
        </AuthContext.Provider></>
    )
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        return {}
    }
    return context
};

export {
    AuthContextProvider,
    AuthContext,
    useAuth
};