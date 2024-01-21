import { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import { KeyContext } from "../context/KeyContext";
import { useNavigate } from "react-router";



function CollectionElement({collectionInfo}) {
    const {name, data} = collectionInfo;
    const [mangaData, setMangaData] = useState([]);
    const { auth } = useContext(AuthContext);

    const { currentKey, setCurrentKey } = useContext(KeyContext);
    const navigate = useNavigate();
    
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');


    async function handleImageClick() {
        try {
            const response = await axios.get('Fetch Read API Call', JSON.stringify({key: auth.accessToken})); 
            setMangaData(response?.data);
            if (mangaData.length > 0) {
                setCurrentKey('read');
                navigate('/read');
            }
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

    return (
        <TouchableOpacity>
            <h2>{name}</h2>
            {data.map((image, index) => (
                <img key={index} src={image} alt="" onClick={handleImageClick} />
            ))}
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
      >
        {children}
      </div>
    );
  }
  

export default CollectionElement;