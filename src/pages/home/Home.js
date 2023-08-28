import React from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import TopRated from "./topRated/TopRated";
import Popular from "./popular/Popular";
import UpComing from "./upcoming/UpComing";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending/>
      <Popular/>
      <TopRated/>
      <UpComing/>
      {/* <div style={{ height: 1000 }}></div> */}
    </div>
  );
};

export default Home;
