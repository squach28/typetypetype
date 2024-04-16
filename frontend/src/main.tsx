import ReactDOM from 'react-dom/client'
import Room from './pages/Room.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import Home from './pages/Home.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/room/:roomId',
        element: <Room />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
