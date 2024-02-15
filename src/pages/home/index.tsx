import { useState } from "react";
import Column from "./column-display";
import { fetchMovies, fetchTvShows } from "./query";
import { useQuery } from "@tanstack/react-query";

export enum DisplayType {
  Movies = "movies",
  TvShows = "tvshows",
}

const Home = () => {
  const [toggleButton, setToggleButton] = useState<DisplayType>(
    DisplayType.Movies
  );

  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
  const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({
    queryKey: ["tvshows"],
    queryFn: fetchTvShows,
  });

  return (
    // outer div
    <div className=" my-2 mx-auto h-auto ">
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
      {isLoadingMovies || isLoadingTvShows ? (
        <div>Loading..</div>
      ) : (
        <div>
          {toggleButton === DisplayType.Movies ? (
            <Column data={movieData.results} displayType={DisplayType.Movies} />
          ) : (
            <Column
              data={tvShowData.results}
              displayType={DisplayType.TvShows}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
