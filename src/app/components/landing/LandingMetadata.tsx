"use client";

import React from "react";
import "swiper/swiper.css";
import "node_modules/swiper/modules/navigation/navigation.scss";
import "node_modules/swiper/modules/pagination/pagination.min.css";
import styles from "@/app/page.module.scss";

type MovieProps = {
    movie: any;
};

const LandingMetadata: React.FunctionComponent<MovieProps> = ({ movie }: MovieProps) => {
    console.log(movie)
    return (
        <div className={styles["landing-metadata"]}>
            <div className={styles["movie-metadata"]}>
            <img
                className={styles["landing-metadata-image"]}
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            />
            <p className={styles["landing-metadata-overview"]}>{movie.overview}</p>
            <button className={styles["landing-metadata-details"]}>More</button>
            </div>
        </div>
    );
};

export default LandingMetadata;
