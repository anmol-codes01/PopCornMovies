import React from "react";
import { useState } from "react";
import Column from "../home/column-display";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedTvShows } from "./query";
import { fetchRatedMovies } from "./query";

export enum DisplayType {
  Movies = "movies",
  TvShows = "tvshows",
}

const Rated = () => {
  const [toggleButton, setToggleButton] = useState<DisplayType>(
    DisplayType.Movies
  );
  const { data: ratedMovies, isLoading: isLoadingRatedMovies } = useQuery({
    queryKey: ["ratedMovies"],
    queryFn: fetchRatedMovies,
  });
  const { data: ratedTvShows, isLoading: isLoadingRatedTvShows } = useQuery({
    queryKey: ["ratedTvshows"],
    queryFn: fetchRatedTvShows,
  });

  if (isLoadingRatedMovies || isLoadingRatedTvShows) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {/* buttons for toggling movies or tv shows */}
      <div className="flex justify-center">
        <button
          onClick={() => setToggleButton(DisplayType.Movies)}
          className={
            toggleButton === "movies"
              ? "w-40 bg-yellow-500 rounded-xl border  border-black  px-5 py-1 mx-1"
              : " w-40 bg-transparent rounded-xl border border-black  px-5 py-1 mx-1"
          }
        >
          Movie
        </button>
        <button
          onClick={() => setToggleButton(DisplayType.TvShows)}
          className={
            toggleButton === "tvshows"
              ? " w-40 bg-yellow-500 rounded-xl border border-black px-5 py-1 mx-1"
              : " w-40 bg-transparent rounded-xl border border-black px-5 py-1 mx-1"
          }
        >
          TV Shows
        </button>
      </div>

      {/* column display for movies */}

      <div>
        {toggleButton === DisplayType.Movies ? (
          <Column
            data={ratedMovies.results || []}
            displayType={DisplayType.Movies}
            isRated
          />
        ) : (
          <Column
            data={ratedTvShows.results || []}
            displayType={DisplayType.TvShows}
            isRated
          />
        )}
      </div>
    </div>
  );
};

export default Rated;
