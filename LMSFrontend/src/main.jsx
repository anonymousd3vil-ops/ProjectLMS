//component
import App from './App.jsx';

//css
import './styles/style.css';

//library
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
        <Toaster />  {/* for error/notification pop up in application */}
    </BrowserRouter>
);
