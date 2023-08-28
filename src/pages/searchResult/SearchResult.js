import React, { useState, useEffect } from "react";

import "./style.scss";

import { useParams } from "react-router-dom";
import ContentWrapper from "../../Components/contentWrapper/ContentWrapper";
import { fetchDataFromApi } from "../../utils/api";
import noResult from "../../assets/no-results.png";
import Spinner from "../../Components/spinner/Spinner";
import MovieCard from "../../Components/movieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  //added to the previous data to the new data....
  //every time call ..previous page data will be added to next one...
  //like that inifite scrolling will happen
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
          //incase for the first time api will call..data will be added...(or only for single page)
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    setPageNum(1)
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading ? (
        <Spinner initial={true} />
      ) : data?.results?.length ? (
        <ContentWrapper>
          <div className="pageTitle">
            {` Search ${
              data.results.length > 1 ? "Results" : "Result"
            } of '${query.slice(1)}'`}
          </div>
          <InfiniteScroll
            className="content"
            dataLength={data?.results?.length || []}
            next={fetchNextPageData}
            hasMore={pageNum <=data?.total_pages}
            loader={<Spinner/>}
          >
            {data?.results?.map((item, idx) => {
              if (item?.media_type === "person") return;
              return <MovieCard key={idx} data={item} fromSearch={true} />;
            })}
          </InfiniteScroll>
        </ContentWrapper>
      ) : (
        <div className="resultNotFound">Sorry Result Not Found !!</div>
      )}
    </div>
  );
};

export default SearchResult;
