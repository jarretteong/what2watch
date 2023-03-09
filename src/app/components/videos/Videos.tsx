"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "node_modules/swiper/modules/navigation/navigation.scss";
import { Navigation } from "swiper";
import videoStyles from "./videos.module.scss";
import ReactPlayer from "react-player/lazy";

export interface Video {
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: Date;
    id: string;
}

type VideosProps = {
    videos: Video[];
    slidesPerView: number;
    title?: string;
};

const Videos: React.FunctionComponent<VideosProps> = ({
    videos,
    slidesPerView,
    title,
}: VideosProps) => {
    return (
        <div className={videoStyles.videos}>
            {title ? <h3>{title}</h3> : null}
            <div className={videoStyles.videosList}>
                <Swiper modules={[Navigation]} slidesPerView={slidesPerView || 1}>
                    {videos.map((video) => {
                        return (
                            <SwiperSlide className={videoStyles.movieSlide} key={video.id}>
                                <ReactPlayer url={`https://www.youtube.com/watch?v=${video.key}`} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default Videos;
