import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : 'http://localhost:4000' //ES LA CONSULTA AL PUERTO DEL API REST
});

export default clienteAxios;