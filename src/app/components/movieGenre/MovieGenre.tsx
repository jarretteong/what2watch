import {
    fetchTMDBMovieGenres,
    fetchTMDBMovieImages,
    fetchTMDBMoviesByGenreId,
    fetchTMDBMovieVideos,
    fetchTMDBTrendingMovies,
} from "@/app/utils/tmdbApi";
import { ImageData, Video } from "@/interfaces/movie";
import _ from "lodash";
import React from "react";
import { SwiperOptions } from "swiper/types";
import MovieGenreComponent from "./MovieGenreComponent";

type MovieGenreProps = {
    genre: string;
    slidesPerView?:
        | {
              [width: number]: SwiperOptions;
              [ratio: string]: SwiperOptions;
          }
        | undefined;
    imageType: "posters" | "backdrops";
};

const MovieGenre = async ({ genre, slidesPerView, imageType }: MovieGenreProps) => {
    const genreData = await fetchTMDBMovieGenres(genre);
    if (genreData.id) {
        const movies = await fetchTMDBMoviesByGenreId(genreData.id);
        const genreMovies = await Promise.all(
            movies.results.map(async (movie: any) => {
                const videos = await fetchTMDBMovieVideos(movie.id);
                const images = await fetchTMDBMovieImages(movie.id);
                let filteredImages: any = {};
                if (images) {
                    _.keys(images)
                        .filter((key) => key === "id" || key === imageType)
                        .forEach((key) => {
                            if (_.isArray(images[key])) {
                                filteredImages[key] = images[key].filter(
                                    (image: ImageData) =>
                                        image.iso_639_1 === "en"
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
                    trailer: officialTrailer,
                };
            })
        );
        return (
            <MovieGenreComponent
                genre={genreData}
                movies={genreMovies}
                slidesPerView={slidesPerView}
                imageType={imageType}
            />
        );
    }
    return null;
};

export default MovieGenre;
