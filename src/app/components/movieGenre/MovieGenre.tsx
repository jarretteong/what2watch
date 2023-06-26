import {
    fetchTMDBMovieCredits,
    fetchTMDBMovieGenres,
    fetchTMDBMovieImages,
    fetchTMDBMoviesByGenreId,
    fetchTMDBMovieVideos,
    fetchTMDBTrendingMovies,
} from "@/app/utils/tmdbApi";
import { ImageData, Movie, Video } from "@/interfaces/movie";
import _ from "lodash";
import React from "react";
import { SwiperOptions } from "swiper/types";
import MovieGenreComponent from "./MovieGenreComponent";
import { getPlaiceholder } from "plaiceholder";
import { Credits } from "@/interfaces/credits";

type MovieGenreProps = {
    genre: string;
    type?: "full" | "poster" | "backdrop" | "overview";
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

const MovieGenre = async ({ genre, type }: MovieGenreProps) => {
    const genreData = await fetchTMDBMovieGenres(genre);
    if (genreData.id) {
        const movies = await fetchTMDBMoviesByGenreId(genreData.id);

        const genreMovies = await Promise.all(
            movies.results.map(async (movie: any, index: number) => {
                const videos = await fetchTMDBMovieVideos(movie.id);
                const images = await fetchTMDBMovieImages(movie.id);
                const movieCredits: Credits = await fetchTMDBMovieCredits(movie.id);

                if (index <= 5) {
                    // videos.results = await addPlaceholderImagesVideos(videos.results);
                    movie = await addPlaceholderImagesMovieDetails(movie);
                }

                let filteredImages: any = {};
                if (images) {
                    _.keys(images)
                        .filter((key) => key === "id" || key === "backdrops" || key === "posters")
                        .forEach((key) => {
                            if (_.isArray(images[key])) {
                                filteredImages[key] = images[key].filter(
                                    (image: ImageData) => image.iso_639_1 === "en"
                                );
                            } else if (key === "id") {
                                filteredImages[key] = images[key];
                            }
                            return null;
                        });
                }
                const officialTrailer = _.first(
                    videos.results.filter((video: Video) => video.type === "Trailer")
                );
                return {
                    ...movie,
                    ...filteredImages,
                    images: {
                        ...filteredImages,
                    },
                    videos: videos.results,
                    trailer: officialTrailer,
                    credits: movieCredits,
                };
            })
        );
        return <MovieGenreComponent genre={genreData} movies={genreMovies} type={type || "full"} />;
    }
    return null;
};

export default MovieGenre;
