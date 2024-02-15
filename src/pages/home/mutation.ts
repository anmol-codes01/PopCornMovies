export const rateMovie = async (movieId: number, rating: number) => {
  const guest_session_id = localStorage.getItem("guest_session_id");

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guest_session_id}&api_key=${
      import.meta.env.VITE_API_KEY
    }`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2RiZjkzY2RmMGRlZmY0MzQ4NGNiODA4NGU2ZWQzNyIsInN1YiI6IjY1ODY5YWM0NGZkMTQxNzNhNzVmNTU4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.exS44gONuvVj47xu7tHltC3cPwaMaRXAzM7WGsUWYkk",
      },
      body: `{"value":${rating}}`,
    }
  );

  const data = await res.json();
  console.log(rating);
  console.log(movieId);
  console.log(guest_session_id);

  return data;
};

export const rateTvShow = async (tvShowId: number, rating: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvShowId}/rating?guest_session_id=${localStorage.getItem(
      "guest_session_id"
    )}`,
    {
      method: "POST",

      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2RiZjkzY2RmMGRlZmY0MzQ4NGNiODA4NGU2ZWQzNyIsInN1YiI6IjY1ODY5YWM0NGZkMTQxNzNhNzVmNTU4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.exS44gONuvVj47xu7tHltC3cPwaMaRXAzM7WGsUWYkk",
      },
      body: `{"value":${rating}}`,
    }
  );
  const data = await res.json();

  return data;
};
