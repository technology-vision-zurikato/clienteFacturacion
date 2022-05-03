import React, {useEffect, useState} from "react";
import LightBlueBackground from "../../../assets/Img/light-blue-background.jpg";
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

export default props => {

    const [redirectFact, setRedirectFact] = useState(false);

    return <div className="flex flex-col min-h-screen">
        {redirectFact && <Redirect to="/uifac/expres" />}
        <div className="flex justify-center mt-3 text-2xl"><Button onClick={()=>setRedirectFact(true)} variant="outline-primary">Facturación electrónica</Button></div>
        <div className="flex justify-center text-center mt-1 mb-3 text-2xl lg:text-3xl">{props.title}</div>
        <div className="flex justify-center">
            <div className="flex justify-center w-4/5 lg:w-1/3 md:w-2/3 sm:w-2/3 flex-col">
                {props.children}
            </div>
        </div>
    </div>
}