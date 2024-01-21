import React, { useState, useEffect, useContext, useRef  } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';

function ImageGrid() {
  const [images, setImages] = useState([]);
  const { auth } = useContext(AuthContext);

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [images]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('YOUR_API_URL', 
        {
            headers: { Authorization: `Bearer ${auth.accessToken}` }
        });
        ///setImages(response?.data);
      } catch (error) {
        if (!error?.response) {
            setErrMsg('No Server Response');
        } else if (error.response.status === 400) {
            setErrMsg('Bad Request: The server could not understand the request due to invalid syntax.');
        } else if (error.response.status === 401) {
            setErrMsg('Unauthorized: Please check your authentication.');
        } else {
            setErrMsg(`Loading Failed`);
        }
        errRef.current.focus();
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
        <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
      {images.map((image, index) => (
        <img key={index} src={image.url} alt="" style={{ width: '100%', height: 'auto' }} />
      ))}
    </div>
    </div>
    
  );
}

export default ImageGrid;
