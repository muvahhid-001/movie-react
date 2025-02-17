const FetchApi = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTc0MDk1YTQ5YWNjMjc1ODRmMTVhNzExOWEwNjQ5ZiIsIm5iZiI6MTczOTY1NDI2Mi44NDYwMDAyLCJzdWIiOiI2N2IxMDQ3NmFjMDg4YTQxNDU2YzU1N2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gnVJJMRbg5IxGwgkj0MHQQbS5Zy_kbCIZKcR7-FIKc8",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options,
  )
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        movies: data,
      });
    })
    .catch((error) => {
      this.setState({
        error: {
          status: true,
          message: { error },
        },
      });
    });
};

export default FetchApi;
