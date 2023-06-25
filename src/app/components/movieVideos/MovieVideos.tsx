import {
    fetchTMDBMovieCredits,
    fetchTMDBMovieDetails,
    fetchTMDBMovieImages,
    fetchTMDBMovieVideos,
    fetchTMDBTrendingMovies,
} from "@/app/utils/tmdbApi";
import { ImageData, Movie, MovieCustom, Video, VideoRes } from "@/interfaces/movie";
import _ from "lodash";
import React from "react";
// import { getPlaiceholder } from "plaiceholder";
import { Credits } from "@/interfaces/credits";
import MovieVideosClient from "./MovieVideosClient";

type MovieVideosProps = {
    movie: MovieCustom;
    open: boolean;
    setOpen: any;
};

// const addPlaceholderImagesMovieDetails = async (data: Movie) => {
//     if (data.backdrop_path) {
//         const src = `https://image.tmdb.org/t/p/w342${data.backdrop_path}`;
//         const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
//         // const base64String = buffer.toString('base64');
//         const { base64 } = await getPlaiceholder(buffer);
//         data.backdrop_path_blur = base64;
//     }
//     if (data.poster_path) {
//         const src = `https://image.tmdb.org/t/p/w342${data.poster_path}`;
//         const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
//         // const base64String = buffer.toString('base64');
//         const { base64 } = await getPlaiceholder(buffer);
//         data.poster_path_blur = base64;
//     }
//     return data;
// };

// const addPlaceholderImagesVideos = async (data: Video[]): Promise<Video[]> => {
//     return await Promise.all(
//         data.map(async (video: Video) => {
//             if (video.key) {
//                 const src = `https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`;
//                 const buffer = await fetch(src).then(async (res) =>
//                     Buffer.from(await res.arrayBuffer())
//                 );
//                 // const base64String = buffer.toString('base64');
//                 const { base64 } = await getPlaiceholder(buffer);
//                 return {
//                     ...video,
//                     blurImage: base64,
//                 };
//             }
//             return video;
//         })
//     );
// };

const MovieVideos = async ({ movie, open, setOpen }: MovieVideosProps) => {
    // const videos: VideoRes = await fetchTMDBMovieVideos(movie.id);
    // const images = await fetchTMDBMovieImages(movie.id);
    // const movieCredits: Credits = await fetchTMDBMovieCredits(movie.id);
    // console.log(movieCredits)
    // videos.results = await addPlaceholderImagesVideos(videos.results);
    // movie = await addPlaceholderImagesMovieDetails(movie);
    // movie.credits = movieCredits;
    // if (images) {
    //     // await Promise.all(
    //     _.keys(images)
    //         .map(async (key) => {
    //             if (_.isArray(images[key])) {
    //                 images[key];
    //                 images[key]
    //                     .filter((image: ImageData) => image.iso_639_1 === "en")
    //                     .map(async (image: ImageData, index: number) => {
    //                         // const blur_file_path =
    //                         //     index <= 1
    //                         //         ? await blurPlaceholderImage(
    //                         //               `https://image.tmdb.org/t/p/original${image.file_path}`
    //                         //           )
    //                         //         : null;
    //                         return {
    //                             ...image,
    //                             // blur_file_path,
    //                         };
    //                     });

    //                 // console.log(images[key])
    //                 // return images[key];
    //             }
    //             // return null;
    //         })
    //         .filter(Boolean);
    //     // );
    // }

    return <MovieVideosClient movieDetails={movie} open={open} setOpen={setOpen} />;
};

export default MovieVideos;