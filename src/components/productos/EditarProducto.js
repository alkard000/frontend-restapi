import React, {useState, useEffect, useContext, Fragment} from 'react';

import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';

import { withRouter } from 'react-router-dom';

import Spinner from '../layout/Spinner';

//IMPORTAR EL CONTEXT
import {CRMContext} from '../../context/CRMContext';

const EditarProductos = (props) => {

    //OBTENER EL ID D EL PRODUCTO
    const {id} = props.match.params;

    //TRABAJAR CON EL STATE
    //PRODUCTO = STATE ==> SE GUARDAN LAS CONSULTAS A LA API
    //GUARDARPRODUCTO = FUNCION APRA GUARDAR EL STATE DE ARRIBA 
    const [producto, guardarProducto] = useState({
        nombre :'',
        precio : '',
        imagen : ''
    }); //==> SE LE ASIGA COMO VALOR INICIAL UN ARREGLO VACIO CON STRING VACIOS

    //UTILIZAR VALORES DEL CONTEXT
    const [auth, guardarAuth] = useContext(CRMContext);

    //STATE DEL ARCHIVO
    //ARCHIVO = STATE ==>GURDAR LA CONSULTA DE LA API
    //GUARDARARCHIVO = SETSTATE ==> FUNCION PARA GUARDAR EL STATE DE ARRIBA
    const [archivo, guardarArchivo] = useState(''); //SE LE ASIGNA UN STRING VACIO

    //USE EFFECT
    useEffect (() => {

        if(auth.token !== ''){                
            //CONSULTAR LA API
            const consultaApi  = async () => {
                try {
                    const productoConsulta = await clienteAxios.get(`/productos/${id}`, {
                        headers : {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });
                    guardarProducto(productoConsulta.data);
                } catch (error) {
                    //ERROR CON AUTORIZACION
                    if(error.response.status = 500) {
                        props.history.push('/iniciar-sesion');
                    }              
                };
                
            } 
            consultaApi();
        } else {
            props.history.push('/iniciar-sesion');
        }
    }, []);

    //EDITA UN PRODUCTO EN LA BASE DE DATOS
    const handleSubmit = async e => {
        e.preventDefault();
        
        //CREAR UN FORM DATA
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //ALMACENAR EN BD
        try {
            //CONFIGURAMOS A AXIOS PAR ALMACENAR EL ARCHIVO EN MONGODB
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data',
                    Authorization : `Bearer ${auth.token}`
                }
            });

            //LANZAR UNA ALERTA
            if(res.status === 200){
                Swal.fire({
                    title : 'Exito',
                    text : res.data.mensaje,
                    icon : 'success',
                    confirmButtonColor: '#00487c'
                })
            }

            //REDIRECCIONAR
            props.history.push('/productos');

        } catch (error) {
            
            //LANZAR ALERTA
            Swal.fire({
                icon : 'error',
                title : 'Hubo un error',
                text : 'Vuelve intentarlo',
                cancelButtonColor : '#a01c48'
            })
        }
    }

    //LEER DATOS DEL FORMULARIO
    const handleChange = e => {
        guardarProducto({
            //OBTENER UNA COPIA DEL STATE
            ...producto, [e.target.name] : e.target.value
        })
    }

    //COLOCAR IMAGEN EN EL STATE
    const handleChangeFile = e => {

        guardarArchivo(e.target.files[0]);
    }

    //EXTARER LOS VALORES DEL STATE
    const {nombre, precio, imagen} = producto;

    //SI EL STATE ESTA COMO FALSE
    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    //MOSTRAR SPINNER
    if(!nombre) return <Spinner/>


    return (
        <Fragment>
            <h2>Editar producto</h2> 
            <form
                onSubmit={handleSubmit}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre"
                        onChange={handleChange}
                        defaultValue={nombre}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="precio" 
                        min="0.00" 
                        step="10" 
                        placeholder="Precio" 
                        onChange={handleChange}
                        defaultValue={precio} //DEFAULT VALUE SE USA PARA QUE EL USUARIO TENGA PODER EN LA EDICION, VALUE SE USA SOLO PARA MOSTRAR
                        /* CONTROLCOMPONENTE = VALUE => LO CONTROLA REACT
                           UNCONTROLCOMPONENT = DEFAULTVALUE => LO CONTROLA EL USUARIO */
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    {imagen ? (
                        <img src = {`http://localhost:4000/${imagen}`} alt={nombre} width="300"/>
                     ) : null}
                    <input 
                        type="file"  
                        name="imagen" 
                        onChange={handleChangeFile}
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Editar Producto"
                    />
                </div>
            </form>
        </Fragment>
    );
}
 
export default withRouter(EditarProductos);