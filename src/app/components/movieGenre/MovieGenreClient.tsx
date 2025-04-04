"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "node_modules/swiper/modules/navigation/navigation.scss";
import "node_modules/swiper/modules/pagination/pagination.min.css";
import styles from "./styles/movieGenre.module.scss";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMediaQuery } from "usehooks-ts";
import { parseMovieIdQuery } from "@/app/utils";
import Link from "next/link";
import classNames from "classnames";
import ReactPlayer from "react-player";
import MovieMetadata from "../movieMetadata/MovieMetadata";
import ReactPlayerControls from "../reactPlayerControls/ReactPlayerControls";
import { Movie, MovieCustom } from "@/interfaces/movie";
import { Waypoint } from "react-waypoint";
import _ from "lodash";
import MovieVideosClient from "../movieVideos/MovieVideosClient";
import MoviePoster from "../moviePoster/moviePoster";

type MovieGenreProps = {
    movies: MovieCustom[];
    type: "full" | "poster" | "backdrop" | "overview";
    genre: any;
};

const MovieGenreComponent: React.FunctionComponent<MovieGenreProps> = ({
    movies,
    type,
    genre,
}: MovieGenreProps) => {
    console.log("genre", genre);
    // const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    //     useInfiniteQuery({
    //         queryKey: ["popularMovies"],
    //         queryFn: ({ pageParam = defaultUrl }) => fetchPopularMovies(pageParam),
    //         getNextPageParam: (lastPage, pages) => lastPage.nextCursor || undefined,
    //     });
    const [open, setOpen] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieCustom>();
    const posterMedia = useMediaQuery("(min-width: 1px)");
    const mobileMedia = useMediaQuery("(max-width: 480px)");
    const backdropMedia = useMediaQuery("(min-width: 768px)");
    const [imageType, setImageType] = useState<string>("backdrop");
    const [activeSlide, setActiveSlide] = useState<number>(-1);
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentWidth, setCurrentWidth] = useState<number>(0);
    const [movieList, setMovieList] = useState<MovieCustom[]>(
        movies.filter((m) => m.backdrop_path)
    );

    const fetchNewMovies = async (genreId: number, page: number = 1) => {
        const data = await fetch(`/api/movies/genre?id=${genreId}&page=${page}`);
        return data.json();
    };

    const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError } = useInfiniteQuery({
        queryKey: ["genre", genre.id],
        queryFn: ({ pageParam = 1 }) => fetchNewMovies(genre.id, pageParam),
        getNextPageParam: (lastPage: any) => lastPage.nextPage,
        getPreviousPageParam: (firstPage) => firstPage.prevPage,
        staleTime: Infinity,
    });

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
                    <MoviePoster
                        type="genre"
                        genre={genre}
                        movieList={movieList}
                    />
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
                            onSlideChange={async (swiper) => {
                                setActiveSlide(swiper.activeIndex);
                                setIsPlaying(false);
                                setShowPlayer(false);
                                if (
                                    movieList.length - swiper.activeIndex <= 10 &&
                                    hasNextPage &&
                                    !isFetching
                                ) {
                                    await fetchNextPage();
                                }
                            }}
                            onSwiper={(s) => {
                                setActiveSlide(s.activeIndex);
                            }}
                        >
                            {movieList.length > 0
                                ? movieList.map((movie: any, index: number) => {
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
                                                              src={`https://image.tmdb.org/t/p/w${
                                                                  imageType === "backdrop"
                                                                      ? "1280"
                                                                      : "780"
                                                              }${
                                                                  imageType === "backdrop"
                                                                      ? movie.backdrop_path
                                                                      : movie.poster_path
                                                              }`}
                                                          />
                                                      </Link>
                                                      <div className={styles.imageOverlay}></div>
                                                  </div>
                                              ) : null}
                                              {!showPlayer ? <MovieMetadata movie={movie} /> : null}
                                              {movieList[activeSlide]?.trailer ? (
                                                  <div className={styles.playerControls}>
                                                      <ReactPlayerControls
                                                          playing={showPlayer}
                                                          muted={isMuted}
                                                          setMuted={setIsMuted}
                                                          setPlayer={setShowPlayer}
                                                          setPlaying={setIsPlaying}
                                                      />
                                                  </div>
                                              ) : null}
                                              {activeSlide === index &&
                                              movie.trailer &&
                                              backdropMedia ? (
                                                  <Waypoint
                                                      onEnter={handleEnter}
                                                      onLeave={handleLeave}
                                                      topOffset="30%"
                                                      bottomOffset="50%"
                                                  >
                                                      <div className={styles.videoContainer}>
                                                          <ReactPlayer
                                                              className={styles.reactPlayer}
                                                              style={{
                                                                  opacity: showPlayer ? 1 : 0,
                                                              }}
                                                              onReady={() =>
                                                                  setTimeout(() => {
                                                                      setIsPlaying(true);
                                                                  }, 3000)
                                                              }
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
                                                              url={`https://www.youtube.com/watch?v=${movieList[activeSlide].trailer?.key}`}
                                                          />
                                                      </div>
                                                  </Waypoint>
                                              ) : null}
                                          </SwiperSlide>
                                      );
                                  })
                                : null}
                        </ReactSwiper>
                        <div className={styles.divider}></div>
                    </div>
                );
            default:
                return (
                    <>
                        <div className={styles.genreFullContainer}>
                            {activeSlide >= 0 && activeSlide < movieList.length ? (
                                <div className={styles.movieBackdrop}>
                                    <img
                                        className={styles.backdropImage}
                                        alt={movieList[activeSlide].title}
                                        src={`https://image.tmdb.org/t/p/w1280${
                                            imageType === "backdrop"
                                                ? movieList[activeSlide].backdrop_path
                                                : movieList[activeSlide].poster_path
                                        }`}
                                    />
                                    <div className={styles.imageOverlay}></div>

                                    {movieList[activeSlide].trailer ? (
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
                                                    onReady={() =>
                                                        setTimeout(() => {
                                                            setIsPlaying(true);
                                                        }, 3000)
                                                    }
                                                    onEnded={() => {
                                                        setIsPlaying(false);
                                                        setShowPlayer(false);
                                                    }}
                                                    onPlay={() => isPlaying && setShowPlayer(true)}
                                                    playing={isPlaying}
                                                    muted={isMuted}
                                                    width="100%"
                                                    height="100%"
                                                    url={`https://www.youtube.com/watch?v=${movieList[activeSlide].trailer?.key}`}
                                                />
                                            </div>
                                        </Waypoint>
                                    ) : null}
                                </div>
                            ) : null}
                            {activeSlide >= 0 && movieList.length > 0 ? (
                                <>
                                    {backdropMedia && !showPlayer ? (
                                        <div className={styles.movieDetails}>
                                            <>
                                                <h2>{movieList[activeSlide].title}</h2>
                                                <h5 className={styles.genre}>{genre.name}</h5>
                                                <p className={styles.movieMetadataOverview}>
                                                    {movieList[activeSlide].overview}
                                                </p>
                                            </>
                                        </div>
                                    ) : null}
                                    {movieList[activeSlide].trailer ? (
                                        <div
                                            className={classNames({
                                                [styles.playerControls]: true,
                                                [styles.playing]: showPlayer,
                                            })}
                                        >
                                            <ReactPlayerControls
                                                playing={showPlayer}
                                                muted={isMuted}
                                                setMuted={setIsMuted}
                                                setPlayer={setShowPlayer}
                                                setPlaying={setIsPlaying}
                                            />
                                        </div>
                                    ) : null}
                                </>
                            ) : null}
                            <ReactSwiper
                                className={classNames({
                                    [styles.genreSwiper]: true,
                                    [styles.playing]: showPlayer,
                                })}
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
                                onClick={(swiper: any) => {
                                    setCurrentWidth(swiper.slidesSizesGrid?.[activeSlide]);
                                    setSelectedMovie(
                                        movieList?.[swiper.clickedIndex] || _.first(movieList)
                                    );
                                }}
                                onSlideChange={async (swiper) => {
                                    setActiveSlide(swiper.activeIndex);
                                    setIsPlaying(false);
                                    setShowPlayer(false);
                                    if (
                                        movieList.length - swiper.activeIndex <= 15 &&
                                        hasNextPage &&
                                        !isFetching
                                    ) {
                                        await fetchNextPage();
                                    }
                                }}
                                onSwiper={(s: any) => {
                                    setActiveSlide(s.activeIndex);
                                    setCurrentWidth(s.slidesSizesGrid?.[0] || 0);
                                }}
                            >
                                {activeSlide >= 0
                                    ? movieList.map((movie: any, index: number) => {
                                          return (
                                              <SwiperSlide
                                                  key={movie.id}
                                                  className={classNames({
                                                      [styles.slide]: true,
                                                  })}
                                                  style={{
                                                      ...(currentWidth
                                                          ? {
                                                                width: `calc(${currentWidth}px ${
                                                                    activeSlide === index
                                                                        ? "+ 40px"
                                                                        : ""
                                                                })`,
                                                            }
                                                          : {}),
                                                  }}
                                              >
                                                  <div className={styles.slideWrapper}>
                                                      <img
                                                          className={styles.slideImage}
                                                          alt={movie.title}
                                                          src={`https://image.tmdb.org/t/p/w342${
                                                              movie.backdrops?.length > 1
                                                                  ? movie.backdrops[1].file_path
                                                                  : movie.backdrop_path
                                                                  ? movie.backdrop_path
                                                                  : movie.poster_path
                                                          }`}
                                                          onClick={() =>
                                                              changeSlide(index, movie[index])
                                                          }
                                                      />
                                                      <svg
                                                          version="1.1"
                                                          x="0px"
                                                          y="0px"
                                                          viewBox="0 0 352.054 352.054"
                                                          fill="#FFF"
                                                          width="18"
                                                          onClick={() => setOpen(true)}
                                                      >
                                                          <g>
                                                              <polygon points="144.206,186.634 30,300.84 30,238.059 0,238.059 0,352.054 113.995,352.054 113.995,322.054 51.212,322.054 165.419,207.847" />
                                                              <polygon points="238.059,0 238.059,30 300.84,30 186.633,144.208 207.846,165.42 322.054,51.213 322.054,113.995 352.054,113.995 352.054,0" />
                                                          </g>
                                                      </svg>
                                                  </div>
                                              </SwiperSlide>
                                          );
                                      })
                                    : null}
                            </ReactSwiper>
                        </div>
                        {selectedMovie ? (
                            <MovieVideosClient
                                movieDetails={selectedMovie}
                                open={open}
                                setOpen={setOpen}
                            />
                        ) : null}
                        <div className={styles.divider}></div>
                    </>
                );
        }
    };

    return renderGenreContainer() || null;
};

export default MovieGenreComponent;
