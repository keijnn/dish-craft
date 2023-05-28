//import modules
import React from 'react';
import ReactDOM from 'react-dom/client';
//import pages
import { Routing } from '@/pages';
//import styles
import './main.css';
import { appStarted } from '@/shared/init';

appStarted();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
);
