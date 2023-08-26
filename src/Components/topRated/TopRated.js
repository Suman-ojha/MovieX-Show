import React, { useState } from 'react'

import ContentWrapper from '../contentWrapper/ContentWrapper'
import SwitchTabs from '../switchTabs/SwitchTabs'
import useFetch from '../../hooks/useFetch'
import Carousel from '../carousel/Carousel'





const TopRated = () => {
    const [endpoints, setEndpoints] = useState("movie")
    const {data,loading} = useFetch(`/${endpoints}/popular`)
    const onTabChange = (tab , index) =>{
        setEndpoints( tab === "Movies" ? "movie" : "tv" )
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">What's Popular</span>
            <SwitchTabs data = {["Movies" , "Tv Shows"]} onTabChange = {onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
    </div>
  ) 
}

export default TopRated