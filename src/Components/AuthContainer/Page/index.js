import React, {useEffect, useState} from "react";
import LightBlueBackground from "../../../assets/Img/light-blue-background.jpg";
import styled, { css } from "styled-components";
import {NavLink, Redirect} from 'react-router-dom';
import {Menu}  from '@styled-icons/entypo/Menu';
import {Profile}  from '@styled-icons/icomoon/Profile';
import {LogoutBox} from '@styled-icons/remix-line/LogoutBox';
import {FactCheck} from '@styled-icons/material-outlined/FactCheck';
import {SaveOutline} from '@styled-icons/evaicons-outline/SaveOutline';
import {LockPassword} from '@styled-icons/remix-line/LockPassword';


import {useAuth} from "../../../Modules/Auth/Content/AuthContext";
import Button from "react-bootstrap/Button";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";
import baseUrl from "../../Utils/baseUrl";



const Facturar = styled(NavLink)`
  &:hover {
    padding-bottom:6px;
    cursor: pointer;
    border-bottom: 2px solid blue;
  }
  
  &.active{
    padding-bottom:6px;
    border-bottom: 2px solid blue;
  }
  
`;

const Loguin = styled(NavLink)`
  &:hover {
    padding-bottom:6px;
    cursor: pointer;
    border-bottom: 2px solid blue;
  }
  
  &.active{
    padding-bottom:6px;
    border-bottom: 2px solid blue;
  }
`;

const Register = styled(NavLink)`
  &:hover {
    padding-bottom:6px;
    cursor: pointer;
    border-bottom: 2px solid blue;
  }
  
  &.active{
    padding-bottom:6px;
    border-bottom: 2px solid blue;
  }
`;

const Acount = styled(NavLink)`
  &:hover {
    padding-bottom:6px;
    border-bottom: 2px solid blue;
    text-decoration: none;
  }
`;

const Fac = styled(NavLink)`
  &:hover {
    padding-bottom:6px;
    border-bottom: 2px solid blue;
    text-decoration: none;
  }
`;

const MenuItem = styled.div`
  &:hover {
    padding-bottom:6px;
    border-bottom: 2px solid blue;
    text-decoration: none;
  }
`;

