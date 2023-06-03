"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "node_modules/swiper/modules/navigation/navigation.scss";
import "node_modules/swiper/modules/pagination/pagination.min.css";
import { Navigation, Pagination } from "swiper";
import styles from './styles/trending.module.scss'

type MoviesProps = {
    movies: any[];
};

const TrendingMovies: React.FunctionComponent<MoviesProps> = ({ movies }: MoviesProps) => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={3}
        >
            {movies.map((movie: any) => {
                return (
                    <SwiperSlide className="movie-slide" key={movie.id}>
                        <img
                            className={styles.posterImage}
                            alt={movie.title}
                            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                        />
                        {/* <h2>{movie.title}</h2>
                        <h3>{movie.overview}</h3> */}
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default TrendingMovies;
