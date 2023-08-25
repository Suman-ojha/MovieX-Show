import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from '../../../Components/lazyLoadImage/Img'
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper'


const HeroBanner = () => {
  const [query, setQuery] = useState("")
  const [background, setBackground] = useState("")
  const {data,loading} =useFetch('/movie/upcoming')
  const {url} =  useSelector((state)=>state.home)
  const navigate = useNavigate();

  useEffect(() => {
    const bg = url?.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path
    setBackground(bg)
  }, [data])
  
  const searchQueryHandler = (e) => {
    if(e.key==="Enter" && query.length >0){
      navigate(`/search/:${query}`)
    }
  };
  return (
    <div className="heroBanner">

     {!loading && <div className="backdrop-img">
        <Img src={background} />
      </div>}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millons of Movies,Tv Shows and People to discover and Explore now...
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie,Tv shows..."
              onChange={(e)=>setQuery(e.target.value)}
              onKeyUp={(e)=>searchQueryHandler(e)}
            />
            <button className="btn">Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
