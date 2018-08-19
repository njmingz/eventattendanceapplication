import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter } from 'react-router-dom';
import Page from './Page';
import  "./css/index.css";

ReactDOM.render((<BrowserRouter><Page /></BrowserRouter>),document.getElementById('root'));