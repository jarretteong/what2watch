"use client";

import { Genre, Movie, MovieCustom } from "@/interfaces/movie";
import styles from "./styles/moviePoster.module.scss";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import BlurImage from "../BlurImage/BlurImage";
import MovieVideosClient from "../movieVideos/MovieVideosClient";
import _ from "lodash";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import classNames from "classnames";

type GenreProps = {
    genre?: Genre;
    movieList: Movie[] | MovieCustom[];
    movieId?: number;
    // open: boolean;
    // selectedMovie: MovieCustom | undefined;
    // setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
    // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // setSelectedMovie: React.Dispatch<React.SetStateAction<MovieCustom | undefined>>;
    title?: string;
    type: string;
};

const MoviePoster: React.FunctionComponent<GenreProps> = ({
    genre,
    movieList,
    movieId,
    title,
    type,
}: GenreProps) => {
    const [selectedMovie, setSelectedMovie] = useState<MovieCustom>();
    const [movies, setMovies] = useState(movieList);
    const [open, setOpen] = useState<boolean>(false);
    // const [activeSlide, setActiveSlide] = useState<number>(-1);
    let queryKey: any[] = [];
    let queryFn = null;

    const fetchNewMovies = async (genreId: number, page: number = 1) => {
        const data = await fetch(`/api/movies/genre?id=${genreId}&page=${page}`);
        return await data.json();
    };

    const fetchRecommendedMovies = async (movieId: number, page: number = 1) => {
        const data = await fetch(`/api/movies/recommendations?id=${movieId}&page=${page}`);
        return await data.json();
    };

    const fetchSimilarMovies = async (movieId: number, page: number = 1) => {
        const data = await fetch(`/api/movies/similar?id=${movieId}&page=${page}`);
        return await data.json();
    };

    switch (type) {
        case "genre":
            queryKey = ["genre", genre!.id];
            queryFn = ({ pageParam = 1 }) => fetchNewMovies(genre!.id, pageParam);
            break;
        case "recommendation":
            queryKey = ["recommendation", movieId];
            queryFn = ({ pageParam = 1 }) => fetchRecommendedMovies(movieId!, pageParam);
            break;
        default:
            queryKey = ["similar", movieId];
            queryFn = ({ pageParam = 1 }) => fetchSimilarMovies(movieId!, pageParam);
            break;
    }

    const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError } = useInfiniteQuery({
        queryKey,
        queryFn,
        getNextPageParam: (lastPage: any) => lastPage.nextPage,
        getPreviousPageParam: (firstPage) => firstPage.prevPage,
        staleTime: Infinity,
    });
    if (
        !isLoading &&
        !isError &&
        _.flatMap(data?.pages, "data").filter((m) => m.poster_path && m.backdrop_path).length !==
            movies.filter((m) => m.poster_path && m.backdrop_path).length
    ) {
        const updatedMovies = _.flatMap(data?.pages, "data").filter(
            (m) => m.poster_path && m.backdrop_path
        );
        setMovies(updatedMovies);
    }

    return (
        <div className={styles.genrePosterContainer}>
            <div className={styles.genreTypeWrapper}>
                <h3 className={classNames({ [styles.genre]: genre, [styles.custom]: title })}>
                    {title ? title : genre ? genre.name : ""}
                    <svg width="10px" height="10px" viewBox="0 0 10 16" aria-hidden="true">
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
                        slidesPerView: 2.2,
                        spaceBetween: 18,
                    },
                    480: {
                        slidesPerView: 3.2,
                        spaceBetween: 18,
                    },
                    768: {
                        slidesPerView: 4.3,
                        spaceBetween: 24,
                    },
                    1200: {
                        slidesPerView: 5.3,
                        spaceBetween: 30,
                    },
                    1440: {
                        slidesPerView: 6.3,
                        spaceBetween: 30,
                    },
                }}
                onClick={(swiper) => {
                    setSelectedMovie(movies?.[swiper.clickedIndex] || _.first(movies));
                    setOpen(true);
                }}
                onSlideChange={async (swiper) => {
                    if (movies.length - swiper.activeIndex <= 20 && hasNextPage && !isFetching) {
                        await fetchNextPage();
                    }
                }}
                onSwiper={(s) => {
                    setSelectedMovie(movies?.[s.activeIndex] || _.first(movies));
                }}
            >
                {movies.length > 0
                    ? movies.map((movie: any, index: number) => {
                          return (
                              <SwiperSlide key={movie.id} className={styles.slide}>
                                  <div className={styles.backdropImageWrapper}>
                                      <BlurImage
                                          className={styles.slideImage}
                                          id={movie.poster_path}
                                          alt={movie.title}
                                          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                          placeholder="blur"
                                      />
                                  </div>
                                  {/* <img
                            className={styles.slideImage}
                            alt={movie.title}
                            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                            onClick={() => setActiveSlide(index)}
                        /> */}
                              </SwiperSlide>
                          );
                      })
                    : null}
            </ReactSwiper>
            {selectedMovie ? (
                <MovieVideosClient movieDetails={selectedMovie} open={open} setOpen={setOpen} />
            ) : null}
            <div className={styles.divider}></div>
        </div>
    );
};

export default MoviePoster;
