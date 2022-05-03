import React, {useEffect, useState} from 'react'
import { Form, Field } from 'react-final-form'
import axios from "axios";
import baseUrl from "../../../Components/Utils/baseUrl";
import BtnButton from "../../../Components/Button/BtnButton";

/*const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmitFac = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}*/

const FormFac = (props) => {
    const {purchase} = props;

    const [loading,setLoading] = useState(false);

    const [error,setError] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');

    const [success,setSuccess] = useState(false);
    const [successMsg,setSuccessMsg] = useState('');

    const [acounts,setAcounts] = useState([]);
    const [auth,setAuth] = useState(localStorage.getItem('localStoreAuth') || '' );
    const [customer,setCustomer] = useState(localStorage.getItem('localStoreId') || '' );
    const [factData,setFactData] = useState({names:'', rfc:''} );

    const [cfdi,setCfdi] = useState('' );

    const onSubmitFac = (state) => {

    }

    useEffect(() => {
        getAcount();
    }, []);

    useEffect(() => {
        console.log(factData)
    }, [factData]);

    const getAcount = () => {
        axios.get(baseUrl()+`/api_acounts/${customer}`)
            .then(function (response) {
                console.log(response.data.acounts);
                setAcounts(response.data.acounts);
            })
            .catch(function (error) {

            });
    }

    const onSubmitSearch = (values) => {
        //handleShowFac(state);
        setSuccess(false);
        setError(false);
        setLoading(true);
        axios.post(baseUrl()+'/api_generate_invoice', {
            names: values.names,
            rfc: values.rfc,
            email: values.email,
            purchase_id: purchase,
            cfdi: cfdi
        })
            .then(function (response) {
                setLoading(false);
                if(response.data.error)
                {
                    setError(true);
                    setErrorMsg(response.data.errorMsg);
                }
                else
                {
                    setSuccess(true);
                    setSuccessMsg('Su compra ha sido facturada con exito, se le ha enviado a su correo una copia de los datos de timbrado !')

                }
            })
            .catch(function (error) {
                setLoading(false);
                setError(true);
                setErrorMsg('Error al facturar, revice que haya introducido un RFC válido, si el error persiste contacte al Administrador !');
            });
    }

    const Condition = ({ when, is, children }) => (
        <Field name={when} subscription={{ value: true }}>
            {({ input: { value } }) => (value === is ? children : null)}
        </Field>
    )

    const FormGroupAdapter = ({ input, inputOnChange }) => {

        const inputProps = {

            ...input,

            onChange: e => {

                input.onChange(e);

                inputOnChange && inputOnChange(e);

            }

        };



        return <input {...inputProps} />;

    };

    const eatOptions = [
        {key:0, value:'', text:'Seleccione'},
        {key:1, value:'P01', text:'P01 Por definir'},
        {key:2, value:'G01', text:'G01 Adquisición de mercancias'},
        {key:3, value:'G02', text:'G02 Devoluciones, descuentos o bonificaciones'},
        {key:4, value:'G03', text:'G03 Gastos en general'},
        {key:5, value:'I01', text:'I01 Construcciones'},
        {key:6, value:'I02', text:'I02 Moviliario y equipos de oficina por inversiones'},
        {key:7, value:'I03', text:'I03 Equipo de transporte'},
        {key:8, value:'I04', text:'I04 Equipo de computo y accesorios'},
        {key:9, value:'I05', text:'I05 Datos, troqueles, moldes, matrices y herramiental'},
        {key:10, value:'I06', text:'I06 Comunicaciones telefónicas'},
        {key:11, value:'I07', text:'I06 Comunicaciones satelitales'},
        {key:12, value:'I08', text:'I07 Otra maquinaria y equipo'},
    ]
    return  <div className="flex flex-col">
    <Form
        initialValues={{
            auth: auth,

            }
        }
        auth={auth}
        acounts={acounts}
        onSubmit={values=>onSubmitSearch(values)}
        validate={values => {
            const errors = {}
            if (!values.names) {
                errors.names = 'Campo requerido'
            }
            if (!values.rfc) {
                errors.rfc = 'Campo requerido'
            }
            if (!values.email) {
                errors.email = 'Campo requerido'
            }

            return errors
        }}



        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form" onSubmit={handleSubmit}>
                {error && <div className="flex text-lg justify-center text-red-600">{errorMsg}</div>}
                {success && <div className="flex text-lg justify-center text-blue-600">{successMsg}</div>}
                <Field name="names">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>Facturar a: (Nombre o Razón Social)</label>
                            <input {...input} type="text" placeholder="Facturar a" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>
                <Field name="rfc">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>Rfc</label>
                            <input {...input} type="text" placeholder="Rfc" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>
                <Field name="email">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>Correo</label>
                            <input {...input} type="email" placeholder="Correo" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>
                <Field name="cfdi" options={eatOptions}>
                    {({ input, meta, options }) => (
                        <div className="container-div">
                            <label>Uso de CFDI</label>
                            <select onChange={(event)=>{
                                setCfdi(event.target.value);
                            }}>
                                {options.map(item=>{
                                    return <option key={item.key} value={item.value}>{item.text}</option>
                                })}
                            </select>
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>
                <div className="buttons">
                    <BtnButton loading={loading}>Guardar</BtnButton>
                </div>
            </form>
        )}
    />
    </div>

};

export default FormFac;