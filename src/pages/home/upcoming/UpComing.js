import React, { useState } from 'react'

import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper'
// import SwitchTabs from '../../../Components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../Components/carousel/Carousel'


const UpComing = () => {
    // const [endpoints, setEndpoints] = useState("movie")  
    const {data,loading} = useFetch(`/movie/upcoming`)
    // const onTabChange = (tab) =>{
    //     setEndpoints( tab === "Movies" ? "movie" : "" )
    // }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">UpComing Shows</span>
            {/* <SwitchTabs data = {["Movies" ]} onTabChange = {onTabChange}/> */}
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={"movie"}/>
    </div>
  )
}

export default UpComing