import { fetchTMDBMovieDetails, fetchTMDBMovieVideos, fetchTMDBTrendingMovies } from "@/app/utils/tmdbApi";
import _ from "lodash";
import React from "react";
import { Video } from "../videos/Videos";
import LandingMovie from "./LandingMovies";

const Popular = async () => {
    const movies = await fetchTMDBTrendingMovies();
    const popularMovies = await Promise.all(
        movies.results.map(async (movie: any) => {
            const videos = await fetchTMDBMovieVideos(movie.id);
            const officialTrailer = _.first(videos.results.filter(
                (video: Video) => video.type === "Trailer"
            ));
            return {
                ...movie,
                trailer: officialTrailer,
            };
        })
    );
    return <LandingMovie movies={popularMovies} />;
};

export default Popular;
