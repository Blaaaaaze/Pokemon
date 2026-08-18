import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.scss";
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { AppRouter } from './AppRouter.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  </StrictMode>,
)
