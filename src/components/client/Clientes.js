import React, { useEffect, useState, Fragment, useContext } from 'react';

//IMPORTAR CLIENTE AXIOS PARA LAS URL
import clienteAxios from '../../config/axios';

import Cliente from './Cliente';

import { Link, withRouter } from 'react-router-dom';

import Spinner from '../layout/Spinner';

//IMPORTAR EL CONTEXT
import {CRMContext} from '../../context/CRMContext';

const Clientes = (props) => {

    //TRABAJAR CON EL STATE
    //CLIENTES = STATE ==> SE GUARDAN LAS CONSULTAS A LA API
    //GUARDARCLIENTES = FUNCION APRA GUARDAR EL STATE DE ARRIBA 
    const [clientes, guardarClientes] = useState([]); //==> SE LE ASIGA COMO VALOR INICIAL UN ARREGLO VACIO

    //UTILIZAR VALORES DEL CONTEXT
    const [auth, guardarAuth] = useContext(CRMContext);

    //USEEFFECT = COMPONENTDIDMOUNT Y WILLMOUNT
    useEffect( () => {

        if(auth.token !== ''){
            const consultarApi = async () => {
                try {
                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers : {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });
    
                    //COLOCAR EL RESULTADO EN EL STATE
                    guardarClientes(clientesConsulta.data); //==>COLOCA LA RESPUESTA DE LA API EN EL STATE QUE SE LLAMA CLIENTES 
                } catch (error) {
                    //ERROR CON AUTORIZACION
                    if(error.response.status = 500) {
                        props.history.push('/iniciar-sesion');
                    }
                }
            };
            consultarApi();
        } else {
            props.history.push('/iniciar-sesion');
        }
        
    }, []); //SE LE PASA CLIENTES PARA QUE SE VUELVA EJECUTAR LA CONSULTA AL API CUANDO CAMBIEN LOS CLEINTES DE LA BASE DE DATOS

    //SI EL STATE ESTA COMO FALSE
    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    //SPINNER DE CARGA
    if(!clientes.length) return <Spinner/>

    return ( 
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className = "listado-clientes">
                {clientes.map(cliente => ( //LOS "()" SIMULAN UN RETURN
                    <Cliente
                        key = {cliente._id} //==>SE LE ATRIBUYE A CADA HIJO UN KEY, EN ESTE CASO EL ID DE MONGO
                        cliente = {cliente} //PROPS PARA ENTREGAR LA INFO DE UN CLIENTE
                    />
                ))}
            </ul>
        </Fragment>
    );
}
 
export default withRouter(Clientes);