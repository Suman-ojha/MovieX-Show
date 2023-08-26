import React, { useEffect } from 'react'
import {Route,Routes} from 'react-router-dom'
import {fetchDataFromApi} from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'

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
    genresCall();
  }, [])


  const genresCall = async () =>{
    let promises = []
    let endPoints = ["tv","movie"]
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data =await Promise.all(promises);
    console.log(data);
    //now will store the value as key-value pair within that item
    data.map(({genres})=>{
      return  genres.map((item)=>(allGenres[item.id]=item))
    })
    dispatch(getGenres(allGenres))
  }
  
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