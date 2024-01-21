import React, { useContext, useEffect, useRef, useState } from "react";
import { Carousel, Button, Divider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './MangaReader.css';
import { Flex } from 'antd';
import { MangaContext } from "../context/MangaReaderContext";

function VerticalScroll(props) {
    let base64s = props.images;

    return (
      <div className="image-container">
        {base64s?.map((base64String, index) => (
            <img key={index} src={base64String} alt={`Image ${index}`} />
        ))}
      </div>
    );
}



export default function MangaReader() {
    const carouselRef = useRef();
    const [currManga, setCurrManga] = useState(0);
    const { currentMangaContext } = useContext(MangaContext);
    const [mangaData, setData] = useState();
    const MANGACOUNT = mangaData?.length; //change

    useEffect(() => {
      setData(currentMangaContext?.data)
      console.log(currentMangaContext?.name)
    }, [currentMangaContext])
  
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
      <>
          {!mangaData ? (
            <p> Please Load A Collection First</p>
          ) : (
            <Flex style={{ flexDirection: 'row'}}>
                <Flex style={{ flexDirection: 'row' }}>
                    <Button className="carousel-button carousel-button-left" onClick={previous} icon={<LeftOutlined />} />
                    <Carousel ref={carouselRef} className="carousel">
                    {mangaData?.map((imgUrl, index) => (
                      <div key={index}>
                        <img src={imgUrl} alt="" className='cimg' />
                      </div>
                    ))}
                    </Carousel>
                    <Button className="carousel-button carousel-button-right" onClick={next} icon={<RightOutlined />}/>
                </Flex>
                <Divider type="vertical" className="divider" />
                <VerticalScroll images={mangaData} />
            </Flex>
          )}
        </>
    );
  }