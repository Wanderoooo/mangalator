import React, { useState } from 'react';
import axios from 'axios';

function ImageProcessor( {imgs} ) {
    const [images, setImages] = useState(imgs);
    const [processedImages, setProcessedImages] = useState([]);

    const processImages = async () => {
        try {
            //const response = await axios.post('https://your-api-url.com/process', images);
            let newImages = await alterImageForTesting(imgs);
            setProcessedImages(newImages);
        } catch (error) {
            console.error('Error processing images:', error);
        }
    };

    return (
        <div>
            <button onClick={processImages}>Process Images</button>
            <div>
                {processedImages.map((image, index) => (
                    <img key={index} src={image} alt={`Processed ${index}`} />
                ))}
            </div>
        </div>
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
