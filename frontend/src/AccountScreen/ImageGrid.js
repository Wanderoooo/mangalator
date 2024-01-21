import React, { useState, useEffect, useContext, useRef  } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';
import CollectionElement from './CollectionElement';

function ImageGrid() {
  const [collectionData, setCollectionData] = useState([]);
  const { auth } = useContext(AuthContext);

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [collectionData]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('Fetch Collection API CALL', JSON.stringify({key: auth.accessToken})); 
        setCollectionData(response?.data);
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
        <p ref={errRef} className={errMsg? "onscreen" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <p className={collectionData.length > 0? "onscreen" : "offscreen"} aria-live="assertive">Choose A Collection First!</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
      {collectionData.map((collectionInfo, index) => (
        <CollectionElement key={index} collectionInfo={collectionInfo}/>
      ))}
    </div>
    </div>
    
  );
}

export default ImageGrid;
