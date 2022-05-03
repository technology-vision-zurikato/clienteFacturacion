import React, {useState,useEffect} from 'react'
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import baseUrl from "../../../Components/Utils/baseUrl";
import {NavLink, Redirect} from 'react-router-dom';
import LoadingAcount from "./LoadingAcount";
import {Edit}  from '@styled-icons/material/Edit';
import {Delete}  from '@styled-icons/material/Delete';
import {Cancel}  from '@styled-icons/material/Cancel';
import styled from "styled-components";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {HandThumbsUp} from '@styled-icons/bootstrap/HandThumbsUp';
import BtnButton from "../../../Components/Button/BtnButton";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';



const Container = styled.div`
    
`;

const FormLoguin = ({handleShowFac}) => {

    const [error,setError] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');

    const [success,setSuccess] = useState(false);
    const [successMsg,setSuccessMsg] = useState('');

    const [rediretFac,setRediretFac] = useState(false);

    const [loadingAcount,setLoadingAcount] = useState(false);

    const [loading,setLoading] = useState(false);

    const [acounts,setAcounts] = useState([]);

    const [acountsCreated,setAcountsCreated] = useState(false);

    const [acountToDelete,setAcountToDelete] = useState(null);

    const [acount,setAcount] = useState({id:'',names:'',rfc:''});

    /*const [localStoreData, setLocalStoreData] = useState(
        localStorage.getItem('localStore') || ''
    );*/

    const [customer,setCustomer] = useState(localStorage.getItem('localStoreId') || '' );

    useEffect(() => {
       console.log(customer);
    }, []);

    useEffect(() => {
        getAcount();
    }, [acountsCreated]);

    const getAcount = () => {
        setLoadingAcount(true);

        axios.get(baseUrl()+`/api_acounts/${customer}`)
            .then(function (response) {
                console.log(response.data.acounts);
                setAcounts(response.data.acounts);
                setLoading(false);
                setLoadingAcount(false);
                /*if(response.data.error)
                {
                    setErrorMsg(response.data.errorMsg);
                    setError(true);
                }
                else
                {
                    console.log(response.data.names);
                    setLocalStoreData(response.data.names);
                    setRediretFac(true);
                }*/
            })
            .catch(function (error) {
                setLoading(false);
                setLoadingAcount(false);
                /*setErrorMsg('Error, contacte al administrador');
                setError(true);*/
            });
    }

    const handleCreateAcount = (values) => {
        setLoading(true);
        setLoadingAcount(true);
        if(acount.id==='')
        {
            return axios.post(baseUrl()+'/api_acount_create', {
                names: values.names,
                email: values.email,
                rfc: values.rfc,
                customer_id: customer
            })
                .then(function (response) {
                    if(response.data.error)
                    {
                        setErrorMsg(response.data.errorMsg);
                        setError(true);
                        setLoading(false);
                        setLoadingAcount(false);
                    }
                    else
                    {
                        setAcountsCreated(!acountsCreated);
                        setError(false);
                        setSuccessMsg(response.data.errorSuccess);
                        setSuccess(true);
                        setAcount({id:'',names:'',rfc:'',email:''});
                    }
                })
                .catch(function (error) {
                    setErrorMsg('Error, contacte al administrador');
                    setError(true);
                    setLoading(false);
                    setLoadingAcount(false);
                });
        }
        else
        {
            return axios.post(baseUrl()+'/api_acount_edit', {
                names: values.names,
                email: values.email,
                rfc: values.rfc,
                id: acount.id
            })
                .then(function (response) {
                    if(response.data.error)
                    {
                        setErrorMsg(response.data.errorMsg);
                        setError(true);
                        setLoading(false);
                        setLoadingAcount(false);
                    }
                    else
                    {
                        setAcountsCreated(!acountsCreated);
                        setError(false);
                        setSuccessMsg(response.data.errorSuccess);
                        setSuccess(true);
                        setAcount({id:'',names:'',rfc:'',email:''});
                    }
                })
                .catch(function (error) {
                    setErrorMsg('Error, contacte al administrador');
                    setError(true);
                    setLoading(false);
                    setLoadingAcount(false);
                });
        }


    }

    const handleDeleteAcount = (acount_id) => {
        setLoadingAcount(true);
        axios.post(baseUrl()+'/api_acount_delete', {
            acount_id: acount_id,
        })
            .then(function (response) {
                if(response.data.error)
                {
                    setErrorMsg(response.data.errorMsg);
                    setError(true);
                }
                else
                {
                    setAcountsCreated(!acountsCreated);
                    setError(false);
                    setLoadingAcount(false);
                    setLoading(false);
                    setSuccessMsg(response.data.errorSuccess);
                    setSuccess(true);
                }
            })
            .catch(function (error) {
                setErrorMsg('Error, contacte al administrador');
                setError(true);
                setLoadingAcount(false);
                setLoading(false);
            });
        /*return new Promise(resolve => {
            setTimeout(resolve, 2000);
        })*/
    }

    const onSubmit = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        })
    }

    const Reset = styled.div`
      &:hover {
        padding-bottom:6px;
        border-bottom: 2px solid blue;
      }
    `;

    return ( <div className="flex flex-col">
        {acount.id!='' && <div className="flex flex-col justify-center">
            <div>
                <Alert variant="warning">
                    Está editando un pefil de cliente. Pinche en Cancelar para crear un nuevo perfil
                </Alert>
            </div>
        </div>}
        <Form
        initialValues={{
            id: acount.id,
            names: acount.names,
            rfc: acount.rfc,
            email: acount.email
        }
        }
        onSubmit={values=>handleCreateAcount(values)}
        validate={values => {
            const errors = {}
            if (!values.names) {
                errors.names = 'Campo requerido'
            }

            if (!values.rfc) {
                errors.rfc = 'Campo requerido'
            }

            if (!values.email) {
                errors.rfc = 'Campo requerido'
            }

            return errors
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form w-full" onSubmit={event =>{
                const promise = handleSubmit(event);
                if(promise){
                    promise.then(() => {
                        form.reset();
                        form.resetFieldState('names');
                        form.resetFieldState('rfc');
                        form.resetFieldState('email');
                    })
                    return promise;
                }
            }}>
                {error && <Alert variant="danger">
                    {errorMsg}
                </Alert>}
                {success && <Alert variant="primary">
                    {successMsg}
                </Alert>}
                {rediretFac && <Redirect to="/" />}
                <div className="container flex w-full md:flex-row sm:flex-col xs:flex-col">
                    <Field name="names">
                        {({ input, meta }) => (
                            <div className="container-div xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full xs-w-full">
                                <label>Facturar a: (Nombre o Razón Social)</label>
                                <input {...input} type="text" placeholder="Facturar a" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Field name="rfc">
                        {({ input, meta }) => (
                            <div className="container-div xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-full xs-w-full">
                                <label>Rfc</label>
                                <input {...input} type="text" placeholder="Rfc" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Field name="email">
                        {({ input, meta }) => (
                            <div className="container-div xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-full xs-w-full">
                                <label>Correo</label>
                                <input {...input} type="text" placeholder="Correo" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                </div>
                <div className="buttons">
                    {acount.id!='' && <Button variant="outline-danger" onClick={()=>{
                        setAcount({id:'', names: '', rfc:''});
                        setError(false);
                        setErrorMsg('');
                        setSuccess(false);
                        setSuccessMsg('');
                    }}>Cancelar</Button>} <BtnButton className="ml-3" loading={loading}>Guardar</BtnButton>
                </div>

            </form>
        )}
    />
        <Container className="flex flex-col w-full  bg-white  overflow-auto h-64">
            {loadingAcount && <LoadingAcount />}
            {!loadingAcount &&  <>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>FACTURAR A: (NOMBRE O RAZÓN SOCIAL)</th>
                        <th>RFC</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {acounts.length>0 ? acounts.map((item) => {
                        return <tr>
                            <td>{item.names}</td>
                            <td>{item.rfc}</td>
                            <td>{item.email}</td>
                            {acountToDelete!=item.id && <td className="flex flex-row justify-center"> <div className="text-green-600 cursor-pointer" onClick={()=>{setAcount({id:item.id,names:item.names,rfc:item.rfc,email:item.email})}}><Edit width={20} height={20}/></div> <div className="text-red-600 cursor-pointer" onClick={()=>{setAcountToDelete(item.id)}}><Delete width={20} height={20}/></div></td>}
                            {acountToDelete==item.id && <td className="flex flex-row justify-center"> <div className="text-red-600 cursor-pointer pr-1" onClick={()=>handleDeleteAcount(item.id)}><HandThumbsUp width={20} height={20}/>Yes</div><div className="text-black-600 cursor-pointer " onClick={()=>setAcountToDelete(null)}><Cancel width={20} height={20}/>No</div></td>}

                        </tr>
                    }) : <tr><td colSpan="6">No existen datos.</td></tr>
                    }
                    </tbody>
                </Table>
            </>
            }
            {/*!loadingAcount && acounts.length==0 && <>
                <div className="flex flex-row w-full justify-center items-center">
                    <div className="flex text-xl">No existen datos.</div>
                </div>
            </>
            */}
        </Container>
    </div> )
};

export default FormLoguin;