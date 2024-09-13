import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
// import NavBar from './components/NavBar'
// import Slide from './components/Slide'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Categoria from './components/Categoria';
// import Relacionados from './components/Relacionados';
// import Rodape from './components/Rodape';
// import OfertaDia from './components/OfertaDia';
// import axios from 'axios';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     {/* <NavBar/>
     <Slide/>
     <Relacionados/>
     <OfertaDia/>
     <Categoria/>
    <Rodape/> */}
    
      <App/>
    
  </React.StrictMode>,
)


