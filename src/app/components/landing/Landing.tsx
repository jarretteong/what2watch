import {
    fetchTMDBMovieCredits,
    fetchTMDBMovieDetails,
    fetchTMDBMovieImages,
    fetchTMDBMovieVideos,
    fetchTMDBTrendingMovies,
} from "@/app/utils/tmdbApi";
import { ImageData, Movie, Video, VideoRes } from "@/interfaces/movie";
import _ from "lodash";
import React from "react";
import LandingMovie from "./LandingMovies";
import { getPlaiceholder } from "plaiceholder";
import { Credits } from "@/interfaces/credits";

type LandingProps = {
    movies: any;
};

const addPlaceholderImagesMovieDetails = async (data: Movie) => {
    if (data.backdrop_path) {
        const src = `https://image.tmdb.org/t/p/w342${data.backdrop_path}`;
        const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
        // const base64String = buffer.toString('base64');
        const { base64 } = await getPlaiceholder(buffer);
        data.backdrop_path_blur = base64;
    }
    if (data.poster_path) {
        const src = `https://image.tmdb.org/t/p/w342${data.poster_path}`;
        const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
        // const base64String = buffer.toString('base64');
        const { base64 } = await getPlaiceholder(buffer);
        data.poster_path_blur = base64;
    }
    return data;
};

const addPlaceholderImagesVideos = async (data: Video[]): Promise<Video[]> => {
    return await Promise.all(
        data.map(async (video: Video) => {
            if (video.key) {
                const src = `https://i.ytimg.com/vi/${video.key}/default.jpg`;
                const buffer = await fetch(src).then(async (res) =>
                    Buffer.from(await res.arrayBuffer())
                );
                // const base64String = buffer.toString('base64');
                const { base64 } = await getPlaiceholder(buffer);
                return {
                    ...video,
                    blurImage: base64,
                };
            }
            return video;
        })
    );
};

const Landing = async () => {
    const movies = await fetchTMDBTrendingMovies();
    const landingMovies = await Promise.all(
        movies.results.map(async (movie: any) => {
            const videos: VideoRes = await fetchTMDBMovieVideos(movie.id);
            const images = await fetchTMDBMovieImages(movie.id);
            const movieCredits: Credits = await fetchTMDBMovieCredits(movie.id);
            // movie = await addPlaceholderImagesMovieDetails(movie);
            // videos.results = await addPlaceholderImagesVideos(videos.results)
            if (images) {
                // await Promise.all(
                _.keys(images).forEach((key) => {
                    if (_.isArray(images[key])) {
                        images[key] = images[key].filter(
                            (image: ImageData) => image.iso_639_1 === "en"
                        );
                    }
                });
            }
            const officialTrailer = _.first(
                videos.results.filter((video: Video) => video.type === "Trailer")
            );
            return {
                ...movie,
                trailer: officialTrailer,
                images,
                videos: videos.results,
                credits: movieCredits,
            };
        })
    );
    return <LandingMovie movies={landingMovies} />;
};

export default Landing;
