import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store/index";
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import './index.css'

axios.defaults.baseURL =  "http://localhost:4000/api";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </React.StrictMode>,
)
