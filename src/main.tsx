import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './components/App.tsx';
import './index.css';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h2>Something were wrong</h2>,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
