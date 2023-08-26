import React, { useState } from 'react'

import Carousel from '../carousel/Carousel'
import useFetch from '../../hooks/useFetch'
import SwitchTabs from '../switchTabs/SwitchTabs'
import ContentWrapper from '../contentWrapper/ContentWrapper'




const Popular = () => {
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

export default Popular