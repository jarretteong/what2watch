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
import { MovieWithImagesVideos } from "@/interfaces/movie";
import Image from "next/image";

type MoviesProps = {
    movies: MovieWithImagesVideos[];
};

const LandingMovies: React.FunctionComponent<MoviesProps> = ({ movies }: MoviesProps) => {
    const [activeSlide, setActiveSlide] = useState<number>(-1);
    const [imageType, setImageType] = useState<string>("");
    const posterMedia = useMediaQuery("(min-width: 1px)");
    const backdropMedia = useMediaQuery("(min-width: 768px)");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
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
                            
                            <Link href={`/movies/${parseMovieIdQuery(movie.id, movie.title)}`}>
                                {/* <img
                                        className={styles.backdropImage}
                                        alt={movie.title}
                                        src={`https://image.tmdb.org/t/p/original${
                                            imageType === "backdrop"
                                                ? movie.backdrop_path
                                                : movie.poster_path
                                        }`}
                                    /> */}
                                <div className={styles.backdropImageWrapper}>
                                    {imageType ? (
                                        <Image
                                            className={styles.backdropImage}
                                            alt={movie.title}
                                            src={`https://image.tmdb.org/t/p/original${
                                                imageType === "backdrop"
                                                    ? movie.backdrop_path
                                                    : movie.poster_path
                                            }`}
                                            fill
                                            placeholder="blur"
                                            blurDataURL={
                                                imageType === "backdrop"
                                                    ? movie.backdrop_path_blur
                                                    : movie.poster_path_blur
                                            }
                                        />
                                    ) : null}
                                </div>
                            </Link>
                            
                            <MovieMetadata movie={movie} />
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
    );
};

export default LandingMovies;
