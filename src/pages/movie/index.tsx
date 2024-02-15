import React from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "./query";
import { useQuery } from "@tanstack/react-query";

const Movie = () => {
  const { id } = useParams<string>();

  if (!id) {
    return <div> Invalid Movie ID</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div className="w-full mx-auto h-[100%] p-2 bg-yellow-400 rounded-md shadow-md">
        <h1 className="font-bold text-2xl text-center">{data.title}</h1>
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
                Adult Rating? {data.adult ? "Yes" : "No"}
              </li>

              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                Genres: {data.genres.map((genre: any) => genre.name).join(", ")}
              </li>
              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                Budget: {data.budget}
              </li>

              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                IMDB ID: {data.imdb_id}
              </li>
              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                Revenue: {data.revenue}
              </li>
              <li className="text-md md:text-xl lg:text-2xl font-mono font-bold mb-4">
                Runtime: {data.runtime} minutes
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
