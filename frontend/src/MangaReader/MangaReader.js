import React, { useRef, useState } from "react";
import { Carousel, Button, Divider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import mangalatorlogo from '../assets/mangalatorlogo.png';
import testmanga from '../assets/testmanga.png';
import img7034 from '../assets/IMG_7034.PNG';
import img7035 from '../assets/IMG_7035.PNG';
import img7036 from '../assets/IMG_7036.PNG';
import './MangaReader.css';
import { Flex } from 'antd';

function VerticalScroll(props) {
    let base64s = props.images;

    return (
      <div className="image-container">
        {base64s.map((base64String, index) => (
            <img key={index} src={base64String} alt={`Image ${index}`} />
        ))}
      </div>
    );
}



export default function MangaReader(props) {
    const carouselRef = useRef();
    const MANGACOUNT = 3; //change
    const [currManga, setCurrManga] = useState(0);
    let scrollInput = [img7034, img7035, img7036];
  
    const next = () => {
      carouselRef.current.next();
      setCurrManga(previous => {return (previous += 1) % MANGACOUNT});
    }
  
    const previous = () => {
      carouselRef.current.prev();
      setCurrManga(previous => {
        if ((previous -= 1) < 0) {
            return MANGACOUNT - 1;
        }
        return previous;
      });
    }
    
    return (
        <Flex style={{ flexDirection: 'row'}}>
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
                    <img src={testmanga} alt="w" className='cimg' />
                </div>
                </Carousel>
                <Button className="carousel-button carousel-button-right" onClick={next} icon={<RightOutlined />}/>
            </Flex>
            <Divider type="vertical" className="divider" />
            <VerticalScroll images={scrollInput} />
        </Flex>
    );
  }