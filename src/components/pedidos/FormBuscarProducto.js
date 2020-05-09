import React, {useContext} from 'react';

import {CRMContext} from '../../context/CRMContext';

const FormBuscarProducto = (props) => {

    //AUTH Y TOKEN
    const [auth, guardarAuth] = useContext(CRMContext);    

    //VERIFICAR SI EL USUARIO ESTA AUTENTICADO O NO
    if(!auth.auth && (localStorage.getItem('token') === auth.token)){
        props.history.push('/iniciar-sesion')
    }

    return (  
        <form
            onSubmit={props.handleSubmit}
        >
            <legend>Busca un Producto y agrega una cantidad</legend>

            <div className="campo">
                <label>Productos:</label>
                <input 
                    type="text" 
                    placeholder="Nombre Productos" 
                    name="productos"
                    onChange={props.handleChange}
                />
            </div>

            <input
                type="submit"
                className="btn btn-azul btn-block"
                value="Buscar Producto"
            />
        </form>
    );
}
 
export default FormBuscarProducto;