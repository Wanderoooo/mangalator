import React, { useState, useEffect } from "react";
import ImageRenderer from './ImageRenderer';
import { Upload, Button } from 'antd';
import { Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './UploadPage.css'

function UploadPage({setCurrentKey, userKey}) {
  const [images, setImages] = useState([]);
  const uniqueImages = Array.from(new Map(images.map(image => [image["src"], image])).values());
  console.log(uniqueImages);
  console.log(uniqueImages.length);
  
  useEffect(() => {
    if (new Set(images).size !== images.length) {
      setImages(uniqueImages);
    }
  }, [images]);

  const handleImagesUpload = ({ fileList }) => {
    // Loop through all the files
    for (let i = 0; i < fileList.length; i++) {
      let file = fileList[i].originFileObj; // Get the actual File object
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setImages(prevImages => [...prevImages, {src: reader.result, name: file.name}]);
      };
  
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="MangaRenderer">
      <Typography.Title level={2}>Upload raw images here; we take care of the rest</Typography.Title>
      <Upload.Dragger name="files" action="/upload.do" multiple={true} 
      onChange={handleImagesUpload} style={{minHeight:'550px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} onRemove={() => false} beforeUpload={() => false}>
        <div className="upload-hint">
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Accepted types: PNG, JPG, JPEG
        </p>
        </div>
        <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
          {uniqueImages.map((image, index) => (
            <img key={index} src={image.src} alt={image.name} style={{height: '200px', width: 'auto'}}/>
          ))}
        </div>
      </Upload.Dragger>
      <ImageRenderer imgs={images.map(image => image.src)} setCurrentKey={setCurrentKey}/>
    </div>
  );
}

export default UploadPage;
