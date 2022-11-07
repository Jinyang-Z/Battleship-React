import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { IntlProvider } from 'react-intl';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetLanguageCookie, GetMessages } from './utils/Languages';
import './index.module.scss';
import AppRouter from './router/AppRouter';
import { store } from './redux/Store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const language = GetLanguageCookie();
const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IntlProvider locale={language} messages={GetMessages(language)}>
          <DndProvider backend={HTML5Backend}>
            <ToastContainer />
            <AppRouter />
          </DndProvider>
        </IntlProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
