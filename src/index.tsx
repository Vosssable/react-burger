import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const getBasename = () => {
    const homepage = process.env.PUBLIC_URL;
    if (homepage) {
        try {
            const url = new URL(homepage);
            return url.pathname || '/';
        } catch {
            return homepage;
        }
    }
    return '/';
};

root.render(
    <React.StrictMode>
        <BrowserRouter basename={getBasename()}>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
