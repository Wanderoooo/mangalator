import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider';
import { KeyProvider } from './context/KeyContext';
import { MangaContextProvider } from './context/MangaReaderContext';
import { AccountCollectionContext } from './context/AccountCollectionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <KeyProvider>
        <MangaContextProvider>
          <AccountCollectionContext> //For testing without Authentication;
            <App />
          </AccountCollectionContext>
        </MangaContextProvider>
      </KeyProvider>
      
    </AuthProvider>
  </React.StrictMode>
);  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
