import { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import { KeyContext } from "../context/KeyContext";
import { useNavigate } from "react-router";
import "./CollectionElement.css"
import { MangaContext } from "../context/MangaReaderContext";
import Paper from '@mui/material/Paper';
import "./CollectionElement.css"

function CollectionElement({collectionInfo}) {
    const {name, data} = collectionInfo;

    const { currentKey, setCurrentKey } = useContext(KeyContext);
    const navigate = useNavigate();

    const { currentMangaContext, setCurrentMangaContext } = useContext(MangaContext);


    function handleImageClick() {
        setCurrentMangaContext(collectionInfo)
        setCurrentKey('read');
        navigate('/reader');
    };

    return (
        <TouchableOpacity>
            <Paper style={{ height: '600px' }}>
              <div className="leftPadding">
                <h2 className="AlbumTitle">{name}</h2>
                <img className="coverImage" key="coverImage" src={data[0]} alt="" onClick={handleImageClick} /> 
              </div>            
            </Paper>
        </TouchableOpacity>
    );
}

function TouchableOpacity({ children, onClick }) {
    return (
      <div
        onClick={onClick}
        style={{
          cursor: 'pointer',
          transition: 'opacity 0.2s',
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.opacity = '0.5';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.5';
          }}
      >
        {children}
      </div>
    );
  }
  

export default CollectionElement;