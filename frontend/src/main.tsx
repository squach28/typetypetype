import ReactDOM from 'react-dom/client'
import Room from './pages/Room.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import Home from './pages/Home.tsx'
import { createTheme, ThemeProvider } from '@mui/material'

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

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
    <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
    </ThemeProvider>
)
