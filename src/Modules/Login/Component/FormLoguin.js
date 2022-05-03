import React, {useState,useEffect} from 'react'
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import baseUrl from "../../../Components/Utils/baseUrl";
import {NavLink, Redirect} from 'react-router-dom';
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import BtnButton from "../../../Components/Button/BtnButton"
import Alert from "react-bootstrap/Alert";

const FormLoguin = ({handleShowFac}) => {

    const [error,setError] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');

    const [rediretFac,setRediretFac] = useState(false);

    const [rediretGetPassword,setRediretGetPassword] = useState(false);

    const [rediretConfirmUser,setRediretConfirmUser] = useState(false);

    const [loading,setLoading] = useState(false);

    const [localStoreData, setLocalStoreData] = useState(
        localStorage.getItem('localStoreData') || ''
    );

    const [localStoreAuth, setLocalStoreAuth] = useState(
        localStorage.getItem('localStoreAuth') || ''
    );

    const [localStoreId, setLocalStoreId] = useState(
        localStorage.getItem('localStoreId') || ''
    );

    const GetPassword = styled(NavLink)`
      &:hover {
        padding-bottom:6px;
        border-bottom: 2px solid blue;
      }
    `;

    const ActiveUser = styled(NavLink)`
      &:hover {
        padding-bottom:6px;
        border-bottom: 2px solid blue;
      }
    `;

    const handleLoguin = (values) => {
        setLoading(true);
        axios.post(baseUrl()+'/api_do_login', {
            email: values.email,
            password: values.password,
        })
            .then(function (response) {
                setLoading(false);
                if(response.data.error)
                {
                    setErrorMsg(response.data.errorMsg);
                    setError(true);
                }
                else
                {
                    localStorage.setItem('localStoreData', response.data.names);
                    localStorage.setItem('localStoreId', response.data.customer_id);
                    localStorage.setItem('localStoreRole', response.data.role);
                    localStorage.setItem('localStoreToken', response.data.token);
                    localStorage.setItem('localStoreAuth', "true");
                    console.log(response.data.customer_id);
                    setLocalStoreData(response.data.names);
                    setLocalStoreId(response.data.customer_id);
                    setLocalStoreAuth("true");
                    setRediretFac(true);
                }
            })
            .catch(function (error) {
                setErrorMsg('Error, contacte al administrador');
                setError(true);
                setLoading(false);
            });
    }

    return <Form
        onSubmit={values=>handleLoguin(values)}
        validate={values => {
            const errors = {}
            if (!values.email) {
                errors.email = 'Campo requerido'
            }

            if (!values.password) {
                errors.password = 'Campo requerido'
            }

            return errors
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <>
            <form className="form" onSubmit={handleSubmit}>
                {error && <Alert variant="danger">
                    {errorMsg}
                </Alert>}
                {rediretFac && <Redirect to="/" />}
                {rediretGetPassword && <Redirect to="/uifac/recurrente/resetpassword" />}
                {rediretFac && <Redirect to="/uifac/recurrente/fact" />}
                <Field name="email">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>Correo</label>
                            <input {...input} type="text" placeholder="Correo" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

                <Field name="password">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>Contraseña</label>
                            <input {...input} type="password" placeholder="Contraseña" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>
                <div className="buttons">
                    <BtnButton loading={loading}>Aceptar</BtnButton>
                </div>
            </form>
            <div className="flex flex-row justify-content-end text-xs"><Button size="sm" className="text-sm" onClick={()=>setRediretGetPassword(true)} variant="outline-primary">Olvidé mi contraseña</Button>{/*<Button className="ml-2 text-xs" onClick={()=>setRediretConfirmUser(true)} variant="outline-primary">Activar Usuario</Button>*/}</div>
            </>
        )}
    />
};

export default FormLoguin;