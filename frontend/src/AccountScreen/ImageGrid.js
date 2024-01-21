import React, { useState, useEffect, useContext, useRef  } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';
import CollectionElement from './CollectionElement';
import img7034 from '../assets/IMG_7034.PNG';
import img7035 from '../assets/IMG_7035.PNG';
import img7036 from '../assets/IMG_7036.PNG';
import testmanga from '../assets/testmanga.png';
import { AccountCollection } from '../context/AccountCollectionContext';
import { useForkRef } from '@mui/material';

function ImageGrid({userKey}) {
  const [collectionData, setCollectionData] = useState([]);
  const [testingData, setTestingData] = useState();
  const { auth } = useContext(AuthContext);

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  const { accountContext } = useContext(AccountCollection);

  const sanity = [{
    name: "TestCollection1",
    data: [img7034, img7035, img7036]
  }, {
    name: "GameDevCollection1",
    data: [testmanga, img7034, testmanga]
  }]
  
  useEffect(() => {
    setTestingData(accountContext);
    console.log(accountContext)
    //setTestingData(sanity);
  }, [accountContext])
  
 

  useEffect(() => {
    setErrMsg('');
  }, [collectionData]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/dashboard/${userKey}`)
        console.log(response?.data)
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
        errRef?.current?.focus();
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
        <p ref={errRef} className={errMsg? "onscreen" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <p className={collectionData.length > 0? "onscreen" : "offscreen"} aria-live="assertive">Choose A Collection First!</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
      {collectionData?.map((collectionInfo, index) => (
        <CollectionElement key={index} collectionInfo={collectionInfo}/>
      ))}
    </div>
    </div>
    
  );
}

export default ImageGrid;
