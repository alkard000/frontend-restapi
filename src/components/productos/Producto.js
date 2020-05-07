import React, {Fragment} from 'react';

import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';

const Producto = ({producto}) => {

    const {_id, nombre, precio, imagen} = producto

    const handleClick = idProducto => {
        Swal.fire({
            title: 'Estas Seguro?',
            text: "Un Producto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00487c',
            cancelButtonColor: '#9f1c48',
            confirmButtonText: 'Si, borrar',
            cancelButtonText : 'Cancelar'
        }).then((result) => {
            if (result.value) {

                //LLAMADA A AXIOS
                clienteAxios.delete(`/productos/${idProducto}`)
                    .then(res => {
                        Swal.fire({
                        title : 'Eliminado!',
                        text : res.data.mensaje,
                        confirmButtonColor: '#00487c',
                        icon : 'success'
                    });
                })
            }
        })
    }

    return ( 
        <Fragment>
            <li className="producto">
                <div className="info-producto">
                    <p className="nombre">{nombre}</p>
                    <p className="precio">$ {precio} </p>
                    { imagen ? (
                        <img src={`http://localhost:4000/${imagen}`} alt={_id}/>
                        ) : null
                    }
                </div>
                <div className="acciones">
                    <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                        Editar Producto
                    </Link>

                    <button 
                        type="button" 
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => handleClick(_id)}
                    >
                        <i className="fas fa-times"></i>
                        Eliminar Producto
                    </button>
                </div>
            </li>
        </Fragment>
    );
}
 
export default Producto;