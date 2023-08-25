import React, { useState } from 'react'
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../Components/carousel/Carousel'


const Trending = () => {
    const [endpoints, setEndpoints] = useState("day")
    const {data,loading} = useFetch(`trending/all/${endpoints}`)
    const onTabChange = (tab , index) =>{
        setEndpoints( tab === "Day" ? "day" : "week" )
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <SwitchTabs data = {["Day" , "Week"]} onTabChange = {onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending