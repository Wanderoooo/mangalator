import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import ImageRenderer from './ImageRenderer';

function App() {
  const [images, setImages] = useState([]);

  const handleImageUpload = event => {
    let files = event.target.files;
    let imagesArray = [...images];

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();

      reader.onloadend = () => {
        imagesArray.push(reader.result);
        setImages(imagesArray);
      };

      reader.readAsDataURL(files[i]);
    }
  };

  console.log(images);

  return (
    <div className="App">
      <ImageRenderer imgs={images}/>
      <input type="file" accept=".png, .jpg, .jpeg" multiple onChange={handleImageUpload} title="Input files here" placeholder="ohueidjsk" />
    </div>
  );
}

export default App;
