import React, {useEffect, useState, useContext, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

import FormBuscarProducto from './FormBuscarProducto';
import  FormCantidadProducto from './FormCantidadProducto';
import Swal from 'sweetalert2';

import {CRMContext} from '../../context/CRMContext';

const NuevoPedido = (props) => {

    //EXTRAER EL ID DEL CLIENTE
    const {id} = props.match.params;

    //TRABAJAR CON EL STATE
    //CLIENTES = STATE ==> SE GUARDAN LAS CONSULTAS A LA API
    //GUARDARCLIENTES = FUNCION APRA GUARDAR EL STATE DE ARRIBA 
	const [cliente, guardarCliente] = useState({}); //==> SE LE ASIGA COMO VALOR INICIAL UN ARREGLO VACIO
	const [busqueda, guardarBusqueda] = useState('');
	const [productos, guardarProductos] = useState([]);
	const [total, guardarTotal] = useState(0);

	//AUTH Y TOKEN
    const [auth, guardarAuth] = useContext(CRMContext);    

    useEffect(() => {
		if(auth.token !== ''){
			//OBTENER EL CLIENTE
			const consultarApi = async () => {
				try {
					//CONSULTAR EL CLIENTE ACTUAL
					const resultado = await clienteAxios.get(`/clientes/${id}` , {
						headers : {
							Authorization : `Bearer ${auth.token}`
						}
					});
					guardarCliente(resultado.data);
				} catch (error) {
					//ERROR CON AUTORIZACION
                    if(error.response.status = 500) {
                        props.history.push('/iniciar-sesion');
                    }
				}
			}
			//LLAMAR A LA API
			consultarApi();
			
			//ACTUALIZAR TOTAL
			actualizarTotal();
		} else {
            props.history.push('/iniciar-sesion');			
		}
    }, [productos])

	const handleSubmit = async e => {
		e.preventDefault();
		
		if(auth.token !== ''){	

			//PRODUCTOS DE LA BUSUQEDA
			const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`, {
				headers : {
					Authorization : `Bearer ${auth.token}`
				}
			});
			//SI HAY RESULTADOS
			if(resultadoBusqueda.data[0]){

				let productoResultado = resultadoBusqueda.data[0];

				//AGREGAR LA LLAVE PRODUCTO (COPIA DE ID)
				productoResultado.producto = resultadoBusqueda.data[0]._id;
				productoResultado.cantidad = 0;

				//PONERLO EN EL STATE
				guardarProductos([...productos, productoResultado]);

			} else {
				//NO HAY RESULTADOS
				//LANZAR ALERTA
				Swal.fire({
					icon : 'error',
					title : 'No hay resultados',
					text : 'No existen resultados para la busqueda, prueba nuevamente',
					confirmButtonColor: '#00487c'
				})
			}
		} else {
			props.history.push('/iniciar-sesion');
		}
	}


	//ALMACENAR UNA BUSQUEDA EN EL STATE
	const handleChange = e => {
		if(auth.token !== ''){
			guardarBusqueda(e.target.value);
		} else {
			props.history.push('/iniciar-sesion');
		}
	}

	//ACTUALIZAR LA CANTIDAD D EPRODUCTOS
	const restarProductos = i => {
		//COPIAR EL ARREGLO ORIGINAL
		const todosProductos = [...productos];

		//SI ESTA EN 0, NO SE PUEDE RESTAR MAS
		if(todosProductos[i].cantidad === 0) return;

		//DECREMENTO
		todosProductos[i].cantidad--;

		//ALMACENARLO EN EL STATE
		guardarProductos(todosProductos);
	}

	const sumarProductos = i => {
		//COPIAR EL ARREGLO PARA NO MUTAR EL ORIGINAL
		const todosProductos = [...productos];

		//INCREMENTO
		todosProductos[i].cantidad++;

		//ALMACENARLO EN EL STATE
		guardarProductos(todosProductos);

	}

	//ELIMINA UN PRODUCTO DEL STATE
	const eliminarProductoPedido = id => {
		if(auth.token){
			const todosProductos = productos.filter(producto => producto.producto !== id);

			guardarProductos(todosProductos);
		} else {
			props.history.push('/iniciar-sesion');
		}
	}

	//ACTUALIZAR EL TOTAL A PAGAR
	const actualizarTotal = () => {
		//SI EL ARREGLO ES 0, EL TOTAL EL 0
		if(productos.length === 0){
			guardarTotal(0);
			return;
		}

		//CALCULAR EL NUEVO TOTAL
		let nuevoTotal = 0

		//RECORRER TODOS LOS PRODUCTOS, SUS CANTIDADES Y PRECIOS
		productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

		//ALMACENA EL TOTAL
		guardarTotal(nuevoTotal);

	}

	//GUARDAR EL PEDIDO EN LA BD
	const realizarPedido = async e => {
		e.preventDefault();

		if(auth.token !== ''){
			//EXTRAER ID
			const {id} = props.match.params;

			//CONSTRUIR EL OBJETO
			const pedido = {
				"cliente" : id, 
				"pedido" : productos,
				"total" : total
			}

			//ALMACENARLO EN LA BASE DE DATOS
			const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido, {
				headers : {
					Authorization : `Bearer ${auth.token}`
				}
			});

			//LEER EL RESULTADO
			if(resultado.status === 200){
				//ALERTA DE TODO BIEN
				Swal.fire({
					icon : 'success',
					title : 'correcto ',
					text : resultado.data.mensaje,
					confirmButtonColor: '#00487c'
				})

			} else {
				//ALERTA DE ERROR
				Swal.fire({
					icon : 'error',
					title : 'Hubo un error ',
					text : 'Prueba nuevamente',
					confirmButtonColor: '#00487c'
				})
			};

			//REDIRECCIONAR
			props.history.push('/pedidos');
		} else {
			props.history.push('/iniciar-sesion');
		}
	}

    //VERIFICAR SI EL USUARIO ESTA AUTENTICADO O NO
    if(!auth.auth && (localStorage.getItem('token') === auth.token)){
        props.history.push('/iniciar-sesion')
    }


    return (  
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente.nombre} {cliente.apellido}</p>
                <p>{cliente.telefono}</p>
                <p>{cliente.email}</p>
            </div>
            
            <FormBuscarProducto
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>

                <ul className="resumen">
					{productos.map((producto, index) => (
						<FormCantidadProducto
							key={producto.producto}
							producto={producto}
							sumarProductos={sumarProductos}
							restarProductos={restarProductos}
							eliminarProductoPedido={eliminarProductoPedido}
							index={index}
						/>
					))}
                </ul>
				<p className="total">Total a pagar : <span>$ {total}</span></p>

				{total > 0 ? ( 
					<form
						onSubmit={realizarPedido}
					>
						<input 
							type="submit"
							className="btn btn-verde btn-block"
							value="Realizar Pedido"
						/>
					</form>
				) : null}
        </Fragment>
    );
}
 
export default withRouter(NuevoPedido);