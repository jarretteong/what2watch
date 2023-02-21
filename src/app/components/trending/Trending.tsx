import React from "react";
import TrendingMovies from "./TrendingMovies";

const Trending = async () => {
    const trendingData = await fetch(
        `${process.env.TMDB_V3_URL}/trending/movie/day?api_key=${process.env.TMDB_APIKEY}`
    );
    const movies = await trendingData.json();
    console.log({ movies });
    return <TrendingMovies movies={movies.results} />;
};

export default Trending;
