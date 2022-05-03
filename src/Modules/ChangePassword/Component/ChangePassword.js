import React, {useState,useEffect} from 'react'
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import baseUrl from "../../../Components/Utils/baseUrl";
import {NavLink, Redirect} from 'react-router-dom';
import styled from "styled-components";
import BtnButton from "../../../Components/Button/BtnButton";
import Alert from "react-bootstrap/Alert";

const FormLoguin = ({handleShowFac}) => {

    const [error,setError] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');

    const [rediretFac,setRediretFac] = useState(false);

    const [customer,setCustomer] = useState(localStorage.getItem('localStoreId') || '' );
    const [loading,setLoading] = useState(false);

    const handleChangePassword = (values) => {
        setLoading(true);
        axios.post(baseUrl()+'/api_change_password', {
            customer_id: customer,
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
                    setRediretFac(true);
                }
            })
            .catch(function (error) {
                setLoading(false);
                setErrorMsg('Error, contacte al administrador');
                setError(true);
            });
    }

    return <Form
        onSubmit={values=>handleChangePassword(values)}
        validate={values => {
            const errors = {}

            if (!values.password) {
                errors.password = 'Campo requerido';
            }

            if (!values.repeatPassword) {
                errors.repeatPassword = 'Campo requerido';
            }

            if (values.repeatPassword!=values.password) {
                errors.repeatPassword = 'Las contraseñas no coinciden';
            }

            return errors
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form" onSubmit={handleSubmit}>

                {error && <Alert variant="danger">
                    {errorMsg}
                </Alert>}
                {rediretFac && <Redirect to="/uifac/recurrente/fact" />}
                <Field name="password">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>Ingrese su Nueva Contraseña</label>
                            <input {...input} type="password" placeholder="Contraseña" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

                <Field name="repeatPassword">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label> Confirme su Nueva Contraseña </label>
                            <input {...input} type="password" placeholder="Contraseña" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>
                <div className="buttons">
                    <BtnButton loading={loading}>Aceptar</BtnButton>
                </div>
            </form>
        )}
    />
};

export default FormLoguin;