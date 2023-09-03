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

const MovieVideos = async ({ movie, open, setOpen }: MovieVideosProps) => {
    return <MovieVideosClient movieDetails={movie} open={open} setOpen={setOpen} />;
};

export default MovieVideos;