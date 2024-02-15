import React from "react";
import { useParams } from "react-router-dom";
import { fetchTvShowDetails } from "./query";
import { useQuery } from "@tanstack/react-query";

const TvShow = () => {
  const { id } = useParams<string>();

  if (!id) {
    return <div> Invalid TvShow ID</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["tvShow"],
    queryFn: () => fetchTvShowDetails(id),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div className="w-full mx-auto h-[100%] p-2 bg-yellow-400 rounded-md shadow-md">
        <h1 className="font-bold text-2xl text-center">{data.name}</h1>
        <div className="flex mt-3">
          <div className="flex-1">
            <img
              className="h-[600px] object-cover rounded-t-md"
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              alt=""
            />

            <p className="text-sm font-bold text-gray-600 mb-4">
              Released: {data.release_date}
            </p>
          </div>
          <div className=" flex-1 p-4 border border-black shadow-lg rounded-xl h-">
            <ul className="">
              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                {data.overview}
              </li>
              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                Run Time: {data.episode_run_time} minutes
              </li>

              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                Genres: {data.genres.map((genre: any) => genre.name).join(", ")}
              </li>
              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                First Aired: {data.first_air_date}
              </li>

              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                Number of episodes: {data.number_of_episodes}
              </li>
              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                Number of seasons: {data.number_of_seasons}
              </li>
              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4"></li>
              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                Created By:{" "}
                {data.created_by.map((creator: any) => creator.name).join(", ")}
              </li>
              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                Produced By:{" "}
                {data.production_companies
                  .map((company: any) => company.name)
                  .join(", ")}
              </li>

              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                Language: {data.original_language}
              </li>

              <div>
                <h2 className="text-xl font-bold mb-2 font-mono">Seasons</h2>
                <ul className=" max-h-[300px] overflow-scroll">
                  {data.seasons.map((season: any) => (
                    <li key={season.season_number}>
                      <button className="cursor-pointer">
                        Season {season.season_number}
                      </button>
                      {/* Additional information about the season */}
                      <div className="ml-4 text-gray-700">
                        <p>Number of Episodes: {season.episode_count}</p>
                        <p>Release Year: {season.air_date}</p>
                        {/* Add more season details as needed */}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvShow;