export default props => {
    const {Auth} = useAuth();

    const [localStoreData, setLocalStoreData] = useState(
        localStorage.getItem('localStoreData') || ''
    );

    const [localStoreId, setLocalStoreId] = useState(
        localStorage.getItem('localStoreId') || ''
    );

    const [localStoreAuth, setLocalStoreAuth] = useState(
        localStorage.getItem('localStoreAuth') || "false"
    );

    const [localStoreRole, setLocalStoreRole] = useState(
        localStorage.getItem('localStoreRole') || "false"
    );

    const [showMenu, setShowMenu] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const [storeStatus, setStoreStatus] = useState("2");

    const [loadingStoreStatus, setLoadingStoreStatus] = useState(false);
    const [updatingStoreStatus, setUpdatingStoreStatus] = useState(false);

    useEffect(() => {
        localStorage.setItem('localStoreData', localStoreData);
    }, [localStoreData]);

    useEffect(() => {
        console.log(localStoreAuth);
        localStorage.setItem('localStoreAuth', localStoreAuth);
    }, [localStoreAuth]);

    useEffect(() => {
        localStorage.setItem('localStoreId', localStoreId);
    }, [localStoreId]);

    useEffect(() => {
        localStorage.setItem('localStoreRole', localStoreRole);
        if(localStoreRole==='2')
            getStoreStatus();
    }, [localStoreRole]);

    const handleLogout = () => {
        setLocalStoreData('');
        setLocalStoreAuth("false");
        setLocalStoreId('');
        setRedirect(true);
        Auth.mutations.setLocalStoreAuth("false");
        Auth.mutations.setLocalStoreId("");
        Auth.mutations.setLocalStoreData("");
        Auth.mutations.setLocalStoreToken("");
        localStorage.clear();
    }

    const changeStoreStatus = () => {
        setUpdatingStoreStatus(true);
        axios.post(baseUrl()+`/api_change_store_status`,{
            status: storeStatus=="1" ? "2" : "1",
        },{headers: {
                'token': 'Bearer ' + localStorage.getItem('localStoreToken')
            }})
            .then(function (response) {
                getStoreStatus();
                setUpdatingStoreStatus(false);
            })
            .catch(function (error) {
                setUpdatingStoreStatus(false);
            });
    }

    const [redirectFact, setRedirectFact] = useState(false);

    const getStoreStatus = () => {
        setLoadingStoreStatus(true);
        axios.get(baseUrl()+`/api_store_status`,{headers: {
                'token': 'Bearer ' + localStorage.getItem('localStoreToken')
            }})
            .then(function (response) {
                setStoreStatus(response.data.storeStatus);
                setLoadingStoreStatus(false);
            })
    }

    return <div className="flex flex-col min-h-screen content-start px-2" /*style={{backgroundImage: `url(${LightBlueBackground})`}}*/>
        {redirect  && <Redirect to="/uifac/recurrente" />}
        <div className="flex justify-center my-1  flex-row mt-3 items-center">
            <Button href="http://www.dipepsa.com.mx/" variant="outline-primary">Home</Button>
            {localStoreAuth==="true" && <div className="xs:pl-5 sm:pl-2 md:pl-4 lg:pl-5 xl:pl-5 text-base sm:text-lg font-bold">Bienvenido: {localStoreData}</div>}
            {localStoreAuth==="true" && <div className="pl-2 font-medium relative cursor-pointer" >
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setShowMenu(false);console.log('akiiiiiiiiii');
                    }}
                >
                    <Menu width="35" height="35" onClick={()=>{setShowMenu(!showMenu)}}/>
                    {showMenu && <div className="flex flex-col flex-no-wrap w-56 absolute top-0 right-0 mt-8 -mr-6 p-4 bg-white z-50
                    rounded border-2 border-solid border-gray-700 cursor-auto">
                        {localStoreRole && localStoreRole==='9' && <div className="flex flex-row cursor-pointer items-center mb-2"><SaveOutline width="18" height="18" /> <Fac to="/uifac/recurrente/alluser" className="flex ml-2">Todas los Usuarios</Fac></div>}
                        {localStoreRole && localStoreRole==='9' && <div className="flex flex-row cursor-pointer items-center mb-2"><SaveOutline width="18" height="18" /> <Fac to="/uifac/recurrente/allfac" className="flex ml-2">Todas las Facturas</Fac></div>}
                        {localStoreRole && localStoreRole==='2' && <div className="flex flex-row cursor-pointer items-center mb-2"><SaveOutline width="18" height="18" /> <Fac to="/uifac/recurrente/allfac" className="flex ml-2">Facturas de mi Tienda</Fac></div>}
                        <div className="flex flex-row cursor-pointer items-center mb-2"><FactCheck width="18" height="18" /> <Fac to="/uifac/recurrente/fact" className="flex ml-2">Facturar</Fac></div>
                        <div className="flex flex-row cursor-pointer items-center mb-2"><SaveOutline width="18" height="18" /> <Fac to="/uifac/recurrente/myfac" className="flex ml-2">Mis Facturas</Fac></div>
                        <div className="flex flex-row cursor-pointer items-center mb-2"><Profile width="18" height="18" /> <Acount to="/uifac/recurrente/acount" className="flex ml-2">Clientes</Acount></div>
                        <div className="flex flex-row cursor-pointer items-center mb-2"><LockPassword width="18" height="18" /> <Acount to="/uifac/recurrente/changepassword" className="flex ml-2">Cambiar Contraseña</Acount></div>
                        {localStoreRole && localStoreRole==='2' && !loadingStoreStatus && !updatingStoreStatus && <div className="flex flex-row cursor-pointer items-center mb-2"><SaveOutline width="18" height="18" /> <MenuItem className="flex ml-2" onClick={()=>changeStoreStatus()}>{storeStatus=="2" ? "Habilitar Tienda" : "Deshabilitar Tienda" }</MenuItem></div>}
                        {localStoreRole && localStoreRole==='2'  && updatingStoreStatus && <div className="flex flex-row cursor-pointer items-center mb-2"><SaveOutline width="18" height="18" /> Procesando datos ....</div>}
                        <div className="flex flex-row cursor-pointer items-center"><LogoutBox width="18" height="18" /> <MenuItem className="flex ml-2" onClick={()=>handleLogout()}>Salir</MenuItem></div>
                    </div>}
                </OutsideClickHandler>
            </div>}

        </div>
        <div className="flex justify-center text-center mb-8 text-2xl lg:text-3xl">{props.title}</div>
        <div className="flex justify-center">
            <div className="flex justify-center w-4/5 lg:w-2/3 md:w-2/3 sm:w-2/3 xs:w-full flex-col">
                {props.children}
            </div>
        </div>
    </div>
}