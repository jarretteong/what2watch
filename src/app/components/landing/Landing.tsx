import { fetchTMDBMovieDetails, fetchTMDBMovieImages, fetchTMDBMovieVideos, fetchTMDBTrendingMovies } from "@/app/utils/tmdbApi";
import { ImageData, Video } from "@/interfaces/movie";
import _ from "lodash";
import React from "react";
import LandingMovie from "./LandingMovies";

const Popular = async () => {
    const movies = await fetchTMDBTrendingMovies();
    const popularMovies = await Promise.all(
        movies.results.map(async (movie: any) => {
            const videos = await fetchTMDBMovieVideos(movie.id);
            const images = await fetchTMDBMovieImages(movie.id);
            if (images) {
                _.keys(images).forEach((key) => {
                    if (_.isArray(images[key])) {
                        images[key] = images[key].filter((image: ImageData) => image.iso_639_1 === 'en')
                    }
                })
            }
            const officialTrailer = _.first(videos.results.filter(
                (video: Video) => video.type === "Trailer"
            ));
            return {
                ...movie,
                trailer: officialTrailer,
                images,
            };
        })
    );
    return <LandingMovie movies={popularMovies} />;
};

export default Popular;
