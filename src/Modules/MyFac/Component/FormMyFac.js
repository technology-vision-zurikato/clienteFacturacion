import React, {useState,useEffect} from 'react'
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import baseUrl from "../../../Components/Utils/baseUrl";
import {NavLink, Redirect} from 'react-router-dom';
import LoadingMyFac from "./LoadingMyFac";
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



const Container = styled.div`
    
`;

const FormLoguin = ({handleShowFac}) => {

    const [error,setError] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');

    const [success,setSuccess] = useState(false);
    const [successMsg,setSuccessMsg] = useState('');

    const [rediretFac,setRediretFac] = useState(false);

    const [loadingMyFac,setLoadingMyFac] = useState(false);

    const [myFac,setMyFac] = useState([]);

    const [customer,setCustomer] = useState(localStorage.getItem('localStoreId') || '' );

    useEffect(() => {
        getMyFac();
    }, []);

    const getMyFac = () => {
        setLoadingMyFac(true);

        axios.get(baseUrl()+`/api_myfac/${customer}`)
            .then(function (response) {
                console.log(response.data.acounts);
                setMyFac(response.data.myfac);
                setLoadingMyFac(false);
            })
            .catch(function (error) {
                setLoadingMyFac(false);
            });
    }

    return ( <div className="flex flex-col">
        <Container className="flex flex-col overflow-y-auto rounded w-full bg-white overflow-auto h-64">
            {loadingMyFac && <LoadingMyFac />}
            {!loadingMyFac && <>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Facturaro a</th>
                        <th>RFC</th>
                        <th>Total</th>
                        <th>Fecha</th>
                        <th>XML</th>
                        <th>PDF</th>
                    </tr>
                    </thead>
                    <tbody>
                    {myFac.length>0 ?
                        myFac.map((item) => {
                            return <tr>
                                <td>{item.names}</td>
                                <td>{item.rfc}</td>
                                <td>{item.total}</td>
                                <td>{item.date}</td>
                                <td flex justify-center><a target="_blank"  href={baseUrl()+`/assets/timbradotest/timbrados/${item.purchase_id}.xml`} className="cursor-pointer" download><File width="18" height="18" /></a></td>
                                <td flex justify-center><a target="_blank"  href={baseUrl()+`/assets/timbradotest/timbrados/${item.purchase_id}.pdf`} className="cursor-pointer" download><FilePdf width="18" height="18" /></a></td>
                            </tr>
                        }) : <tr><td colSpan="6">No existen datos.</td></tr> }
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