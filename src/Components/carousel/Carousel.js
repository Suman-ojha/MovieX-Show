import React, { useRef } from "react";
import "./style.scss";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genre from "../genre/Genre";

const Carousel = ({ data, loading ,endpoint, title}) => {
  //for referencing the object
  const carouselRef = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const skItem = () => {
    return (
      <div className="sketetonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  //to scroll left and right direction
  const navigation = (direction) => {
    try {
      const container = carouselRef.current;
      const scrollAmt =
        direction === "left"
          ? container.scrollLeft - (container.offsetWidth + 20)
          : container.scrollLeft + (container.offsetWidth + 20);
      container.scrollTo({ left: scrollAmt, behavior: "smooth" });
    } catch (error) {
      console.error("Error navigating carousel:", error);
    }
  };

  //here contenWarpper(Higher order function) center the elements
  return (
    <div className="carousel">
      <ContentWrapper>
      {title && (<div className="carouselTitle">{title}</div>)}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselRef}>
            {data?.map((item, idx) => {
              const posterUrl = item?.poster_path
                ? (url?.poster + item?.poster_path)
                : PosterFallback;
              return (
                <div
                  key={idx}
                  className="carouselItem"
                  onClick={() => navigate(`/${item?.media_type || endpoint}/${item?.id}`)}
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} alt="poster image" />
                    <CircleRating rating={item?.vote_average?.toFixed(1)} />
                    <Genre data={item?.genre_ids?.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item?.title || item?.name}</span>
                    <span className="date">
                      {dayjs(item?.release_Date)?.format("MMM D,YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
