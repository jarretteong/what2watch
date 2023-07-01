"use client";

import React, { useEffect, useRef, useState } from "react";
import "swiper/swiper.css";
import "node_modules/swiper/modules/navigation/navigation.scss";
import "node_modules/swiper/modules/pagination/pagination.min.css";
import styles from "./styles/movieMetadata.module.scss";
import Link from "next/link";
import _ from "lodash";
import { parseMovieIdQuery } from "@/app/utils";
import { ImageData } from "@/interfaces/movie";
import Image from "next/image";
import MovieVideos from "../movieVideos/MovieVideos";
import MovieVideosClient from "../movieVideos/MovieVideosClient";

type MovieProps = {
    movie: any;
};

const MovieMetadata: React.FunctionComponent<MovieProps> = ({ movie }: MovieProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const overviewRef: any = useRef(null);
    const [posterImage, setPosterImage] = useState<ImageData>();
    const onMetadataHoverStart = () => overviewRef.current?.classList.add(styles.metadataFull);
    const onMetadataHoverEnd = () => overviewRef.current?.classList.remove(styles.metadataFull);

    useEffect(() => {
        if (movie.images?.backdrops?.length > 0) {
            movie.images?.backdrops.length > 1
                ? setPosterImage(movie.images?.backdrops[1])
                : setPosterImage(movie.images?.backdrops[0]);
        }
    }, [movie]);

    return (
        <>
            <div
                className={styles.movieMetadataWrapper}
                onMouseEnter={onMetadataHoverStart}
                onMouseLeave={onMetadataHoverEnd}
            >
                <div className={styles.movieMetadata}>
                    {posterImage ? (
                        <picture className={styles.movieMetadataImageWrapper}>
                            {/* <Image
                            className={styles.movieMetadataImage}
                            style={{ aspectRatio: posterImage?.aspect_ratio || 4 / 3 }}
                            alt={movie.title}
                            src={`https://image.tmdb.org/t/p/w780${
                                posterImage?.file_path || movie.poster_path
                            }`}
                            fill
                        /> */}
                            <img
                                className={styles.movieMetadataImage}
                                style={{ aspectRatio: posterImage?.aspect_ratio || 4 / 3 }}
                                alt={movie.title}
                                src={`https://image.tmdb.org/t/p/w780${
                                    posterImage?.file_path || movie.poster_path
                                }`}
                            />
                        </picture>
                    ) : null}
                    <p className={styles.movieMetadataOverview} ref={overviewRef}>
                        {movie.overview}
                    </p>
                    <button className={styles.movieMetadataDetails} onClick={() => setOpen(true)}>
                        {/* <Link
                            className={styles.moreDetails}
                            href={`/movies/${parseMovieIdQuery(movie.id, movie.title)}`}
                        > */}
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="18">
                                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" />
                            </svg>
                            <span>More Info</span>
                        </span>
                        {/* </Link> */}
                    </button>
                </div>
                <MovieVideosClient movieDetails={movie} open={open} setOpen={setOpen} />
            </div>
        </>
    );
};

export default MovieMetadata;
