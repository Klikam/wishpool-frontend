import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './components/App.tsx';
import './index.css';
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h2>Something were wrong</h2>,
  },
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
