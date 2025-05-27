// import { Children, StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Provider } from 'react-redux';
// import { appStore } from './app/store.js';
// import { Toaster } from 'sonner';
// import { useLoadUserQuery } from './features/api/authApi';


// const Custom=({children})=>{
//   const {isLoading}=useLoadUserQuery();
//   return <>
//   {isLoading ? <h1> Loading...</h1>:<>{children}</>}
//   </>;
// };

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={appStore} > 
//       <Custom>
//       <App />
//        <Toaster/>
//       </Custom>
       
//        </Provider>
   
//   </StrictMode>,
// // )
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Provider } from 'react-redux';
// import { appStore } from './app/store.js';
// import { Toaster } from 'sonner';
// import { useLoadUserQuery } from './features/api/authApi';

// const AppWithUser = () => {
//   const { isLoading } = useLoadUserQuery();

//   if (isLoading) return <h1>Loading user session...</h1>;

//   return <App />;
// };

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={appStore}>
//       <AppWithUser />
//       <Toaster />
//     </Provider>
//   </StrictMode>,
// )



//deepseek versionn
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { Toaster } from "sonner";
import { useLoadUserQuery } from "./features/api/authApi";
import LoadingSpinner from "./components/ui/LoadingSpinner.jsx";

const AuthLoader = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return isLoading ? <LoadingSpinner /> : children;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <Toaster />
      <AuthLoader>
        <App />
      </AuthLoader>
    </Provider>
  </StrictMode>
);
