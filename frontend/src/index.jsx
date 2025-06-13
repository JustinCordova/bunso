import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';

import App from './App';
import './index.css';

const store = configureStore({
  reducer: reducers,
  // thunk is already included by default — no need to add it manually
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
