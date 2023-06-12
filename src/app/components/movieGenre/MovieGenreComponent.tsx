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
import { render } from "react-dom";
import { useMediaQuery } from "usehooks-ts";

type MovieGenreProps = {
    movies: any[];
    type: "full" | "poster" | "backdrop";
    genre: any;
};

const MovieGenreComponent: React.FunctionComponent<MovieGenreProps> = ({
    movies,
    type,
    genre,
}: MovieGenreProps) => {
    // const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    //     useInfiniteQuery({
    //         queryKey: ["popularMovies"],
    //         queryFn: ({ pageParam = defaultUrl }) => fetchPopularMovies(pageParam),
    //         getNextPageParam: (lastPage, pages) => lastPage.nextCursor || undefined,
    //     });
    const posterMedia = useMediaQuery("(min-width: 1px)");
    const backdropMedia = useMediaQuery("(min-width: 480px)");
    const [imageType, setImageType] = useState<string>("backdrop");
    const [activeSlide, setActiveSlide] = useState<number>(-1);
    useEffect(() => {
        switch (true) {
            case backdropMedia:
                setImageType("backdrop");
                break;
            case posterMedia:
                setImageType("poster");
                break;
        }
    }, [posterMedia, backdropMedia]);

    const renderGenreContainer = () => {
        switch (type) {
            case "poster":
                return (
                    <div className={styles.genrePosterContainer}>
                        <div className={styles.genreTypeWrapper}>
                            <h3 className={styles.genre}>
                                {genre.name}{" "}
                                <svg
                                    width="10px"
                                    height="10px"
                                    viewBox="0 0 10 16"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="m2.6 15.6c-.3.3-.6.4-1 .4-.9 0-1.6-.7-1.6-1.5 0-.4.2-.8.5-1.1l5.9-5.4-5.9-5.4c-.3-.3-.5-.7-.5-1.1 0-.9.7-1.5 1.6-1.5.4 0 .7.1 1 .4l6.8 6.4c.4.4.6.7.6 1.2s-.2.8-.6 1.2z"
                                        opacity="0.95"
                                    ></path>
                                </svg>
                            </h3>
                        </div>
                        <ReactSwiper
                            className={styles.genreSwiper}
                            breakpoints={{
                                1: {
                                    slidesPerView: 2,
                                    spaceBetween: 8,
                                },
                                480: {
                                    slidesPerView: 3,
                                    spaceBetween: 12,
                                },
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 14,
                                },
                                1200: {
                                    slidesPerView: 5,
                                    spaceBetween: 16,
                                },
                                1440: {
                                    slidesPerView: 6,
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
                                    <SwiperSlide key={movie.id} className={styles.slide}>
                                        <img
                                            className={styles.slideImage}
                                            alt={movie.title}
                                            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                            onClick={() => setActiveSlide(index)}
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </ReactSwiper>
                        <div className={styles.divider}></div>
                    </div>
                );
            case "backdrop":
                return;
            default:
                return (
                    <div className={styles.genreFullContainer}>
                        {activeSlide >= 0 && activeSlide < movies.length ? (
                            <div className={styles.movieBackdrop}>
                                <img
                                    className={styles.backdropImage}
                                    alt={movies[activeSlide].title}
                                    src={`https://image.tmdb.org/t/p/original${
                                        imageType === "backdrop"
                                            ? movies[activeSlide].backdrop_path
                                            : movies[activeSlide].poster_path
                                    }`}
                                />
                            </div>
                        ) : null}
                        <div className={styles.movieDetails}>
                            <h5 className={styles.genre}>{genre.name}</h5>
                            <h3>{activeSlide >= 0 ? movies[activeSlide].title : ""}</h3>
                        </div>
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
                                    spaceBetween: 24,
                                },
                                1200: {
                                    slidesPerView: 5,
                                    spaceBetween: 30,
                                },
                                1440: {
                                    slidesPerView: 6,
                                    spaceBetween: 30,
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
                                    <SwiperSlide key={movie.id} className={styles.slide}>
                                        <img
                                            className={styles.slideImage}
                                            alt={movie.title}
                                            src={`https://image.tmdb.org/t/p/w342${
                                                movie.backdrops?.length > 1
                                                    ? movie.backdrops[1].file_path
                                                    : movie.backdrop_path
                                            }`}
                                            onClick={() => setActiveSlide(index)}
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </ReactSwiper>
                    </div>
                );
        }
    };

    return renderGenreContainer() || null;
};

export default MovieGenreComponent;
