import { fetchTMDBTrendingMovies } from "@/app/utils/tmdbApi";
import React from "react";
import TrendingMovies from "./TrendingMovies";

const Trending = async () => {
    const trendingMovies = await fetchTMDBTrendingMovies()
    return <TrendingMovies movies={trendingMovies.results} />;
};

export default Trending;
