"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { parseMovieIdQuery } from "@/app/utils";
import classNames from "classnames";
import ReactPlayerControls from "../reactPlayerControls/ReactPlayerControls";
import MovieMetadata from "../movieMetadata/MovieMetadata";

type MoviesProps = {
    movies: any[];
};

const LandingMovies: React.FunctionComponent<MoviesProps> = ({ movies }: MoviesProps) => {
    const [activeSlide, setActiveSlide] = useState<number>(-1);
    const [imageType, setImageType] = useState<string>("");
    const posterMedia = useMediaQuery("(min-width: 1px)");
    const backdropMedia = useMediaQuery("(min-width: 768px)");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const swiper = useRef<SwiperRef>(null);

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

    return (
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
                            {imageType ? (
                                <Link href={`/movies/${parseMovieIdQuery(movie.id, movie.title)}`}>
                                    <img
                                        className={styles.backdropImage}
                                        alt={movie.title}
                                        src={`https://image.tmdb.org/t/p/original${
                                            imageType === "backdrop"
                                                ? movie.backdrop_path
                                                : movie.poster_path
                                        }`}
                                    />
                                </Link>
                            ) : null}
                            <MovieMetadata movie={movie} />
                            {/* <div className={styles.playerControls}>
                                <ReactPlayerControls />
                            </div> */}
                            {activeSlide === index && movie.trailer && backdropMedia ? (
                                <div
                                    className={classNames({
                                        [styles.videoContainer]: true,
                                        [styles.hidden]: !showPlayer,
                                    })}
                                >
                                    <ReactPlayer
                                        onReady={() => setTimeout(() => setIsPlaying(true), 3000)}
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
            {/* <Swiper
                modules={[Navigation, Pagination, EffectFade]}
                slidesPerView={1}
                pagination={{ dynamicBullets: true }}
                navigation
                effect="fade"
                fadeEffect={{ crossFade: true }}
                onSlideChange={(swiper) => {
                    setActiveSlide(swiper.activeIndex);
                }}
                onSwiper={(swiper) => setActiveSlide(swiper.activeIndex)}
            >
                {activeSlide >= 0 &&
                    movies.map((movie: any, index: number) => {
                        return (
                            <SwiperSlide key={movie.id}>
                                <img
                                    className={styles.backdropImage}
                                    alt={movie.title}
                                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                />
                                <LandingMetadata movie={movie} />
                                {activeSlide === index && movie.trailer ? (
                                    <div className={styles.videoContainer}>
                                        <ReactPlayer
                                            playing
                                            muted
                                            width="100%"
                                            height="100%"
                                            url={`https://www.youtube.com/watch?v=${movie.trailer.key}`}
                                        />
                                    </div>
                                ) : null}
                            </SwiperSlide>
                        );
                    })}
            </Swiper> */}
        </div>
    );
};

export default LandingMovies;
