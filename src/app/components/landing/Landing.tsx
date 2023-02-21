import React from "react";
import LandingMovie from "./LandingMovies";

const fetchLandingMovie = async () => {
    const trendingMovies = await fetch(
        `${process.env.TMDB_V3_URL}/trending/movie/day?api_key=${process.env.TMDB_APIKEY}`
    );
    const movies = await trendingMovies.json();
    return movies;
}

const Popular = async () => {
    const movies = await fetchLandingMovie();
    return <LandingMovie movies={movies.results} />
};

export default Popular;
