import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {createBrowserRouter, RouterProvider} from 'react-router'
import Products from './components/Products.jsx'
import Product from './components/Product.jsx'

const queryClient = new QueryClient()
const route = createBrowserRouter([
  {
    path:'/',
    element:<Products/>
  },
  {
    path:'/:productId',
    element:<Product />
  }
])

 


createRoot(document.getElementById('root')).render(

    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route}/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
 
)
