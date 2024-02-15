export const fetchTvShowDetails = async (tvShowId: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`,
    {
      headers: {
        Authorization:
          " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2RiZjkzY2RmMGRlZmY0MzQ4NGNiODA4NGU2ZWQzNyIsInN1YiI6IjY1ODY5YWM0NGZkMTQxNzNhNzVmNTU4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.exS44gONuvVj47xu7tHltC3cPwaMaRXAzM7WGsUWYkk",
      },
    }
  );
  const data = await res.json();

  return data;
};
