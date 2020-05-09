import React, {useState, useContext, Fragment} from 'react';

import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';

import { withRouter } from 'react-router-dom';

import {CRMContext} from '../../context/CRMContext';

const NuevoProducto = (props) => {

    //TRABAJAR CON EL STATE
    //PRODUCTO = STATE ==> SE GUARDAN LAS CONSULTAS A LA API
    //GUARDARPRODUCTO = FUNCION APRA GUARDAR EL STATE DE ARRIBA 
    const [producto, guardarProducto] = useState({
        nombre :'',
        precio : ''
    }); //==> SE LE ASIGA COMO VALOR INICIAL UN ARREGLO VACIO CON STRING VACIOS

    //STATE DEL ARCHIVO
    //ARCHIVO = STATE ==>GURDAR LA CONSULTA DE LA API
    //GUARDARARCHIVO = SETSTATE ==> FUNCION PARA GUARDAR EL STATE DE ARRIBA
    const [archivo, guardarArchivo] = useState(''); //SE LE ASIGNA UN STRING VACIO

    //AUTH Y TOKEN
    const [auth, guardarAuth] = useContext(CRMContext);    

    //ALMACENA LOS DATOS DEL PRODUCTO EN LA BASE DE DATOS
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
            const res = await clienteAxios.post('/productos', formData, {
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

    //VERIFICAR SI EL USUARIO ESTA AUTENTICADO O NO
    if(!auth.auth && (localStorage.getItem('token') === auth.token)){
        props.history.push('/iniciar-sesion')
    }

    return ( 
        <Fragment>
            <h2>NuevoProducto</h2> 
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
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
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
                        value="Agregar Producto"
                    />
                </div>
            </form>
        </Fragment>
    );
}
 
export default withRouter(NuevoProducto);