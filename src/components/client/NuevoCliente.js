import React, {Fragment, useState} from 'react';
import {withRouter} from 'react-router-dom';
  
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';



const NuevoCliente = ({history}) => {

    //TRABAJAR CON EL STATE
    //CLIENTE = STATE ==> SE GUARDAN LO LEIDO EN EL FORMULARIO
    //GUARDARCLIENTE = FUNCION PARA GUARDAR EL STATE DE ARRIBA 
    const [cliente, guardarCliente] = useState({
        nombre : '',
        apellido : '',
        empresa : '',
        email : '',
        telefono : ''
    });

    //LEER LOS DATOS DEL FORMULARIO
    const handleChange =  e => {

        //ALMACENAR LOS QUE EL USUARIO ESCRIBE EN EL STATE
        guardarCliente({
            //OBTENER UN COPIA DEL STATE ACTUAL, PARA ASI, EN LA CONSOLA NO SE ELIMINEN LOS VALORES PREVIOS
            ...cliente, [e.target.name] : e.target.value
        })
        console.log(cliente);
    }

    //AÑADE EN LA REST API UN CLIENTE NUEVO
    const handleSubmit = e => {
        e.preventDefault();

        //ENVIAR PETICION
        clienteAxios.post('/clientes', cliente)
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
                        title : 'Se Agrego el Cliente',
                        text : res.data.mensaje,
                        icon :'success',
                        confirmButtonColor: '#00487c'
                    });

                    //REDIRECCIONAR
                    history.push('/');
                }
            })
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
            <h2>Nuevo Cliente</h2>

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
                        onChange={handleChange} //ONCHANGE ES UN ADDEVENTLISTENER QUE CAPTA CAMBIOS DE LOS CAMPOS DEL FORMULARIO
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido" 
                        onChange={handleChange}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                        type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa" 
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Email Cliente" 
                        name="email"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="tel" 
                        placeholder="Teléfono Cliente" 
                        name="telefono" 
                        onChange={handleChange}
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Cliente" 
                        onChange={handleChange}
                        disabled={validarCliente()}
                    />
                </div>
            </form>
        </Fragment>
    );
}
 
//HOC ES UNA FUNCION QUE TOMA UN COMPONENTE Y RETORNA UNO NUEVO
export default withRouter(NuevoCliente);