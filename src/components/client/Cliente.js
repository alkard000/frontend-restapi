import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

//IMPORTAR EL CONTEXT
import {CRMContext} from '../../context/CRMContext';


const Cliente = ({cliente}) => { //==>SE PASA TODA LA INFO DE CLIENTE COMO UN DESTRUCTURING COMO OBJETO

    //EXTRAER LOS VALORES
    const {_id, nombre, apellido, empresa, email, telefono} = cliente;

    //UTILIZAR VALORES DEL CONTEXT
    const [auth, guardarAuth] = useContext(CRMContext);

    //ELIMINAR CLIENTE
    const handleClick = idCliente => {
        Swal.fire({
            title: 'Estas Seguro?',
            text: "Un Cliente eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00487c',
            cancelButtonColor: '#9f1c48',
            confirmButtonText: 'Si, borrar',
            cancelButtonText : 'Cancelar'
        }).then((result) => {
            if (result.value) {

                if(auth.token !== ''){
                    //LLAMADA A AXIOS
                    clienteAxios.delete(`/clientes/${idCliente}`, {
                        headers : {
                            Authorization : `Bearer ${auth.token}`
                        }
                    })
                        .then(res => {

                            Swal.fire({
                            title : 'Eliminado!',
                            text : res.data.mensaje,
                            confirmButtonColor: '#00487c',
                            icon : 'success'
                        });
                    })
                } else {
                    Swal.fire({
                        title : 'Error',
                        text :'Permiso denegado',
                        confirmButtonColor: '#00487c',
                        icon : 'error'
                    })
                }
            }
        })
    }

    return ( 
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>Tel: {telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>
                <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
                    <i className="fas fa-plus"></i>
                    Nuevo Pedido
                </Link>
                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => handleClick(_id)}
                >
                        <i className="fas fa-times"></i>
                        Eliminar Cliente
                </button>
            </div>
        </li>
    );
}
 
export default withRouter(Cliente);