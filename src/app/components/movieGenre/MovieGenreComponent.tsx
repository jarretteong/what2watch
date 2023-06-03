"use client";

import React, { useEffect, useState } from "react";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "node_modules/swiper/modules/navigation/navigation.scss";
import "node_modules/swiper/modules/pagination/pagination.min.css";
import styles from "./styles/movieGenre.module.scss";

import Swiper, { EffectFade, Navigation, Pagination, SwiperOptions } from "swiper";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";

type MovieGenreProps = {
    movies: any[];
    slidesPerView?:
        | {
              [width: number]: SwiperOptions;
              [ratio: string]: SwiperOptions;
          }
        | undefined;
    imageType: "posters" | "backdrops";
};

const MovieGenreComponent: React.FunctionComponent<MovieGenreProps> = ({
    movies,
    imageType,
}: MovieGenreProps) => {
    // const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    //     useInfiniteQuery({
    //         queryKey: ["popularMovies"],
    //         queryFn: ({ pageParam = defaultUrl }) => fetchPopularMovies(pageParam),
    //         getNextPageParam: (lastPage, pages) => lastPage.nextCursor || undefined,
    //     });
    const [swiper, setSwiper] = useState<Swiper>();
    const [activeSlide, setActiveSlide] = useState<number>(-1);
    useEffect(() => {});
    console.log(movies)
    return (
        <div className={styles.genreContainer}>
            {imageType === "backdrops" && activeSlide >= 0 && activeSlide < movies.length ? (
                <div className={styles.movieBackdrop}>
                    <img
                        className={styles.backdropImage}
                        alt={movies[activeSlide].title}
                        src={`https://image.tmdb.org/t/p/original${
                            movies[activeSlide].backdrops?.length > 1
                                ? movies[activeSlide].backdrops[1].file_path
                                : movies[activeSlide].backdrop_path
                        }`}
                    />
                </div>
            ) : null}
            <div className={styles.genreSwiperWrapper}>
                <ReactSwiper
                    className={styles.genreSwiper}
                    breakpoints={{
                        1: {
                            slidesPerView: 2,
                            spaceBetween: 18,
                        },
                        480: {
                            slidesPerView: 3,
                            spaceBetween: 18,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 18,
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 18,
                        },
                    }}
                    onSlideChange={(swiper) => {
                        setActiveSlide(swiper.activeIndex);
                    }}
                    onSwiper={(s) => {
                        setActiveSlide(s.activeIndex);
                    }}
                >
                    {movies.map((movie: any, index: number) => {
                        return (
                            <SwiperSlide key={movie.id}>
                                <img
                                    className={styles.slideImage}
                                    alt={movie.title}
                                    src={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
                                    onClick={() => setActiveSlide(index)}
                                />
                            </SwiperSlide>
                        );
                    })}
                </ReactSwiper>
            </div>
        </div>
    );
};

export default MovieGenreComponent;
