import React, { useRef } from "react";
import { Carousel, Button } from 'antd';
import mangalatorlogo from '../assets/mangalatorlogo.png';
import testmanga from '../assets/testmanga.png';
import './MangaReader.css';
import { Flex } from 'antd';


export default function MangaReader(props) {
    const carouselRef = useRef();
  
    const next = () => {
      carouselRef.current.next();
    }
  
    const previous = () => {
      carouselRef.current.prev();
    }
  
    return (
      <Flex style={{ flexDirection: 'row' }}>
        <Button className="carousel-button carousel-button-left" onClick={previous}>Previous</Button>
        <Carousel ref={carouselRef} className="carousel">
          <div>
            <img src={testmanga} alt="lgo" className='cimg' />
          </div>
          <div>
            <img src={mangalatorlogo} alt="po" className='cimg' />
          </div>
          <div>
            <img src={mangalatorlogo} alt="w" className='cimg' />
          </div>
        </Carousel>
        <Button className="carousel-button carousel-button-right" onClick={next}>Next</Button>
      </Flex>
    );
  }