import React, {useEffect, useState} from 'react'
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import baseUrl from "../../../Components/Utils/baseUrl";
import { Redirect } from 'react-router-dom';
import BtnButton from "../../../Components/Button/BtnButton";
import Alert from "react-bootstrap/Alert";

const FormConfirmUser = () => {

    const [error,setError] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');
    const [loading,setLoading] = useState(false);

    const [rediretFac,setRediretFac] = useState(false);

    const [localStoreData, setLocalStoreData] = useState(
        localStorage.getItem('localStoreData') || ''
    );

    const [localStoreAuth, setLocalStoreAuth] = useState(
        localStorage.getItem('localStoreAuth') || ''
    );

    const [localStoreId, setLocalStoreId] = useState(
        localStorage.getItem('localStoreId') || ''
    );

    const [email,setEmail] = useState(localStorage.getItem('confirmEmail') || '');

    /*useEffect(() => {
        setEmail()
    }, []);*/

    const handleLoguin = (values) => {
        setLoading(true);
        axios.post(baseUrl()+'/api_activate_user', {
            email: email,
            code_id: values.code,
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
                    localStorage.setItem('localStoreAuth', "true");
                    setLocalStoreData(response.data.names);
                    setLocalStoreId(response.data.customer_id);
                    setLocalStoreAuth("true");
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
        onSubmit={values=>handleLoguin(values)}
        validate={values => {
            const errors = {}
            if (!values.code) {
                errors.code = 'Campo requerido'
            }

            return errors
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form" onSubmit={handleSubmit}>
                <Alert variant="primary">
                    Hemos enviado a su correo electrónico un código de confirmación, por favor ingréselo para continuar con su registro.
                </Alert>
                {error && <Alert variant="danger">
                    {errorMsg}
                </Alert>}
                {rediretFac && <Redirect to="/uifac/recurrente/fact" />}
                <Field name="code">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>Código de confirmación</label>
                            <input {...input} type="text" placeholder="Código" />
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

export default FormConfirmUser;