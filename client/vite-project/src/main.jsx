import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { appStore } from './app/store'
import { Provider } from 'react-redux'
import { Provider } from 'react-redux';
import { appStore } from './app/store.js';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <StrictMode>
       <App />
       <Toaster/>
  </StrictMode>,
  </Provider>
)
