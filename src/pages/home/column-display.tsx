import { DisplayType } from ".";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rateMovie } from "./mutation";
import { rateTvShow } from "./mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date: string;
  rating?: number;
}
interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  isRated?: boolean;
}

const Column = (props: Props) => {
  const { data, displayType, isRated } = props;
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  const onSuccess = () => {
    toast.success("Succesfully rated");
  };

  const onError = () => {
    // toast.error("Could not rate");
  };
  const { mutate: rateMovieMutation } = useMutation<
    number,
    Error,
    { id: number; rating: number }
  >({
    mutationKey: ["rateMovie"],
    mutationFn: async ({ id, rating }) => rateMovie(id, rating),
    onSuccess: onSuccess,
    onError: onError,
  });

  const { mutate: rateTvShowMutation } = useMutation<
    number,
    Error,
    { id: number; rating: number }
  >({
    mutationKey: ["rateTvShow"],
    mutationFn: async ({ id, rating }) => rateTvShow(id, rating),
    // onSuccess: onSuccess,
    // onError: onError,
  });

  return (
    <div className="max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-4 gap-16">
      {data.map((displayData: DisplayData) => (
        <div className="rounded-xl relative h-[600px]" key={displayData.id}>
          <Link
            className="block relative rounded-xl overflow-hidden h-[500px] "
            to={`/${displayType === DisplayType.Movies ? "movie" : "tvshow"}/${
              displayData.id
            }`}
          >
            <div className="absolute h-full w-full border shadow-md rounded-xl text-white"></div>
            <img
              className="max-h-[160px] md:max-h-[300px] w-full object-cover rounded-xl"
              src={`https://image.tmdb.org/t/p/original${displayData.poster_path}`}
              alt=""
            />

            <div className="flex justify-between font-bold p-2 text-sm">
              <p className="font-bold">
                {displayType === DisplayType.Movies
                  ? displayData.title
                  : displayData.name}
              </p>

              <p className="text-sm text-gray-600 mb-4">
                Released: {displayData.release_date}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-sm text-center font-bold">
                Rating: {displayData.vote_average}
              </p>

              <p className="my-2 p-2">
                {displayData.overview.slice(0, 150) + "..."}
              </p>
            </div>
          </Link>
          {!displayData.rating &&
            !isRated && ( // Check if displayData.rating does not exist and isRated is false
              <div className="mt-2 flex">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  onChange={(e) =>
                    setRatings({
                      ...ratings,
                      [displayData.id]: Number(e.target.value),
                    })
                  }
                  className="border border-gray-300 p-2 rounded-md focus:outline-none cursor-pointer"
                  placeholder="Rating"
                />

                <button
                  onClick={() => {
                    displayType === DisplayType.Movies
                      ? rateMovieMutation({
                          id: displayData.id,
                          rating: ratings[displayData.id],
                        })
                      : rateTvShowMutation({
                          id: displayData.id,
                          rating: ratings[displayData.id],
                        });
                  }}
                  className="w-[100px] border bg-yellow-600 border-gray-300 p-2 rounded-md cursor-pointer"
                >
                  Rate
                </button>
              </div>
            )}
          <div>
            {isRated && (
              <h3 className="mt-2 text-lg font-bold text-gray-800">
                Your Rating: {displayData.rating}
              </h3>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Column;
