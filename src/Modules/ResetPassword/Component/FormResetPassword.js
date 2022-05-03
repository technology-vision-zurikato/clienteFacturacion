import React, {useState} from 'react';
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import baseUrl from "../../../Components/Utils/baseUrl";
import { Redirect } from 'react-router-dom'
import BtnButton from "../../../Components/Button/BtnButton";
import Alert from "react-bootstrap/Alert";

const FormRegister = ({handleShowFac}) => {

    const [error,setError] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');

    const [rediretConfirmUser,setRediretConfirmUser] = useState(false);
    const [loading,setLoading] = useState(false);

    const handleResetPassword = (values) => {
        setLoading(true);
        axios.post(baseUrl()+'/api_do_reset_password', {
            email: values.email,
        })
        .then(function (response) {
            console.log(response.data);
            setLoading(false);
            if(response.data.error)
            {
                setErrorMsg(response.data.errorMsg);
                setError(true);
            }
            else
            {
                localStorage.setItem('confirmEmail', values.email);
                setRediretConfirmUser(true);
            }
        })
        .catch(function (error) {
            setLoading(false);
            setErrorMsg('Error, contacte al administrador');
            setError(true);
        });
    }


    return <Form
        onSubmit={values=>handleResetPassword(values)}
        validate={values => {
            const errors = {}
            if (!values.email) {
                errors.email = 'Campo requerido';
            }
            return errors
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form" onSubmit={handleSubmit}>
                {rediretConfirmUser && <Redirect to="/uifac/recurrente/activeuser" />}
                {error && <Alert variant="danger">
                    {errorMsg}
                </Alert>}
                <Field name="email">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>Correo</label>
                            <input {...input} type="text" placeholder="Correo" />
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

export default FormRegister;