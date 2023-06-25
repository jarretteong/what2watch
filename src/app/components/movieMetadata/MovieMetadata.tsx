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
                    <button className={styles.movieMetadataDetails}>
                        <Link
                            className={styles.moreDetails}
                            href={`/movies/${parseMovieIdQuery(movie.id, movie.title)}`}
                        >
                            More
                        </Link>
                    </button>
                </div>
                {/* <MovieVideos movie={movie} open={open} setOpen={setOpen} /> */}
            </div>
        </>
    );
};

export default MovieMetadata;
