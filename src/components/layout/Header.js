import React, { useContext } from 'react';

import {CRMContext} from '../../context/CRMContext';

import { withRouter } from 'react-router-dom';

const Header = (props) => {

    const [auth, guardarAuth] = useContext(CRMContext);

    const cerrarSesion = () => {
        //AUTH.AUTH = FALSE Y EL TOKEN SE REMUEVE
        guardarAuth({
            token : '',
            auth : false
        });

        localStorage.setItem('token', '');

        //REDIRECCIONAR
        props.history.push('/iniciar-sesion');
    }

    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Administrador de Clientes</h1>
                    
                    {auth.auth ? (
                    <button
                        type="button"
                        className="btn btn-rojo"
                        onClick={cerrarSesion}
                    >
                        <i className="far fa-times-circle"></i>
                        Cerrar Sesion
                    </button>
                    ) : null}
                </div>
            </div>
        </header>
    )
}

export default withRouter(Header);