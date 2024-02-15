import React from "react";
import { useState, useEffect } from "react";

import { DisplayType } from "../home";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchedMovie, fetchSearchedTvShow } from "./query";
import { useParams } from "react-router-dom";
import Column from "../home/column-display";
const Search = () => {
  const { search: searchTerm } = useParams();
  const {
    data: searchDataMovie,
    isLoading: isLoadingSearchMovie,
    refetch: refetchMovie,
  } = useQuery({
    queryKey: ["searchmovie"],
    queryFn: () =>
      searchTerm ? fetchSearchedMovie(searchTerm) : Promise.resolve(null),
  });

  const {
    data: searchDataTv,
    isLoading: isLoadingSearchTv,
    refetch: refetchTv,
  } = useQuery({
    queryKey: ["searchtvshow"],
    queryFn: () =>
      searchTerm ? fetchSearchedTvShow(searchTerm) : Promise.resolve(null),
  });
  const [toggleButton, setToggleButton] = useState<DisplayType>(
    DisplayType.Movies
  );

  useEffect(() => {
    // Refetch data when searchTerm changes
    if (toggleButton === DisplayType.Movies) {
      refetchMovie();
    } else {
      refetchTv();
    }
  }, [searchTerm, toggleButton, refetchMovie, refetchTv]);

  if (isLoadingSearchMovie && isLoadingSearchTv) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div className="flex justify-center">
        <button
          onClick={() => setToggleButton(DisplayType.Movies)}
          className={
            toggleButton === DisplayType.Movies
              ? "w-40 bg-yellow-500 rounded-xl border border-black px-5 py-1 mx-1"
              : "w-40 bg-transparent rounded-xl border border-black px-5 py-1 mx-1"
          }
        >
          Movie
        </button>
        <button
          onClick={() => setToggleButton(DisplayType.TvShows)}
          className={
            toggleButton === DisplayType.TvShows
              ? "w-40 bg-yellow-500 rounded-xl border border-black px-5 py-1 mx-1"
              : "w-40 bg-transparent rounded-xl border border-black px-5 py-1 mx-1"
          }
        >
          TV Shows
        </button>
      </div>

      {/* column display for movies */}
      {isLoadingSearchMovie || isLoadingSearchTv ? (
        <div>Loading..</div>
      ) : (
        <div>
          {toggleButton === DisplayType.Movies && searchDataMovie && (
            <Column
              data={searchDataMovie.results}
              displayType={DisplayType.Movies}
            />
          )}

          {toggleButton === DisplayType.TvShows && searchDataTv && (
            <Column
              data={searchDataTv.results}
              displayType={DisplayType.TvShows}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
