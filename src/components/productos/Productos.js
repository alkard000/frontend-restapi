import React, {Fragment, useEffect, useState} from 'react';

import { Link } from 'react-router-dom';

import clienteAxios from '../../config/axios';

import Producto from './Producto';

import Spinner from '../layout/Spinner';

const Productos = (props) => {

    //TRABAJAR CON EL STATE
    //PRODUCTOS = STATE ==> SE GUARDAN LAS CONSULTAS A LA API
    //GUARDARPRODUCTOS = FUNCION APRA GUARDAR EL STATE DE ARRIBA 
    const [productos, mostrarProductos] = useState([]); //==> SE LE ASIGA COMO VALOR INICIAL UN ARREGLO VACIO
    
    //QUERY AL API
    const consultarApi = async () => {
        const productosConsulta = await clienteAxios.get('/productos');
        mostrarProductos(productosConsulta.data);
    };

    //USEEFFECT = COMPONENTDIDMOUNT Y WILLMOUNT
    useEffect( () => {
        consultarApi();//==>LLAMADO AL API
    }, []); //SE LE PASA CLIENTES PARA QUE SE VUELVA EJECUTAR LA CONSULTA AL API CUANDO CAMBIEN LOS CLEINTES DE LA BASE DE DATOS

    //SPINNER DE CARGA
    if(!productos.length) return <Spinner/>
    
    return ( 
        <Fragment>
            <h2>Productos</h2>
            <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map(producto => (
                    <Producto
                        key = {producto._id} //==>SE LE ATRIBUYE A CADA HIJO UN KEY, EN ESTE CASO EL ID DE MONGO
                        producto = {producto} //PROPS PARA ENTREGAR LA INFO DE UN PRODUCTO
                    />
                ))}
            </ul>
        </Fragment>
    );
}
 
export default Productos;