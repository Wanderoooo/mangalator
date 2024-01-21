import React, { useRef } from "react";
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import mangalatorlogo from '../assets/mangalatorlogo.png';
import testmanga from '../assets/testmanga.png';
import img7034 from '../assets/IMG_7034.PNG';
import img7035 from '../assets/IMG_7035.PNG';
import img7036 from '../assets/IMG_7036.PNG';
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
        <Button className="carousel-button carousel-button-left" onClick={previous} icon={<LeftOutlined />} />
        <Carousel ref={carouselRef} className="carousel">
          <div>
            <img src={img7034} alt="lgo" className='cimg' />
          </div>
          <div>
            <img src={img7035} alt="po" className='cimg' />
          </div>
          <div>
            <img src={img7036} alt="w" className='cimg' />
          </div>
        </Carousel>
        <Button className="carousel-button carousel-button-right" onClick={next} icon={<RightOutlined />}/>
      </Flex>
    );
  }