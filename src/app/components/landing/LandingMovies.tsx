"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper as ReactSwiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "swiper/css/effect-fade";
import "node_modules/swiper/modules/navigation/navigation.scss";
import "node_modules/swiper/modules/pagination/pagination.min.css";
import Swiper, { EffectFade, Navigation, Pagination } from "swiper";
import styles from "./styles/landing.module.scss";
import ReactPlayer from "react-player/lazy";
import { useMediaQuery } from "usehooks-ts";
import Link from "next/link";
import { getPlaceholderImageURL, parseMovieIdQuery } from "@/app/utils";
import classNames from "classnames";
import ReactPlayerControls from "../reactPlayerControls/ReactPlayerControls";
import MovieMetadata from "../movieMetadata/MovieMetadata";
import { MovieCustom } from "@/interfaces/movie";
import Image from "next/image";
import { Waypoint } from "react-waypoint";

type MoviesProps = {
    movies: MovieCustom[];
};

const LandingMovies: React.FunctionComponent<MoviesProps> = ({ movies }: MoviesProps) => {
    const [activeSlide, setActiveSlide] = useState<number>(-1);
    // const posterMedia = useMediaQuery("(min-width: 1px)");
    const backdropMedia = useMediaQuery("(min-width: 768px)");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const swiper = useRef<SwiperRef>(null);
    const [isBackdropMedia, setIsBackdropMedia] = useState<boolean>(true);

    // useEffect(() => {
    //     switch (true) {
    //         case backdropMedia:
    //             setImageType("backdrop");
    //             break;
    //         case posterMedia:
    //             setImageType("poster");
    //             break;
    //     }
    // }, [posterMedia, backdropMedia]);
    useEffect(() => {
        setIsBackdropMedia(backdropMedia);
    }, [backdropMedia]);

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

    return (
        <Waypoint onEnter={handleEnter} onLeave={handleLeave} topOffset="30%" bottomOffset="50%">
            <div className={styles.landingContainer}>
                <ReactSwiper
                    ref={swiper}
                    modules={[Navigation, Pagination, EffectFade]}
                    slidesPerView={1}
                    pagination={{ dynamicBullets: true }}
                    navigation
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    onSlideChange={(swiper) => {
                        setActiveSlide(swiper.activeIndex);
                        setIsPlaying(false);
                        setShowPlayer(false);
                    }}
                    onSwiper={(s) => {
                        setActiveSlide(s.activeIndex);
                    }}
                >
                    {movies.map((movie: any, index: number) => {
                        return (
                            <SwiperSlide key={movie.id}>
                                <Link href={`/movies/${parseMovieIdQuery(movie.id, movie.title)}`}>
                                    <div className={styles.backdropImageWrapper}>
                                        <>
                                            <Image
                                                className={styles.backdropImage}
                                                alt={movie.title}
                                                src={`https://image.tmdb.org/t/p/original${
                                                    isBackdropMedia
                                                        ? movie.backdrop_path
                                                        : movie.poster_path
                                                }`}
                                                fill
                                                placeholder="blur"
                                                blurDataURL={getPlaceholderImageURL(
                                                    `https://image.tmdb.org/t/p/w342${movie.backdrop_path}`
                                                )}
                                            />
                                            <div className={styles.imageOverlay}></div>
                                        </>
                                    </div>
                                </Link>
                                {!showPlayer ? <MovieMetadata movie={movie} /> : null}
                                <div className={styles.playerControls}>
                                    <ReactPlayerControls
                                        playing={showPlayer}
                                        muted={isMuted}
                                        setMuted={setIsMuted}
                                        setPlayer={setShowPlayer}
                                        setPlaying={setIsPlaying}
                                    />
                                </div>
                                {activeSlide === index && movie.trailer && backdropMedia ? (
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
                                                setTimeout(() => {
                                                    if (swiper.current) {
                                                        swiper.current.swiper.slideNext();
                                                    }
                                                }, 3000);
                                            }}
                                            onPlay={() => isPlaying && setShowPlayer(true)}
                                            playing={isPlaying}
                                            muted={isMuted}
                                            width="100%"
                                            height="100%"
                                            url={`https://www.youtube.com/watch?v=${movie.trailer.key}`}
                                        />
                                    </div>
                                ) : null}
                            </SwiperSlide>
                        );
                    })}
                </ReactSwiper>
            </div>
        </Waypoint>
    );
};

export default LandingMovies;
