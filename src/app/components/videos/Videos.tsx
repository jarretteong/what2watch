"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "node_modules/swiper/modules/navigation/navigation.scss";
import { Navigation } from "swiper";
import videoStyles from "./videos.module.scss";
import ReactPlayer from "react-player/lazy";
import Image from "next/image";

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
    const [videoSlides, setVideoSlides] = useState<Video[]>([]);

    useEffect(() => {
        setVideoSlides(videos);
    }, [videos]);

    return (
        <div className={videoStyles.videos}>
            {title ? <h3>{title}</h3> : null}
            <div className={videoStyles.videosList}>
                <Swiper modules={[Navigation]} slidesPerView={slidesPerView || 1} navigation spaceBetween={16}>
                    {videoSlides.length > 0
                        ? videoSlides.map((video: Video) => (
                              <SwiperSlide className={videoStyles.movieSlide} key={video.id}>
                                  {/* <ReactPlayer
                                      url={`https://www.youtube.com/watch?v=${video.key}`}
                                      controls={false}
                                  /> */}
                                  <div className={videoStyles.videoContent}>
                                      <div className={videoStyles.videoImage}>
                                          <Image
                                              className={videoStyles.image}
                                              src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                                              alt={video.id}
                                              fill
                                          />
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 28 28"
                                              width={60}
                                              fill="#fff"
                                              onClick={console.log}
                                          >
                                              <path
                                                  d="M12.5041016,24.9455078 C19.3341797,24.9455078 24.9455078,19.3341797 24.9455078,12.5041016 C24.9455078,5.66132812 19.3341797,0.05 12.4914062,0.05 C5.66132812,0.05 0.05,5.66132812 0.05,12.5041016 C0.05,19.3341797 5.66132812,24.9455078 12.5041016,24.9455078 Z M12.5041016,23.9806641 C6.15644531,23.9806641 1.01484375,18.8390625 1.01484375,12.5041016 C1.01484375,6.16914062 6.15644531,1.01484375 12.4914062,1.01484375 C18.8390625,1.01484375 23.9806641,6.16914062 23.9806641,12.5041016 C23.9806641,18.8390625 18.8390625,23.9806641 12.5041016,23.9806641 Z M10.0285156,17.4806641 L17.315625,13.0880859 C17.7599609,12.8087891 17.7599609,12.2375 17.315625,11.9708984 L10.0285156,7.52753906 C9.596875,7.27363281 9.06367187,7.48945312 9.06367187,7.95917969 L9.06367187,17.0490234 C9.06367187,17.51875 9.58417969,17.7472656 10.0285156,17.4806641 Z"
                                                  transform="translate(2 2)"
                                              ></path>
                                          </svg>
                                      </div>
                                      <div className={videoStyles.videoName}>{video.name}</div>
                                  </div>
                              </SwiperSlide>
                          ))
                        : null}
                </Swiper>
            </div>
        </div>
    );
};

export default Videos;
