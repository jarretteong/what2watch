"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "node_modules/swiper/modules/navigation/navigation.scss";
import { Navigation } from "swiper";
import styles from '../../movies/page.module.scss'
import ReactPlayer from 'react-player/lazy'

export interface Video {
    name: string,
    key: string,
    site: string,
    size: number,
    type: string,
    official: boolean,
    published_at: Date,
    id: string,
}

type VideosProps = {
    videos: Video[]
};

const Videos: React.FunctionComponent<VideosProps> = ({ videos }: VideosProps) => {
    return (
        <Swiper
            modules={[Navigation]}
            slidesPerView={2}
        >
            {videos.map((video) => {
                return (
                    <SwiperSlide className="movie-slide" key={video.id}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${video.key}`}/>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default Videos;
