import React, { useState, useEffect } from "react";
import ImageRenderer from './ImageRenderer';
import { Upload, Button } from 'antd';
import { Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function UploadPage({setCurrentKey, userKey}) {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    if (new Set(images).size !== images.length) {
      const uniqueImages = [...new Set(images)];
      setImages(uniqueImages);
    }
  }, [images]);

  const handleImagesUpload = ({ fileList }) => {
    // Loop through all the files
    for (let i = 0; i < fileList.length; i++) {
      let file = fileList[i].originFileObj; // Get the actual File object
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setImages(prevImages => [...prevImages, reader.result]);
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  console.log(images);

  return (
    <div className="MangaRenderer">
      <Typography.Title level={2}>Upload raw images here; we take care of the rest</Typography.Title>
      <Upload.Dragger name="files" action="/upload.do" multiple={true} onChange={handleImagesUpload}>
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Accepted types: PNG, JPG, JPEG
        </p>
      </Upload.Dragger>
      <ImageRenderer imgs={images} setCurrentKey={setCurrentKey} userKey={userKey}/>
    </div>
  );
}

export default UploadPage;
