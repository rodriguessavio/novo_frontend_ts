
import React from 'react'
import Slide from './../layout/Slide'
import 'bootstrap/dist/css/bootstrap.min.css';
import Categoria from './../layout/Categoria';
import Relacionados from './../layout/Relacionados';
import Rodape from './../layout/Rodape';
import OfertaDia from './../layout/OfertaDia';
//para teste
import ModalCep from '../layout/ModalCep';
import Profile from '../layout/Profile';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Home(){
    return (
        <div>
            <Slide/>
            <Relacionados/>
            <OfertaDia/>
            <Categoria/>


        </div>
    )
}

export default Home;