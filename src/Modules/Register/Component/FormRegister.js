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

    /*const renderRedirect = () => {
        if (rediretConfirmUser) {
            return <Redirect to='/uifac/confirmuser' />
        }
    }*/

    const handleRegister = (values) => {
        setLoading(true);
        axios.post(baseUrl()+'/api_user_signup', {
            names: values.names,
            lastNames: values.lastNames,
            email: values.email,
            password: values.password,
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

    const [date, setDate] = useState(new Date());
    return <Form
        onSubmit={values=>handleRegister(values)}
        validate={values => {
            const errors = {}
            if (!values.names) {
                errors.names = 'Campo requerido';
            }

            if (!values.lastNames) {
                errors.lastNames = 'Campo requerido';
            }

            if (!values.email) {
                errors.email = 'Campo requerido';
            }

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
                {rediretConfirmUser && <Redirect to="/uifac/recurrente/confirmuser" />}
                {error && <Alert variant="danger">
                    {errorMsg}
                </Alert>}
                <Field name="names">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>Nombres</label>
                            <input {...input} type="text" placeholder="Nombres" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

                <Field name="lastNames">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>Apellidos</label>
                            <input {...input} type="text" placeholder="Apellidos" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

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

                <Field name="repeatPassword">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>Confirme su contraseña </label>
                            <input {...input} type="password" placeholder="Contraseña" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>
                <div className="buttons">
                    <div className="buttons">
                        <BtnButton loading={loading}>Aceptar</BtnButton>
                    </div>
                </div>
            </form>
        )}
    />
};

export default FormRegister;