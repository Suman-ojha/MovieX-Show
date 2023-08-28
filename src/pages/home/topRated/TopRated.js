import React, { useState } from 'react'

import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs'
import Carousel from '../../../Components/carousel/Carousel'






const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie")
    const {data,loading} = useFetch(`/${endpoint}/popular`)
    const onTabChange = (tab , index) =>{
        setEndpoint( tab === "Movies" ? "movie" : "tv" )
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Top Rated</span>
            <SwitchTabs data = {["Movies" , "Tv Shows"]} onTabChange = {onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  ) 
}

export default TopRated