import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import Img from "../../../Components/lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import useFetch from "../../../hooks/useFetch";
import CircleRating from "../../../Components/circleRating/CircleRating";
import Genre from "../../../Components/genre/Genre";
import { PlayIcon } from "./PlayBtn";
import VideoPopup from "../../../Components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { url } = useSelector((state) => state.home);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const _genres = data?.genres?.map((g) => g.id);

  const directors = crew?.filter((f) => f?.job === "Director");
  const writers = crew?.filter(
    (f) => f?.job === "ScreenPlay" || f?.job === "Writer" || f?.job === "Story"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className="backdrop-img">
                <Img src={url.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>

              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data?.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.name || data?.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data?.tagline}</div>
                    <Genre data={_genres} />
                    <div className="row">
                      <CircleRating rating={data?.vote_average?.toFixed(1)} />
                      <div className="playbtn" onClick={()=>{
                        setVideoId(video?.key) 
                        setShow(true)
                      }}>
                        <PlayIcon />
                        <span className="text">Watch Trailer!</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>
                    <div className="info">
                      {data?.status.length && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text"> {data?.status}</span>
                        </div>
                      )}
                      {data?.release_date.length && (
                        <div className="infoItem">
                          <span className="text bold">Release Date:</span>
                          <span className="text">
                            {dayjs(data?.release_date).format("MMM D YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {directors?.length && (
                      <div className="info">
                        <div className="infoItem">
                          <span className="text bold">Directors:</span>
                          <span className="text">
                            {directors?.map((d, idx) => (
                              <span key={idx}>
                                {d?.name} {directors.length - 1 !== idx && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    )}
                    {/* For writer */}
                    {writers?.length > 0 && (
                      <div className="info">
                        <div className="infoItem">
                          <span className="text bold">Writers:</span>
                          <span className="text">
                            {writers?.map((d, idx) => (
                              <span key={idx}>
                                {d?.name} {writers.length - 1 !== idx && ", "}
                              </span>
                              //it will print comma before the last index.
                            ))}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* for Creator */}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <div className="infoItem">
                          <span className="text bold">Creators:</span>
                          <span className="text">
                            {writers?.map((d, idx) => (
                              <span key={idx}>
                                {d?.name} {writers.length - 1 !== idx && ", "}
                              </span>
                              //it will print comma before the last index.
                            ))}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};
export default DetailsBanner;
