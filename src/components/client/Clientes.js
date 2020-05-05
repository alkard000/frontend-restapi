import React, { useEffect, useState, Fragment } from 'react';

//IMPORTAR CLIENTE AXIOS PARA LAS URL
import clienteAxios from '../../config/axios';

import Cliente from '../client/Cliente';

import { Link } from 'react-router-dom';

const Clientes = () => {

    //TRABAJAR CON EL STATE
    //CLIENTES = STATE ==> SE GUARDAN LAS CONSULTAS A LA API
    //GUARDARCLIENTES = FUNCION APRA GUARDAR EL STATE DE ARRIBA 
    const [clientes, guardarClientes] = useState([]); //==> SE LE ASIGA COMO VALOR INICIAL UN ARREGLO VACIO

    //QUERY AL API
    const consultarApi = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes');

        //COLOCAR EL RESULTADO EN EL STATE
        guardarClientes(clientesConsulta.data); //==>COLOCA LA RESPUESTA DE LA API EN EL STATE QUE SE LLAMA CLIENTES
    }

    //USEEFFECT = COMPONENTDIDMOUNT Y WILLMOUNT
    useEffect( () => {
        consultarApi();
    }, [clientes]); //SE LE PASA CLIENTES PARA QUE SE VUELVA EJECUTAR LA CONSULTA AL API CUANDO CAMBIEN LOS CLEINTES DE LA BASE DE DATOS

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
 
export default Clientes;