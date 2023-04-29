"use client";

import React, { useEffect, useState } from "react";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "node_modules/swiper/modules/navigation/navigation.scss";
import "node_modules/swiper/modules/pagination/pagination.min.css";
import styles from "../../movies/page.module.scss";

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

    return (
        <div className={styles.popularContainer}>
            <ReactSwiper
                className={styles.popularSwiperWrapper}
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
                onSlideChange={(swiper: Swiper) => {
                    setActiveSlide(swiper.activeIndex);
                }}
                onSwiper={(swiper: Swiper) => setSwiper(swiper)}
            >
                {movies.map((movie: any) => {
                    return (
                        <SwiperSlide key={movie.id}>
                            <img
                                className={styles.posterImage}
                                alt={movie.title}
                                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                            />
                        </SwiperSlide>
                    );
                })}
            </ReactSwiper>
        </div>
    );
};

export default MovieGenreComponent;
