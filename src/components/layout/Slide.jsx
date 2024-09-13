import React from 'react';
import './slide.css';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';
import ss from '../../assets/ss.svg';


function Slide() {
  return (
    <div className='content'>
      <Carousel >
      <Carousel.Item>
        <img src={ss} alt="" />
        
        <Carousel.Caption>
          <center>
            <h1 className='p1' align="center">GARANTIA VEREDA</h1>
            <h1 className='p2'>COMPRE COM SEGURANÇA</h1>
            <a href='#' className='p3'>CADASTRA-SE</a>
            <br /><br /> 
          </center>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={ss} alt="" />
        
        <Carousel.Caption>
          <center>
            <h1 className='p1' align="center">GARANTIA VEREDA</h1>
            <h1 className='p2'>COMPRE COM SEGURANÇA</h1>
            <a href='#' className='p3'>CADASTRA-SE</a>
            <br /><br /> 
          </center>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={ss} alt="" />
        
        <Carousel.Caption>
          <center>
            <h1 className='p1' align="center">GARANTIA VEREDA</h1>
            <h1 className='p2'>COMPRE COM SEGURANÇA</h1>
            <a href='#' className='p3'>CADASTRA-SE</a>
            <br /><br /> 
          </center>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default Slide;
