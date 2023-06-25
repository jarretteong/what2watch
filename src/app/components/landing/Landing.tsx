import {
    fetchTMDBMovieDetails,
    fetchTMDBMovieImages,
    fetchTMDBMovieVideos,
    fetchTMDBTrendingMovies,
} from "@/app/utils/tmdbApi";
import { ImageData, Movie, Video } from "@/interfaces/movie";
import _ from "lodash";
import React from "react";
import LandingMovie from "./LandingMovies";
import { getPlaiceholder } from "plaiceholder";

type LandingProps = {
    movies: any;
}

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

const blurPlaceholderImage = async (src: string) => {
    const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
    // const base64String = buffer.toString('base64');
    const { base64 } = await getPlaiceholder(buffer);
    return base64;
};

const Landing = async () => {
    const movies = await fetchTMDBTrendingMovies();
    const landingMovies = await Promise.all(
        movies.results.map(async (movie: any) => {
            const videos = await fetchTMDBMovieVideos(movie.id);
            const images = await fetchTMDBMovieImages(movie.id);
            // const blurredImages: any = { backdrops: [], posters: [], logos: [] };

            movie = await addPlaceholderImagesMovieDetails(movie);
            if (images) {
                // await Promise.all(
                    _.keys(images).map(async (key) => {
                        if (_.isArray(images[key])) {
                            images[key] 
                                images[key]
                                    .filter((image: ImageData) => image.iso_639_1 === "en")
                                    .map(async (image: ImageData, index: number) => {
                                        // const blur_file_path =
                                        //     index <= 1
                                        //         ? await blurPlaceholderImage(
                                        //               `https://image.tmdb.org/t/p/original${image.file_path}`
                                        //           )
                                        //         : null;
                                        return {
                                            ...image,
                                            // blur_file_path,
                                        };
                                    })
                            
                            // console.log(images[key])
                            // return images[key];
                        }
                        // return null;
                    }).filter(Boolean)
                // );
            }
            const officialTrailer = _.first(
                videos.results.filter((video: Video) => video.type === "Trailer")
            );
            return {
                ...movie,
                trailer: officialTrailer,
                images,
            };
        })
    );
    return <LandingMovie movies={landingMovies} />;
};

export default Landing;
