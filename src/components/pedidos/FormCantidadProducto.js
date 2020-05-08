import React from 'react';

const FormCantidadProducto = (props) => {

    const {producto, restarProductos, sumarProductos, eliminarProductoPedido, index} = props;

    return (  
        <li>
            <div className="texto-producto">
                <p className="nombre">{producto.nombre}</p>
                <p className="precio">$ {producto.precio}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i 
                        className="fas fa-minus"
                        onClick={() => restarProductos(index)}
                    ></i>
                    {/*<input type="text" name="cantidad" defaultValue={`${producto.cantidad}`}/>*/}
                    <p>{producto.cantidad}</p>
                    <i 
                        className="fas fa-plus"
                        onClick={() => sumarProductos(index)}
                    ></i>
                </div>
                <button 
                    type="button" 
                    className="btn btn-rojo"
                    onClick={() => eliminarProductoPedido(producto.producto)}
                >
                    <i className="fas fa-minus-circle"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    );
}
 
export default FormCantidadProducto;