import React, {useEffect, useState, useContext, Fragment} from 'react';

import clienteAxios from '../../config/axios';

import DetallesPedido from './DetallesPedido';

import { withRouter } from 'react-router-dom'

//IMPORTAR EL CONTEXT
import {CRMContext} from '../../context/CRMContext';

const Pedidos = (props) => {

    const [pedidos, mostrarPedidos] = useState([]);

    //AUTH Y TOKEN
    const [auth, guardarAuth] = useContext(CRMContext);

    useEffect(() => {

        if(auth.token !== ''){
             const consultarApi = async () => {          
                try {

                        //OBTENER PEDIDOS
                        const resultado = await clienteAxios.get('/pedidos', {
                            headers : {
                                Authorization : `Bearer ${auth.token}`
                            }
                        });
                        mostrarPedidos(resultado.data);
                    
                } catch (error) {
                    //ERROR CON AUTORIZACION
                    if(error.response.status = 500) {
                        props.history.push('/iniciar-sesion');
                    }
                }
            }
            consultarApi();
        } else { 
            props.history.push('/iniciar-sesion');
        }

    }, [])

    return ( 
        <Fragment>
            <h2>Pedidos</h2>

            <ul className="listado-pedidos">
                {pedidos.map(pedido => (
                    <DetallesPedido
                        key={pedido._id}
                        pedido={pedido}
                    />
                ))}
            </ul>
        </Fragment>
    );
}
 
export default withRouter(Pedidos);