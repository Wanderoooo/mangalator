import React, { useState, useEffect } from "react";
import ImageRenderer from './ImageRenderer';


function UploadPage({setCurrentKey}) {
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
    <div className="MangaRenderer">
      <input type="file" accept=".png, .jpg, .jpeg" multiple onChange={handleImageUpload} title="Input files here" placeholder="ohueidjsk" />
      <ImageRenderer imgs={images} setCurrentKey={setCurrentKey}/>
    </div>
  );
}

export default UploadPage;
