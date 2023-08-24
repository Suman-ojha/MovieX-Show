import React, { useEffect } from 'react'
import {Route,Routes} from 'react-router-dom'
import {fetchDataFromApi} from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'
const App = () => {
  const dispatch = useDispatch()
  const {url} = useSelector((state) => state.home)
  useEffect(() => {
    apiTesting();
  }, [])
  
  const apiTesting = async() =>{
    try {
      const data = await fetchDataFromApi('/movie/popular') 
      dispatch(getApiConfiguration(data)) 
      return data;
      
    } catch (error) {
      return error
    }

  }
  
  return (
    <div>MovieXsHow {url?.total_pages}</div>
  )
}

export default App