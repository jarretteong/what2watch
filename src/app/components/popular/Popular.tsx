import React from "react";
import PopularMovies from "./PopularMovies";

const fetchPopularMovies = async () => {
    const popularData = await fetch(
        `${process.env.TMDB_V3_URL}/movie/popular?api_key=${process.env.TMDB_APIKEY}`
    );
    const movies = await popularData.json();
    return movies;
}

const Popular = async () => {
    const movies = await fetchPopularMovies();
    return <PopularMovies movies={movies.results} />
};

export default Popular;
