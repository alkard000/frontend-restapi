import React, {Fragment, useEffect, useState, useContext} from 'react';

import { Link, withRouter } from 'react-router-dom';

import clienteAxios from '../../config/axios';

import Producto from './Producto';

import Spinner from '../layout/Spinner';

//CONTEXT
import {CRMContext} from '../../context/CRMContext';

const Productos = (props) => {

    //TRABAJAR CON EL STATE
    //PRODUCTOS = STATE ==> SE GUARDAN LAS CONSULTAS A LA API
    //GUARDARPRODUCTOS = FUNCION APRA GUARDAR EL STATE DE ARRIBA 
    const [productos, mostrarProductos] = useState([]); //==> SE LE ASIGA COMO VALOR INICIAL UN ARREGLO VACIO

    //AUTH Y TOKEN
    const [auth, guardarAuth] = useContext(CRMContext);

    //USEEFFECT = COMPONENTDIDMOUNT Y WILLMOUNT
    useEffect( () => {
    
        if(auth.token !== ''){
            //QUERY AL API
            const consultarApi = async () => {
                try {
                    const productosConsulta = await clienteAxios.get('/productos', {
                        headers : {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });
                    mostrarProductos(productosConsulta.data);
                } catch (error) {
                    //ERROR CON AUTORIZACION
                    if(error.response.status = 500) {
                        props.history.push('/iniciar-sesion');
                    }
                }
            };
            consultarApi();//==>LLAMADO AL API
        } else {
            props.history.push('/iniciar-sesion');
        }

    }, []); //SE LE PASA CLIENTES PARA QUE SE VUELVA EJECUTAR LA CONSULTA AL API CUANDO CAMBIEN LOS CLEINTES DE LA BASE DE DATOS

    //SI EL STATE ESTA COMO FALSE
    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

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
 
export default withRouter(Productos);