export const fetchSearchedMovie = async (search: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2RiZjkzY2RmMGRlZmY0MzQ4NGNiODA4NGU2ZWQzNyIsInN1YiI6IjY1ODY5YWM0NGZkMTQxNzNhNzVmNTU4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.exS44gONuvVj47xu7tHltC3cPwaMaRXAzM7WGsUWYkk",
      },
    }
  );
  const data = await res.json();
  console.log(search);

  return data;
};

export const fetchSearchedTvShow = async (search: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2RiZjkzY2RmMGRlZmY0MzQ4NGNiODA4NGU2ZWQzNyIsInN1YiI6IjY1ODY5YWM0NGZkMTQxNzNhNzVmNTU4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.exS44gONuvVj47xu7tHltC3cPwaMaRXAzM7WGsUWYkk",
      },
    }
  );
  const data = await res.json();

  return data;
};
