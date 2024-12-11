import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import AdminPrivateRoute from './components/adminComponents/AdminPrivateRoute.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import AdminHomeScreen from './screens/adminScreens/AdminHomeScreen.jsx'
import AdminLoginScreen from './screens/adminScreens/AdminLoginScreen.jsx'
import EventSelectionScreen from './screens/EventSelectionScreen.jsx'
import AdminCategoryScreen from './screens/adminScreens/AdminCategoryScreen.jsx'
import AdminCustomerListScreen from './screens/adminScreens/AdminCustomerListScreen.jsx'
import store from './store.js'
import {Provider} from 'react-redux'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index path="/" element={<HomeScreen></HomeScreen>}></Route>
      <Route index path="/events" element={<EventSelectionScreen></EventSelectionScreen>}></Route>
    

      {/* **************admin*************************** */}

      <Route path="/admin" element={<AdminPrivateRoute />}>
        <Route index element={<AdminHomeScreen />} />
        <Route index path="category" element={<AdminCategoryScreen/>}></Route>
        <Route index path="selection" element={<AdminCustomerListScreen/>}></Route>

      </Route>
      <Route path="/admin/login" element={<AdminLoginScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
   <RouterProvider router = {router}/>
  </React.StrictMode>
  </Provider>
)
