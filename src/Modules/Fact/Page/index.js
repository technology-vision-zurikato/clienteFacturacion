import React from "react";
import {AuthContextProvider} from "../../../Modules/Auth/Content/AuthContext";
import Fac from "./fac"

export default () => {
    return (<AuthContextProvider>
        <Fac />
    </AuthContextProvider>)
}