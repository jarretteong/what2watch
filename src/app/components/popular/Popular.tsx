import React from "react";
import PopularMovies from "./PopularMovies";
import { fetchTMDBPopularMovies } from "@/app/utils/tmdbApi";

const Popular = async () => {
    const movies = await fetchTMDBPopularMovies();
    return <PopularMovies movies={movies.results} />;
};

export default Popular;
