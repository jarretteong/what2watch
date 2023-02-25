"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "node_modules/swiper/modules/navigation/navigation.scss";
import "node_modules/swiper/modules/pagination/pagination.min.css";
import { Navigation, Pagination } from "swiper";
import styles from "../../movies/page.module.scss";
import LandingMetadata from "./LandingMetadata";

type MoviesProps = {
    movies: any[];
};

const TrendingMovies: React.FunctionComponent<MoviesProps> = ({ movies }: MoviesProps) => {
    return (
        <div className={styles.landingContainer}>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                pagination={{ dynamicBullets: true }}
                navigation
            >
                {movies.map((movie: any) => {
                    return (
                        <SwiperSlide key={movie.id}>
                            <img
                                className={styles.backdropImage}
                                alt={movie.title}
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            />
                            <LandingMetadata movie={movie} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default TrendingMovies;
