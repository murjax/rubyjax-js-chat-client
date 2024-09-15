import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import ChannelNew from './components/ChannelNew';
import ChannelShow from './components/ChannelShow';
import ChannelIndex from './components/ChannelIndex';
import Navigation from './components/Navigation';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/channels",
          element: <ChannelIndex />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/channels/new",
          element: <ChannelNew />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/channels/:id",
          element: <ChannelShow />,
          errorElement: <ErrorPage />,
        }
      ]
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}>
        <Navigation />
      </RouterProvider>
    </div>
  );
}

export default App;

