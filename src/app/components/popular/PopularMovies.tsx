"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.css";
import "node_modules/swiper/modules/navigation/navigation.scss";
import "node_modules/swiper/modules/pagination/pagination.min.css";
import styles from "../../movies/page.module.scss";

import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";

type MoviesProps = {
    movies: any[];
};

const defaultUrl = "/api/movies/popular";

const fetchPopularMovies = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
};

const PopularMovies: React.FunctionComponent<MoviesProps> = ({ movies }: MoviesProps) => {
    // const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    //     useInfiniteQuery({
    //         queryKey: ["popularMovies"],
    //         queryFn: ({ pageParam = defaultUrl }) => fetchPopularMovies(pageParam),
    //         getNextPageParam: (lastPage, pages) => lastPage.nextCursor || undefined,
    //     });

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            scrollbar
            pagination={{
                dynamicBullets: true,
            }}
            navigation
            slidesPerView={8}
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
        </Swiper>
    );
};

export default PopularMovies;
