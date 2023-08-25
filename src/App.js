import React, { useEffect } from 'react'
import {Route,Routes} from 'react-router-dom'
import {fetchDataFromApi} from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'

import Home from './pages/home/Home'
import Page_404 from './pages/404/Page_404'
import Explore from './pages/explore/Explore'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import Header from './Components/header/Header'
import Footer from './Components/footer/Footer'
const App = () => {
  const dispatch = useDispatch()
  const {url} = useSelector((state) => state.home)
  useEffect(() => {
    fetchApiDataConfig();
  }, [])
  
  const fetchApiDataConfig = async() =>{
    try {
      const data = await fetchDataFromApi('/configuration') 
      const url ={
        backdrop : data.images.secure_base_url + "original",
        poster : data.images.secure_base_url + "original",
        profile : data.images.secure_base_url + "original"

      }
      dispatch(getApiConfiguration(url)) 
      return data;
      
    } catch (error) {
      return error
    }

  }
  
  return (
    <div>
    <Header/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:mediaType/:id' element={<Details/>}/>
          <Route path='/search/:query' element={<SearchResult/>}/>
          <Route path='/explore/:mediaType' element={<Explore/>}/>
          <Route path='*' element={<Page_404/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App