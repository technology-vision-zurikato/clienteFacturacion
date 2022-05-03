import React, {useState,useEffect} from 'react'
import axios from 'axios';
import baseUrl from "../../../Components/Utils/baseUrl";
import LoadingAllUser from "./LoadingAllUSer";
import styled from "styled-components";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';

const Container = styled.div`
`;

const FormUsuarios = ({handleShowFac}) => {

    const [loadingAllUsers,setLoadingAllUsers] = useState(false);
    const [loadingPaginate,setLoadingPaginate] = useState(false);

    const [allUsers,setAllUsers] = useState([]);

    const [storeId,setStoreId] = useState('');

    const [limit,setLimit] = useState(5);
    const [start,setStart] = useState(0);//

    const [stores,setStores] = useState([{key:0, value:'', text:'Seleccione'}]);

    const rolOptions = [
        {key:1, value:'1', text:'Usuario'},
        {key:2, value:'2', text:'Admin Tienda'},
        {key:3, value:'9', text:'Admin General'},
    ];

    useEffect(() => {
        getAllUsers();
        getAllStores();
    }, []);

    const getAllUsers = () => {
        setLoadingAllUsers(true);

        axios.post(baseUrl()+`/api_all_user`,{
            limit: limit,
            start: start,
        },{headers: {
            'token': 'Bearer ' + localStorage.getItem('localStoreToken')
        }})
            .then(function (response) {
                console.log(response.data.users);
                setAllUsers(response.data.users);
                setLoadingAllUsers(false);
            })
            .catch(function (error) {
                setLoadingAllUsers(false);
            });
    }

    const getAllStores = () => {
        axios.get(baseUrl()+`/api_stores`,{headers: {
                'token': 'Bearer ' + localStorage.getItem('localStoreToken')
            }})
            .then(function (response) {
                response.data.stores.map(r=>{setStores(oldArray => [...oldArray, {key: r.id, value: r.codigo, text: r.name}])});
            })
    }

    const goFirts = () => {
        setLoadingPaginate(true);
        axios.post(baseUrl()+`/api_all_user`,{
            limit: limit,
            start: 0,
        },{headers: {
                'token': 'Bearer ' + localStorage.getItem('localStoreToken')
            }})
            .then(function (response) {
                console.log(response.data.users);
                setAllUsers(response.data.users);
                setLoadingPaginate(false);
                setStart(0);
            })
            .catch(function (error) {
                setLoadingPaginate(false);
            });
    }

    const goNext = () => {
        console.log('Antes'+' '+start+' '+limit);
        const startTemp = start+5;
        console.log('Despues'+' '+startTemp);
        setLoadingPaginate(true);
        axios.post(baseUrl()+`/api_all_user`,{
            limit: limit,
            start: startTemp,
        },{headers: {
                'token': 'Bearer ' + localStorage.getItem('localStoreToken')
            }})
            .then(function (response) {
                console.log(response.data.users);
                setAllUsers(response.data.users);
                setLoadingPaginate(false);
                setStart(startTemp);
            })
            .catch(function (error) {
                setLoadingPaginate(false);
            });
    }

    const goPrevius = () => {
        const startTemp = start>=5 ? start-5 : 0;
        setLoadingPaginate(true);
        axios.post(baseUrl()+`/api_all_user`,{
            limit: limit,
            start: startTemp,
        },{headers: {
                'token': 'Bearer ' + localStorage.getItem('localStoreToken')
            }})
            .then(function (response) {
                console.log(response.data.users);
                setAllUsers(response.data.users);
                setLoadingPaginate(false);
                setStart(startTemp);
            })
            .catch(function (error) {
                setLoadingPaginate(false);
            });
    }

    const changeRole = (customer_id,role) => {
        allUsers.map(item=>{
            if(item.customer_id===customer_id)
            {
                item.role = role;
            }

        });
        const tempUsers = [];
        allUsers.map(item=>{
            tempUsers.push(item)
        });
        setAllUsers(tempUsers);

        if(role!='2')
        {
            axios.post(baseUrl()+`/api_change_role`,{
                role: role,
                customer_id: customer_id,
            },{headers: {
                    'token': 'Bearer ' + localStorage.getItem('localStoreToken')
                }})
                .then(function (response) {
                })
                .catch(function (error) {

                });
        }
    }

    const changeStore = (customer_id,store_id) => {
        allUsers.map(item=>{
            if(item.customer_id===customer_id)
            {
                item.store_id = store_id;
                item.role = '2';
            }

        });
        const tempUsers = [];
        allUsers.map(item=>{
            tempUsers.push(item)
        });
        setAllUsers(tempUsers);

        axios.post(baseUrl()+`/api_change_store`,{
            store_id: store_id,
            customer_id: customer_id,
        },{headers: {
                'token': 'Bearer ' + localStorage.getItem('localStoreToken')
            }})
            .then(function (response) {
            })
            .catch(function (error) {

        });

    }

    return ( <div className="flex flex-col">
        <Container className="flex flex-col overflow-y-auto rounded w-full bg-white overflow-auto h-full">
            {loadingAllUsers && <LoadingAllUser />}
            {!loadingAllUsers && <>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Correo</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Rol</th>
                        <th>Tienda</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loadingPaginate==false && allUsers.length>0 &&
                        allUsers.map((item) => {
                            return <tr>
                                <td>{item.email}</td>
                                <td>{item.names}</td>
                                <td>{item.last_names}</td>
                                <td>
                                    <select  value={item.role} onChange={event => changeRole(item.customer_id,event.target.value)}>
                                        {rolOptions.map(item=>{
                                            return <option key={item.key} value={item.value}>{item.text}</option>
                                        })}
                                    </select>
                                </td>
                                <td>
                                    {item.role==='2' && <select  value={item.store_id} onChange={event => changeStore(item.customer_id,event.target.value)}>
                                        {stores.map(store=>{
                                            return <option key={store.key} value={store.value}>{store.text}</option>
                                        })}
                                    </select>}
                                </td>
                            </tr>
                        }) }
                    {loadingPaginate==false && allUsers.length==0 && <tr><td colSpan="8">No existen Usuarios.</td></tr>}
                    {loadingPaginate==true && <tr>
                            <td colSpan="8">
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </td>
                        </tr>
                    }
                    </tbody>
                </Table>
                {loadingPaginate==false  && <div className="flex justify-center">
                    <Pagination>
                        <Pagination.First onClick={()=>{goFirts()}}/>
                        <Pagination.Prev onClick={()=>{goPrevius()}}/>
                        <Pagination.Next onClick={()=>{goNext()}}/>
                    </Pagination>
                </div>}
            </>
            }
        </Container>
    </div> )
};

export default FormUsuarios;