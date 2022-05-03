import React, {useState,useEffect} from 'react'
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import baseUrl from "../../../Components/Utils/baseUrl";
import {NavLink, Redirect} from 'react-router-dom';
import LoadingAllFac from "./LoadingAllFac";
import {Edit}  from '@styled-icons/material/Edit';
import {Delete}  from '@styled-icons/material/Delete';
import {Cancel}  from '@styled-icons/material/Cancel';
import styled from "styled-components";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {HandThumbsUp} from '@styled-icons/bootstrap/HandThumbsUp';
import {File} from '@styled-icons/boxicons-regular/File';
import {FilePdf} from '@styled-icons/fa-solid/FilePdf';
import {SaveOutline} from "@styled-icons/evaicons-outline/SaveOutline";
import Table from 'react-bootstrap/Table';
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import BtnButton from "../../../Components/Button/BtnButton";
import DatePicker from "react-date-picker";



const Container = styled.div`
    
`;

const FormLoguin = ({handleShowFac}) => {

    const [error,setError] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');

    const [success,setSuccess] = useState(false);
    const [successMsg,setSuccessMsg] = useState('');

    const [rediretFac,setRediretFac] = useState(false);

    const [loadingAllFac,setLoadingAllFac] = useState(false);

    const [allFac,setAllFac] = useState([]);
    const [cantidad,setCantidad] = useState([]);
    const [totalpesos,setTotalPesos] = useState([]);

    const [customer,setCustomer] = useState(localStorage.getItem('localStoreId') || '' );

    const [storeId,setStoreId] = useState('');

    const [typePurchase,setTypePurchase] = useState('');

    const [date,setDate] = useState(new Date());

    const [stores,setStores] = useState([{key:0, value:'', text:'Seleccione'}]);

    //const [dateParse, setDateParse] = useState(date.getFullYear()+'-'+fullMonth+'-'+fullDate);

    useEffect(() => {
        getAllStoresOpened();
    }, []);

    useEffect(() => {
        getAllFac();
    }, [storeId, typePurchase, date]);

    const getAllFac = () => {
        setLoadingAllFac(true);
        let parseDate = '';
        if(date)
        {
            const fullDate = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
            const month = date.getMonth() + 1;
            const fullMonth = month < 10 ? '0'+month : month;
            parseDate = date.getFullYear()+'-'+fullMonth+'-'+fullDate;
        }


        axios.post(baseUrl()+`/api_allfac`,{
            store_id: storeId,
            type_purchase: typePurchase,
            date: parseDate
        },{headers: {
            'token': 'Bearer ' + localStorage.getItem('localStoreToken')
        }})
            .then(function (response) {
                console.log(response.data.acounts);
                setAllFac(response.data.allfac);
                setCantidad(response.data.cantidad);
                setTotalPesos(response.data.totalpesos);
                setLoadingAllFac(false);
            })
            .catch(function (error) {
                setLoadingAllFac(false);
            });
    }

    const getAllStoresOpened = () => {
        axios.get(baseUrl()+`/api_customer_store_open`,{headers: {
                'token': 'Bearer ' + localStorage.getItem('localStoreToken')
            }})
            .then(function (response) {
                response.data.stores.map(r=>{setStores(oldArray => [...oldArray, {key: r.id, value: r.codigo, text: r.name}])});
            })
    }

    const handleCreateAcount = (values) => {

    }

    const eatOptions = [
        {key:0, value:'', text:'Seleccione'},
        {key:1, value:'001', text:'Sucursal 001'},
        {key:2, value:'018', text:'Sucursal 018'},

    ];

    const tupePurchaseOptions = [
        {key:0, value:'', text:'Seleccione'},
        {key:1, value:'1', text:'Tretail'},
        {key:2, value:'0', text:'Mostrador'},

    ];

    return ( <div className="flex flex-col">
        <Form

            onSubmit={values=>handleCreateAcount(values)}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form className="form w-full">
                    <div className="container flex w-full md:flex-row sm:flex-col xs:flex-col">
                        <Field name="store_id">
                            {({ input, meta, options }) => (
                                <div className="container-div xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-full xs-w-full">
                                    <label>Sucursal</label>
                                    <select onChange={event => {setStoreId(event.target.value);}} value={storeId}>
                                        {stores.map(item=>{
                                            return <option key={item.key} value={item.value}>{item.text}</option>
                                        })}
                                    </select>
                                </div>
                            )}
                        </Field>
                        <Field name="type_purchase">
                            {({ input, meta, options }) => (
                                <div className="container-div xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-full xs-w-full">
                                    <label>Facturado en</label>
                                    <select onChange={event => setTypePurchase(event.target.value)} value={typePurchase}>
                                        {tupePurchaseOptions.map(item=>{
                                            return <option key={item.key} value={item.value}>{item.text}</option>
                                        })}
                                    </select>
                                </div>
                            )}
                        </Field>
                        <Field name="date">
                            {({ input, meta }) => (
                                <div className="container-div xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-full xs-w-full">
                                    <label>Fecha</label>
                                    <DatePicker className="container-date-picker" onChange={dt => setDate(dt)} value={date} />
                                </div>
                            )}
                        </Field>
                    </div>
                </form>
            )}
        />
        <Container className="flex flex-col overflow-y-auto rounded w-full bg-white overflow-auto h-80">
            <div>
                <label className="mr-1 bg-yellow-200 p-2 rounded">Total facturadas: {cantidad}</label>
                <label className="bg-yellow-200 p-2 rounded">Total: ${totalpesos}</label>
            </div>

            {loadingAllFac && <LoadingAllFac />}
            {!loadingAllFac && <>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Sucursal</th>
                        <th>Facturado en</th>
                        <th>Facturado a</th>
                        <th>RFC</th>
                        <th>Total</th>
                        <th>Fecha</th>
                        <th>XML</th>
                        <th>PDF</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allFac.length>0 ?
                        allFac.map((item) => {
                            return <tr>
                                <td>{item.store}</td>
                                <td>{item.tretail==1 ? 'Tretail' : 'Mostrador'}</td>
                                <td>{item.names}</td>
                                <td>{item.rfc}</td>
                                <td>{item.total}</td>
                                <td>{item.date}</td>
                                <td flex justify-center><a target="_blank" href={baseUrl()+`/assets/timbradotest/timbrados/${item.purchase_id}.xml`} className="cursor-pointer"><File width="18" height="18" /></a></td>
                                <td flex justify-center><a target="_blank" href={baseUrl()+`/assets/timbradotest/timbrados/${item.purchase_id}.pdf`} className="cursor-pointer"><FilePdf width="18" height="18" /></a></td>
                            </tr>
                        }) : <tr><td colSpan="8">No existen datos.</td></tr> }
                    </tbody>
                </Table>
            </>
            }
            {/*!loadingMyFac && myFac.length==0 && <>
                <div className="flex flex-row w-full justify-center items-center">
                    <div className="flex text-xl">No existen datos.</div>
                </div>
            </>*/
            }
        </Container>
    </div> )
};

export default FormLoguin;