import React, {Fragment} from 'react';

//ROUTING
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//LAYOUTS
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

//COMPONENTES
import Clientes from "./components/client/Clientes";
import Productos from "./components/productos/Productos";
import Pedidos from "./components/pedidos/Pedidos";

function App(){
  return(
    <Router>
      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main class="caja-contenido col-9">
            <Switch>
              <Route exact path="/" component={Clientes}/>

              <Route exact path="/productos" component={Productos}/>

              <Route exact path="/pedidos" component={Pedidos}/>
            </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  )
}

export default App;
