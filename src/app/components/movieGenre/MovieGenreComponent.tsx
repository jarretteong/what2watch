"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import { parseMovieIdQuery } from "@/app/utils";
import Link from "next/link";
import classNames from "classnames";
import ReactPlayer from "react-player";
import MovieMetadata from "../movieMetadata/MovieMetadata";
import ReactPlayerControls from "../reactPlayerControls/ReactPlayerControls";
import { Movie } from "@/interfaces/movie";
import { Waypoint } from "react-waypoint";
import _ from "lodash";

type MovieGenreProps = {
    movies: any[];
    type: "full" | "poster" | "backdrop" | "overview";
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
    const backdropMedia = useMediaQuery("(min-width: 768px)");
    const [slidesPerView, setSlidesPerView] = useState<number>(1);
    const [imageType, setImageType] = useState<string>("backdrop");
    const [activeSlide, setActiveSlide] = useState<number>(-1);
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [moviesList, setMoviesList] = useState<any[]>(movies);
    const [currentWidth, setCurrentWidth] = useState<number>(0);

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

    const changeSlide = (index: number, movie: Movie) => {
        setActiveSlide(index);
        setIsPlaying(false);
        setShowPlayer(false);
    };

    const handleEnter = useCallback(() => {
        setTimeout(() => {
            setIsPlaying(true);
        }, 3000);
    }, []);

    const handleLeave = useCallback(() => {
        setTimeout(() => {
            setIsPlaying(false);
            setShowPlayer(false);
        }, 1000);
    }, []);

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
                                setSlidesPerView(
                                    _.isNumber(s.params.slidesPerView) ? s.params.slidesPerView : 1
                                );
                                setActiveSlide(s.activeIndex);
                            }}
                        >
                            {moviesList.map((movie: any, index: number) => {
                                return (
                                    <SwiperSlide key={movie.id} className={styles.slide}>
                                        <div className={styles.backdropImageWrapper}>
                                            {movie.poster_path_blur ? (
                                                <>
                                                    {/* <div className="swiper-lazy-preloader">
                                                        <Image
                                                            className={styles.slideImage}
                                                            alt={movie.title}
                                                            src={movie.poster_path_blur}
                                                            onClick={() => setActiveSlide(index)}
                                                            fill
                                                            loading="lazy"
                                                        />
                                                    </div> */}
                                                    <Image
                                                        className={styles.slideImage}
                                                        alt={movie.title}
                                                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                                        onClick={() => setActiveSlide(index)}
                                                        fill
                                                        placeholder="blur"
                                                        blurDataURL={movie.poster_path_blur}
                                                    />
                                                </>
                                            ) : (
                                                <Image
                                                    className={styles.slideImage}
                                                    alt={movie.title}
                                                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                                    onClick={() => setActiveSlide(index)}
                                                    fill
                                                    loading="lazy"
                                                />
                                            )}
                                        </div>
                                        {/* <img
                                            className={styles.slideImage}
                                            alt={movie.title}
                                            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                            onClick={() => setActiveSlide(index)}
                                        /> */}
                                    </SwiperSlide>
                                );
                            })}
                        </ReactSwiper>
                        <div className={styles.divider}></div>
                    </div>
                );
            case "backdrop":
                return (
                    <div className={styles.genreBackdropContainer}>
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
                            slidesPerView={1}
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
                                        {imageType ? (
                                            <div className={styles.backdropWrapper}>
                                                <Link
                                                    href={`/movies/${parseMovieIdQuery(
                                                        movie.id,
                                                        movie.title
                                                    )}`}
                                                >
                                                    <img
                                                        className={styles.backdropImage}
                                                        alt={movie.title}
                                                        src={`https://image.tmdb.org/t/p/w1280${
                                                            imageType === "backdrop"
                                                                ? movie.backdrop_path
                                                                : movie.poster_path
                                                        }`}
                                                    />
                                                </Link>
                                                <div className={styles.imageOverlay}></div>
                                            </div>
                                        ) : null}
                                        <MovieMetadata movie={movie} />
                                        {activeSlide === index && movie.trailer && backdropMedia ? (
                                            <Waypoint
                                                onEnter={handleEnter}
                                                onLeave={handleLeave}
                                                topOffset="30%"
                                                bottomOffset="50%"
                                            >
                                                <div className={styles.videoContainer}>
                                                    <ReactPlayer
                                                        className={styles.reactPlayer}
                                                        style={{ opacity: showPlayer ? 1 : 0 }}
                                                        onEnded={() => {
                                                            setIsPlaying(false);
                                                            setShowPlayer(false);
                                                        }}
                                                        onPlay={() =>
                                                            isPlaying && setShowPlayer(true)
                                                        }
                                                        playing={isPlaying}
                                                        muted={isMuted}
                                                        width="100%"
                                                        height="100%"
                                                        url={`https://www.youtube.com/watch?v=${movies[activeSlide].trailer.key}`}
                                                    />
                                                </div>
                                            </Waypoint>
                                        ) : null}
                                    </SwiperSlide>
                                );
                            })}
                        </ReactSwiper>
                        <div className={styles.divider}></div>
                    </div>
                );
            default:
                return (
                    <>
                        <div className={styles.genreFullContainer}>
                            {activeSlide >= 0 && activeSlide < movies.length ? (
                                <div className={styles.movieBackdrop}>
                                    <img
                                        className={styles.backdropImage}
                                        alt={movies[activeSlide].title}
                                        src={`https://image.tmdb.org/t/p/w1280${
                                            imageType === "backdrop"
                                                ? movies[activeSlide].backdrop_path
                                                : movies[activeSlide].poster_path
                                        }`}
                                    />
                                    <div className={styles.imageOverlay}></div>

                                    {movies[activeSlide].trailer ? (
                                        <Waypoint
                                            onEnter={handleEnter}
                                            onLeave={handleLeave}
                                            topOffset="30%"
                                            bottomOffset="50%"
                                        >
                                            <div className={styles.videoContainer}>
                                                <ReactPlayer
                                                    className={styles.reactPlayer}
                                                    style={{ opacity: showPlayer ? 1 : 0 }}
                                                    onEnded={() => {
                                                        setIsPlaying(false);
                                                        setShowPlayer(false);
                                                    }}
                                                    onPlay={() => isPlaying && setShowPlayer(true)}
                                                    playing={isPlaying}
                                                    muted={isMuted}
                                                    width="100%"
                                                    height="100%"
                                                    url={`https://www.youtube.com/watch?v=${movies[activeSlide].trailer.key}`}
                                                />
                                            </div>
                                        </Waypoint>
                                    ) : null}
                                </div>
                            ) : null}
                            {imageType === "backdrop" && activeSlide >= 0 ? (
                                <>
                                    <div className={styles.movieDetails}>
                                        <h2>{movies[activeSlide].title}</h2>
                                        <h5 className={styles.genre}>{genre.name}</h5>
                                        <p className={styles.movieMetadataOverview}>
                                            {movies[activeSlide].overview}
                                        </p>
                                    </div>
                                    <div className={styles.playerControls}>
                                        <ReactPlayerControls
                                            playing={showPlayer}
                                            muted={isMuted}
                                            setMuted={setIsMuted}
                                            setPlayer={setShowPlayer}
                                            setPlaying={setIsPlaying}
                                        />
                                    </div>
                                </>
                            ) : null}
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
                                onClick={(swiper: any) => {
                                    setCurrentWidth(swiper.slidesSizesGrid?.[activeSlide]);
                                }}
                                onSlideChange={(swiper) => {
                                    setActiveSlide(swiper.activeIndex);
                                    console.log(swiper);
                                }}
                                onSwiper={(s: any) => {
                                    setActiveSlide(s.activeIndex);
                                    setCurrentWidth(s.slidesSizesGrid?.[s.activeIndex]);
                                }}
                            >
                                {movies.map((movie: any, index: number) => {
                                    return (
                                        <SwiperSlide
                                            key={movie.id}
                                            className={classNames({
                                                [styles.slide]: true,
                                            })}
                                            style={{
                                                width: `calc(${currentWidth}px ${
                                                    activeSlide === index ? "+ 40px" : ""
                                                })`,
                                            }}
                                        >
                                            <img
                                                className={styles.slideImage}
                                                alt={movie.title}
                                                src={`https://image.tmdb.org/t/p/w342${
                                                    movie.backdrops?.length > 1
                                                        ? movie.backdrops[1].file_path
                                                        : movie.backdrop_path
                                                }`}
                                                onClick={() => changeSlide(index, movie[index])}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </ReactSwiper>
                        </div>
                        <div className={styles.divider}></div>
                    </>
                );
        }
    };

    return renderGenreContainer() || null;
};

export default MovieGenreComponent;
