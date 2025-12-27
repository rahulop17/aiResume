import React,{useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home.jsx'
import Dashboard from './assets/pages/Dashboard.jsx'
import ResumeBuilder from './assets/pages/ResumeBuilder.jsx'
import Preview from './assets/pages/preview.jsx'
import Login from './assets/pages/Login.jsx'
import Layout from './assets/pages/Layout.jsx'
import api from './configs/api.js'
import { login, setLoading } from './app/features/authSlice.js'
import { useDispatch } from 'react-redux'
import {Toaster} from 'react-hot-toast'

const App = () => {

  const dispatch = useDispatch()

  const getUserData = async (params) =>{
    const token = localStorage.getItem('token')

    try {
      if(token){
        const {data} = await api.get('/api/users/data' , { headers :{Authorization : token}})

        if(data.user){
          dispatch(login({token , user:data.user}))
        }
        dispatch(setLoading(false))



      }else{
        dispatch(setLoading(false))
      }
      
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.message)
    }


  }

  useEffect(()=>{
    getUserData()
  } , [])

  


  return (
    <>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>
        <Route path='/view/:resumeId' element={<Preview />} />
        
      </Routes>
    </>
  )
}

export default App
