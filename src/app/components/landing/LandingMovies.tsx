"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "swiper/css/effect-fade";
import "node_modules/swiper/modules/navigation/navigation.scss";
import "node_modules/swiper/modules/pagination/pagination.min.css";
import { EffectFade, Navigation, Pagination } from "swiper";
import styles from "../../movies/page.module.scss";
import LandingMetadata from "./LandingMetadata";
import ReactPlayer from "react-player/lazy";

type MoviesProps = {
    movies: any[];
};

const LandingMovies: React.FunctionComponent<MoviesProps> = ({ movies }: MoviesProps) => {
    const [activeSlide, setActiveSlide] = useState<number>(-1);

    return (
        <div className={styles.landingContainer}>
            <Swiper
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
                        console.log(activeSlide, index);
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
            </Swiper>
        </div>
    );
};

export default LandingMovies;
