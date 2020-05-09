import React, {useState, useContext, useEffect} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

import clienteAxios from '../../config/axios';

//CONTEXT
import {CRMContext} from '../../context/CRMContext';


const Login = (props) => {

    //AUTH Y TOKEN
    const [auth, guardarAuth] = useContext(CRMContext);

    //STATE CON LO DATOS DEL FORMULARIO
    const [credenciales, guardarCredenciales] = useState({});

    //INICIAR SESION EN EL SERVIDOR
    const handleSubmit = async e => {
        e.preventDefault();
        
        //AUTENTICAR EL USUARIO
        try {

            //RESPUESTA
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);

            //EXTRAER EL TOKEN Y COLOCARLO EN LOCALSTORAGE
            const {token} = respuesta.data;
            localStorage.setItem('token', token);

            //PASAR LA AUTENTICACION EN EL STATE
            guardarAuth({
                token,
                auth : true
            })

            //ALERTA
            Swal.fire({
                icon : 'success',
                title : 'Login correcto',
                text : 'Has iniciado sesion',
                confirmButtonColor : '#00487c'
            })

            //PROPS
            props.history.push('/');
            
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon : 'error',
                title : 'Hubo un error',
                text : error.response.data.mensaje,
                confirmButtonColor : '#00487c'
            })
        }
    }

    //ALMACENAR LO QUE EL USUARIO ESCRIBE EN EL STATE
    const handleChange = e => {
        guardarCredenciales({
            ...credenciales, [e.target.name] : e.target.value
        })
    }

    useEffect( () => { 
        const token = localStorage.getItem('token'); 
        if(token){ 
            guardarAuth({ 
                token, 
                auth: true 
            }); 
            props.history.push('/'); 
        } 
    },[]);

    return (  
        <div className="login">
            <h2>Iniciar Sesion</h2>

            <div className="contenedor-formulario">
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo">
                        <label>Email</label>
                        <input 
                            type="text"
                            name="email"
                            placeholder="Email para Iniciar Sesion"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input 
                            type="password"
                            name="password"
                            placeholder="Email para Iniciar Sesion"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <input type="submit" value="Iniciar Sesion" className="btn btn-verde btn-block"/>
                </form>
            </div>
        </div>
    );
}
 
export default withRouter(Login);