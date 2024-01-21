import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./ImageRenderer.css"
import { KeyContext } from '../context/KeyContext';
import AuthContext from '../context/AuthProvider';
import { Button, Form, Input } from 'antd';
import { Paper } from '@mui/material';

function ImageProcessor( {imgs} ) {
    const [images, setImages] = useState(imgs);
    const [timeElapsed, setTimeElapsed] = useState(1);
    const [processedImages, setProcessedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const throbRef = useRef();
    const navigate = useNavigate();
    const { currentKey, setCurrentKey } = useContext(KeyContext);
    const { auth, setAuth } = useContext(AuthContext);

    const [albumName, setAlbumname ] = useState('');


    useEffect(() => {
        let interval;
        if (loading) {
          interval = setInterval(() => {
            setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
          }, 1000);
        } else {
          clearInterval(interval);
          setTimeElapsed(1);
        }
        return () => clearInterval(interval);
      }, [loading]);

    const processImages = async () => {
        try {
            console.log("TODO: PROCESS IMAGES NEEDS API HELP")
            setLoading(true);
            console.log(imgs);
            console.log(albumName);
            console.log("Images: " + imgs);
            console.log(auth.user);
            const response = await axios.post('Process Images API', JSON.stringify({images: imgs, key: auth.user, name: 'name'}));
            //let newImages = await alterImageForTesting(imgs);
            setLoading(false);
            setProcessedImages(response?.data);
            if (processedImages.length > 0 && !loading) {
                setCurrentKey('account');
                navigate('/account');
            }
        } catch (error) {
            console.error('Error processing images:', error);
        }
    };

    return (
            <Form className="imageRenderer" onFinish={processImages}>
                <Form.Item label="Album Name" className="albumField" rules={[{ required: true, message: 'Please input a title for your album!' }]}>
                    <Input onChange={(e) => setAlbumname(e.target.value)} value={albumName}/>
                </Form.Item>
                <Form.Item>
                    <Button type="button" style={{ background: '#4a8fe7', borderColor: '#4a8fe7', margin: '10px'}}>
                        Translate Images!
                    </Button>
                </Form.Item>
                <Form.Item>
                    <p ref={throbRef} className={loading? "throbbing" : "offscreen"} aria-live="assertive">Your Translation Is Loading, Time Elapsed: {timeElapsed}</p>
                </Form.Item>
                <Form.Item>
                    <div>
                        {processedImages.map((image, index) => (
                            <img key={index} src={image} alt={`Processed ${index}`} />
                        ))}
                    </div>
                </Form.Item>
            </Form>
    );
}
async function alterImageForTesting(images) {
    // This will hold the new images with text overlaid
    let newImages = [];

    for (let i = 0; i < images.length; i++) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        // Load your image
        let img = new Image();
        img.src = images[i]; // Use the current image in the array

        // We need to wait for each image to load before we can draw on it
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        // Set the canvas size to the image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image to the canvas
        ctx.drawImage(img, 0, 0);

        // Set the font properties
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';

        // Add the text to the image
        ctx.fillText('Your text here', 50, 50);

        // Convert the canvas to a data URL and add it to the newImages array
        newImages.push(canvas.toDataURL());
    }

    // Now newImages is an array of data URLs,
    // each representing an image with text overlaid
    return newImages;
}
 


export default ImageProcessor;
