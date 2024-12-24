import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./UserContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserProvider>
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
            <App/>
        </BrowserRouter>
        </UserProvider>
    </StrictMode>,
)
