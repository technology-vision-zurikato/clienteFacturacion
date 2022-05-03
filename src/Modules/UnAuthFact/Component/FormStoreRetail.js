import React, {useEffect, useState} from 'react'
import { Form, Field } from 'react-final-form'
import DatePicker from "react-date-picker";
import ComboStore from "../Component/ComboStore";
import axios from "axios";
import baseUrl from "../../../Components/Utils/baseUrl";
import BtnButton from "../../../Components/Button/BtnButton";
import Alert from "react-bootstrap/Alert";

const FormStoreRetail = ({fac}) => {

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

    const [stores,setStores] = useState([{key:0, value:'', text:'Seleccione'}]);

    /*const eatOptions = [
        {key:0, value:'', text:'Seleccione'},
        {key:1, value:'001', text:'Sucursal 001'},
        {key:2, value:'018', text:'Sucursal 018'},

    ];*/

    useEffect(() => {
        getAllStoresOpened();
    }, []);

    const getAllStoresOpened = () => {
        axios.get(baseUrl()+`/api_stores_open`)
            .then(function (response) {
                response.data.stores.map(r=>{setStores(oldArray => [...oldArray, {key: r.id, value: r.codigo, text: r.name}])});
            })
    }

    const onSubmitSearch = (values) => {
        //handleShowFac(state);
        setLoading(true);
        const fullDate = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
        const month = date.getMonth() + 1;
        const fullMonth = month < 10 ? '0'+month : month;
        axios.post(baseUrl()+'/api_purchase_treptail', {
            store_id: storeId,
            ticked: values.ticked,
            date: date.getFullYear()+'-'+fullMonth+'-'+fullDate,
            tretail: 1,
            caja: values.caja,

        })
            .then(function (response) {
                setLoading(false);
                if(response.data.error)
                {
                    setErrorMsg(response.error);
                    setError(true);
                    setErrorMsg(response.data.errorMsg);
                    console.log('error');
                    fac(false,0);
                }
                else
                {
                    setError(false);
                    fac(true,response.data.purchase.total,response.data.purchase.purchase_id);
                }
            })
            .catch(function (error) {
                setErrorMsg('Error, contacte al administrador');
                setError(true);
                //fac(false,'0');
                fac(false,0);
                setLoading(false);
            });
    }
    const [date, setDate] = useState(new Date());
    const [storeId, setStoreId] = useState('');
    return <Form
        onSubmit={values=>onSubmitSearch(values)}
        validate={values => {
            const errors = {}
            if(storeId==='')
            {
                errors.store_id = 'Campo requerido';
            }
            if(!date)
            {
                errors.date = 'Campo requerido';
            }
            if (!values.ticked) {
                errors.ticked = 'Campo requerido';
            }
            if (!values.caja) {
                errors.caja = 'Campo requerido';
            }

            return errors
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form" onSubmit={handleSubmit}>
                {error && <Alert variant="danger">
                    {errorMsg}
                </Alert>}
                <Field name="date">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>Fecha</label>
                            {/*<DatePicker className="container-date-picker" onChange={dt => setDate(dt)} value={date} disabled = {true}/>*/}
                            <DatePicker className="container-date-picker" onChange={dt => setDate(dt)} value={date} />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>
                <Field name="store_id">
                    {({ input, meta, options }) => (
                        <div className="container-div">
                            <label>Sucursal</label>
                            <select onChange={event => setStoreId(event.target.value)} value={storeId}>
                                {stores.map(item=>{
                                    return <option key={item.key} value={item.value}>{item.text}</option>
                                })}
                            </select>
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

                <Field name="ticked">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>No. de Ticket</label>
                            <input {...input} type="text" placeholder="No. de Ticket" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>
                <Field name="caja">
                    {({ input, meta }) => (
                        <div className="container-div">
                            <label>No. de Caja</label>
                            <input {...input} type="text" placeholder="No. de Caja" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>
                <div className="buttons">
                    <div className="buttons">
                        <BtnButton loading={loading}>Buscar</BtnButton>
                    </div>
                </div>
            </form>
        )}
    />
};

export default FormStoreRetail;