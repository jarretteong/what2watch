"use client";

import React, { useRef } from "react";
import "swiper/swiper.css";
import "node_modules/swiper/modules/navigation/navigation.scss";
import "node_modules/swiper/modules/pagination/pagination.min.css";
import styles from "../../movies/page.module.scss";
import Link from "next/link";
import _ from "lodash";
import { parseMovieIdQuery } from "@/app/utils";

type MovieProps = {
    movie: any;
};

const LandingMetadata: React.FunctionComponent<MovieProps> = ({ movie }: MovieProps) => {
    const overviewRef: any = useRef(null);

    const onMetadataHoverStart = () => overviewRef.current?.classList.add(styles.metadataFull);

    const onMetadataHoverEnd = () => overviewRef.current?.classList.remove(styles.metadataFull);

    return (
        <div
            className={styles.landingMetadata}
            onMouseEnter={onMetadataHoverStart}
            onMouseLeave={onMetadataHoverEnd}
        >
            <div className={styles.movieMetadata}>
                <picture>
                    <img
                        className={styles.landingMetadataImage}
                        alt={movie.title}
                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    />
                </picture>
                <p className={styles.landingMetadataOverview} ref={overviewRef}>
                    {movie.overview}
                </p>
                <button className={styles.landingMetadataDetails}>
                    <Link href={`/movies/${parseMovieIdQuery(movie.id, movie.title)}`}>More</Link>
                </button>
            </div>
        </div>
    );
};

export default LandingMetadata;
