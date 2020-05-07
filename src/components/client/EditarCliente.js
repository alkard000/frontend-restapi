import React, {Fragment, useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
  
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';



const EditarCliente = (props) => {

    //OBTENER EL ID
    const {id} = props.match.params;

    console.log(id);

    //TRABAJAR CON EL STATE
    //CLIENTE = STATE ==> SE GUARDAN LO LEIDO EN EL FORMULARIO
    //datosCliente = FUNCION PARA GUARDAR EL STATE DE ARRIBA 
    const [cliente, datosCliente] = useState({
        nombre : '',
        apellido : '',
        empresa : '',
        email : '',
        telefono : ''
    });

    
    //QUEY A LA REST API
    const consultarAPI = async () => {

        //CONSULTAR A LA API REST
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

        //COLOCAR EN EL STATE
        datosCliente(clienteConsulta.data);
    } 

    //USE EFFECT CUANDO EL COMPONENTE CARGA
    useEffect (() => {
        consultarAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //LEER LOS DATOS DEL FORMULARIO
    const handleChange =  e => {

        //ALMACENAR LOS QUE EL USUARIO ESCRIBE EN EL STATE
        datosCliente({
            //OBTENER UN COPIA DEL STATE ACTUAL, PARA ASI, EN LA CONSOLA NO SE ELIMINEN LOS VALORES PREVIOS
            ...cliente, [e.target.name] : e.target.value
        })
        console.log(cliente);
    }

    //ENVIA UNA PETICION POR AXIOS PARA ACTUALIZAR CLIENTE
    const handleSubmit = e => {
        e.preventDefault();

        //ENVIAR PETICION POR AXIOS
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res => {
                //VALIDAR SI HAY ERRORES DE MONGO
                if(res.data.code === 11000){

                    //MENSAJE DE ERROR
                    Swal.fire({
                        icon : 'error',
                        title : 'Error',
                        text : 'Ese cliente ya esta registrado',
                        cancelButtonColor : '#a01c48'
                    });

                } else {
                    console.log(res.data);

                    //MENSAJE  DE EXITO
                    Swal.fire({
                        title : 'Correcto',
                        text : 'Se actualizo correctamente',
                        icon : 'success',
                        confirmButtonColor: '#00487c'
                    });

                    //REDIRECCIONAR
                    props.history.push('/');
                }
            });
    }

    //VALIDAR EL FORMULARIO
    const validarCliente = () => {
        //DESTRUCTURING AL STATE
        const {nombre, apellido, email, empresa, telefono} = cliente;

        //REVISAR QUE LA PROPIEDADES DESTATE TENGAN CONTENIDO
        let valido = !nombre.length ||
                    !apellido.length ||
                    !email.length ||
                    !empresa.length ||
                    !telefono.length ;

        return valido;
    }

    return (  
        <Fragment>
            <h2>Editar Cliente</h2>

            <form
                onSubmit={handleSubmit}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Cliente" 
                        name="nombre" 
                        onChange={handleChange}
                        value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido" 
                        onChange={handleChange}
                        value={cliente.apellido}

                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                        type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa" 
                        onChange={handleChange}
                        value={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Email Cliente" 
                        name="email"
                        onChange={handleChange}
                        value={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="tel" 
                        placeholder="Teléfono Cliente" 
                        name="telefono" 
                        onChange={handleChange}
                        value={cliente.telefono}
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Guardar Cambios" 
                        disabled={validarCliente()}
                    />
                </div>
            </form>
        </Fragment>
    );
}
 
//HOC ES UNA FUNCION QUE TOMA UN COMPONENTE Y RETORNA UNO NUEVO
export default withRouter(EditarCliente);