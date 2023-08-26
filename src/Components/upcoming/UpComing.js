import React, { useState } from 'react'

import ContentWrapper from '../contentWrapper/ContentWrapper'
import SwitchTabs from '../switchTabs/SwitchTabs'
import useFetch from '../../hooks/useFetch'
import Carousel from '../carousel/Carousel'


const UpComing = () => {
    const [endpoints, setEndpoints] = useState("movie")
    const {data,loading} = useFetch(`/${endpoints}/upcoming`)
    const onTabChange = (tab , index) =>{
        setEndpoints( tab === "Movies" ? "movie" : "tv" )
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">UpComing Shows</span>
            <SwitchTabs data = {["Movies" ]} onTabChange = {onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default UpComing