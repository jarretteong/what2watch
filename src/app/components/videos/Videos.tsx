"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "swiper/scss/grid";
import "node_modules/swiper/modules/navigation/navigation.scss";
import Swiper, { Navigation } from "swiper";
import ReactPlayer from "react-player/lazy";
import Image from "next/image";
import classNames from "classnames";
import _ from "lodash";
import { useMediaQuery } from "usehooks-ts";
import { videoSlidesCount } from "@/app/utils";
import { Video } from "@/interfaces/movie";
import Modal from "react-responsive-modal";
import videoStyles from "./videos.module.scss";

type VideosProps = {
    videos: Video[];
    slidesPerView?: number | "auto" | undefined;
    title?: string;
    type: "Trailer" | "Clip" | "Featurette" | "BehindTheScenes" | "Teaser";
};

const Videos: React.FunctionComponent<VideosProps> = ({
    videos,
    slidesPerView,
    title,
    type,
}: VideosProps) => {
    const [videoSlides, setVideoSlides] = useState<Video[]>([]);
    const [swiper, setSwiper] = useState<Swiper>();
    const [prevClass, setPrevClass] = useState<string>("");
    const [nextClass, setNextClass] = useState<string>("");
    const [slideCount, setSlideCount] = useState<number>(1);
    const smallMedia = useMediaQuery("(min-width: 480px)");
    const mediumMedia = useMediaQuery("(min-width: 768px)");
    const largeMedia = useMediaQuery("(min-width: 992px)");
    const xlMedia = useMediaQuery("(min-width: 1200px)");
    const [open, setOpen] = useState<boolean>(false);
    const [video, setVideo] = useState<Video>();

    const updateSliderButtons = (swiper: Swiper) => {
        setPrevClass(
            classNames({
                [videoStyles.back]: true,
                // [videoStyles.disabled]: swiper.activeIndex === 0,
            })
        );
        setNextClass(
            classNames({
                [videoStyles.next]: true,
                // [videoStyles.disabled]: !swiper.allowSlideNext,
            })
        );
    };

    useEffect(() => {
        setVideoSlides(videos);
    }, [videos]);

    useEffect(() => {
        if (swiper) {
            updateSliderButtons(swiper);
        }
    }, [swiper]);

    useEffect(() => {
        switch (true) {
            case xlMedia:
                setSlideCount(videoSlidesCount.xlarge[type]);
                break;
            case largeMedia:
                setSlideCount(videoSlidesCount.large[type]);
                break;
            case mediumMedia:
                setSlideCount(videoSlidesCount.medium[type]);
                break;
            case smallMedia:
                setSlideCount(videoSlidesCount.small[type]);
                break;
        }
        if (swiper) {
            updateSliderButtons(swiper);
        }
    }, [smallMedia, mediumMedia, largeMedia, xlMedia, swiper, type]);

    return (
        <div className={videoStyles.videos}>
            {swiper ? (
                <div className={videoStyles.titleWrapper}>{title ? <h3>{title}</h3> : null}</div>
            ) : null}
            <div className={videoStyles.videosList}>
                {/* {swiper ? (
                    <div className={prevClass} onClick={() => swiper?.slidePrev()}>
                        <svg
                            fill="#FFF"
                            width="32px"
                            height="32px"
                            viewBox="0 0 52 52"
                            data-name="Layer 1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g>
                                <path d="M38,52a2,2,0,0,1-1.41-.59l-24-24a2,2,0,0,1,0-2.82l24-24a2,2,0,0,1,2.82,0,2,2,0,0,1,0,2.82L16.83,26,39.41,48.59A2,2,0,0,1,38,52Z" />
                            </g>
                        </svg>
                    </div>
                ) : null} */}
                <ReactSwiper
                    className={videoStyles.videosSwiper}
                    slidesPerView={slideCount || slidesPerView}
                    spaceBetween={10}
                    modules={[Navigation]}
                    navigation
                    onSlideChange={(swiper) => updateSliderButtons(swiper)}
                    onSwiper={(swiper) => setSwiper(swiper)}
                    watchOverflow={true}
                >
                    {videoSlides.length > 0
                        ? videoSlides.map((video: Video) => (
                              <SwiperSlide className={videoStyles.movieSlide} key={video.id}>
                                  <div className={videoStyles.videoContent}>
                                      <div
                                          className={classNames({
                                              [videoStyles.videoImage]: true,
                                              [videoStyles[`slides${slidesPerView}`]]: true,
                                          })}
                                      >
                                          {/* <div className={videoStyles.imageWrapper}> */}
                                          <Image
                                              className={videoStyles.image}
                                              src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                                              alt={video.id}
                                              fill
                                              placeholder="blur"
                                              blurDataURL={video.blurImage}
                                          />
                                          {/* </div> */}
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 28 28"
                                              width={60}
                                              fill="#fff"
                                              onClick={() => {
                                                  setOpen(true);
                                                  setVideo(video);
                                              }}
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
                </ReactSwiper>
                {video ? (
                    <Modal
                        classNames={{
                            modal: videoStyles.movieModal,
                            modalContainer: videoStyles.movieModalContainer,
                            overlay: videoStyles.movieModalOverlay,
                        }}
                        open={open}
                        onClose={() => {
                            setOpen(false);
                            setVideo(undefined);
                        }}
                        showCloseIcon={false}
                        center
                    >
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${video.key}`}
                            controls={false}
                            playing
                        />
                    </Modal>
                ) : null}
                {/* {swiper ? (
                    <div className={nextClass} onClick={() => swiper?.slideNext()}>
                        <svg
                            fill="#FFF"
                            width="32px"
                            height="32px"
                            viewBox="0 0 52 52"
                            data-name="Layer 1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g>
                                <path d="M14,52a2,2,0,0,1-1.41-.59,2,2,0,0,1,0-2.82L36.17,26,12.59,2.41A2,2,0,0,1,15.41.59l24,24a2,2,0,0,1,0,2.82l-24,24A2,2,0,0,1,14,52Z" />
                            </g>
                        </svg>
                    </div>
                ) : null} */}
            </div>
        </div>
    );
};

export default Videos;
