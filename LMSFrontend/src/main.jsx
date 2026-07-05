//component
import App from './App.jsx';
import store from './redux/store.js';

//css
import './styles/style.css';

//library
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <Toaster />  {/* for error/notification pop up in application */}
        </BrowserRouter>
    </Provider>
);
