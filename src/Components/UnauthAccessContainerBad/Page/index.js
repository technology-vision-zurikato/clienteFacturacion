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
  }
`;

const Fac = styled(NavLink)`
  &:hover {
    padding-bottom:6px;
    border-bottom: 2px solid blue;
  }
`;

const MenuItem = styled.div`
  &:hover {
    padding-bottom:6px;
    border-bottom: 2px solid blue;
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

    const [showMenu, setShowMenu] = useState(false);

    const [redirect, setRedirect] = useState(false);

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

    const handleLogout = () => {
        setLocalStoreData('');
        setLocalStoreAuth("false");
        setLocalStoreId('');
        setRedirect(true);
        Auth.mutations.setLocalStoreAuth("false");
        Auth.mutations.setLocalStoreId("");
        Auth.mutations.setLocalStoreData("");
        localStorage.clear();
    }

    return <div className="flex flex-col min-h-screen content-start" style={{backgroundImage: `url(${LightBlueBackground})`}}>
        {redirect  && <Redirect to="/uifac" />}
        <div className="flex justify-center my-1 flex-row items-center">
            {localStoreAuth=="false" && <div className="px-3"><Facturar exact to="/uifac" activeClassName="active">Facturar</Facturar></div>}
            {localStoreAuth=="false" && <div className="px-3"><Loguin exact to="/uifac/loguin" activeClassName="active">Entrar</Loguin></div>}
            {localStoreAuth=="false" && <div className="px-3"><Register exact to="/uifac/register">Registro</Register></div>}
            {localStoreAuth==="true" && <div className="px-3 text-lg font-bold">Bienvenido: {localStoreData}</div>}
            {localStoreAuth==="true" && <div className="pl-5 font-medium relative cursor-pointer" >
                <Menu width="35" height="35" onClick={()=>{setShowMenu(!showMenu)}}/>
                {showMenu && <div className="flex flex-col flex-no-wrap w-56 absolute top-0 right-0 mt-8 -mr-6 p-4 bg-white z-50
                rounded border-2 border-solid border-gray-700 cursor-auto">
                    <div className="flex flex-row cursor-pointer items-center mb-2"><FactCheck width="18" height="18" /> <Fac to="/uifac" className="flex ml-2">Facturar</Fac></div>
                    <div className="flex flex-row cursor-pointer items-center mb-2"><SaveOutline width="18" height="18" /> <Fac to="/uifac/myfac" className="flex ml-2">Mis Facturas</Fac></div>
                    <div className="flex flex-row cursor-pointer items-center mb-2"><Profile width="18" height="18" /> <Acount to="/uifac/acount" className="flex ml-2">Clientes</Acount></div>
                    <div className="flex flex-row cursor-pointer items-center mb-2"><LockPassword width="18" height="18" /> <Acount to="/uifac/changepassword" className="flex ml-2">Cambiar Contraseña</Acount></div>
                    <div className="flex flex-row cursor-pointer items-center"><LogoutBox width="18" height="18" /> <MenuItem className="flex ml-2" onClick={()=>handleLogout()}>Salir</MenuItem></div>
                </div>}
            </div>}

        </div>
        <div className="flex justify-center my-3 text-2xl lg:text-3xl">{props.title}</div>
        <div className="flex justify-center">
            <div className="flex justify-center w-4/5 lg:w-1/3 md:w-2/3 sm:w-2/3 flex-col">
                {props.children}
            </div>
        </div>
    </div>
}