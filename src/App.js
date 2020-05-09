import React, {Fragment, useContext} from 'react';

//ROUTING
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//LAYOUTS
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

//COMPONENTES CLIENTE
import Clientes from "./components/client/Clientes";
import NuevoCliente from "./components/client/NuevoCliente";
import EditarCliente from "./components/client/EditarCliente";

//CONPONENTES PRODUCTOS
import Productos from "./components/productos/Productos";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";

//COMPONENTE PEDIDOS
import Pedidos from "./components/pedidos/Pedidos";
import NuevoPedido from "./components/pedidos/NuevoPedido";

//COMPONENTES DEL USUARIO
import Login from "./components/auth/Login";
import {CRMContext, CRMProvider} from "./context/CRMContext";

function App(){

  //UTILIZAR CONTEXT
  const [auth, guardarAuth] = useContext(CRMContext);

  return(
    <Router>
      <Fragment>
        <CRMProvider value={[auth, guardarAuth]}>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Navegacion />
            <main className="caja-contenido col-9">
              <Switch>

                { /* RUTAS PARA LOS CLIENTES */ }
                <Route exact path="/" component={Clientes}/>
                <Route exact path="/clientes/nuevo" component={NuevoCliente}/>
                <Route exact path="/clientes/editar/:id" component={EditarCliente}/>

                { /* RUTAS PARA LOS PRODUCTOS */ }
                <Route exact path="/productos" component={Productos}/>
                <Route exact path="/productos/nuevo" component={NuevoProducto}/>
                <Route exact path="/productos/editar/:id" component={EditarProducto}/>

                { /* RUTAS PARA LOS PEDIDOS */ }
                <Route exact path="/pedidos" component={Pedidos}/>
                <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido}/>

                { /* RUTAS PARA LOS USUARIO */ }
                <Route exact path="/iniciar-sesion" component={Login}/>

              </Switch>
            </main>
          </div>
        </CRMProvider>
      </Fragment>
    </Router>
  )
}

export default App;
