"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "swiper/scss/grid";
import "node_modules/swiper/modules/navigation/navigation.scss";
import Swiper, { Navigation } from "swiper";
import videoStyles from "./videos.module.scss";
import Image from "next/image";
import classNames from "classnames";
import _ from "lodash";
import { useMediaQuery } from "usehooks-ts";
import { videoSlidesCount } from "@/app/utils";
import styles from "./movieVideos.module.scss";
import Videos from "../videos/Videos";
import Modal from "react-responsive-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-modal/styles.css";
import { Movie } from "@/interfaces/movie";

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

type MovieVideosProps = {
    videosList: any;
    movieDetails: Movie;
};

const MovieVideos: React.FunctionComponent<MovieVideosProps> = ({
    videosList,
    movieDetails,
}: MovieVideosProps) => {
    console.log(movieDetails);
    const [open, setOpen] = useState<boolean>(false);
    const smallMedia = useMediaQuery("(min-width: 480px)");
    const mediumMedia = useMediaQuery("(min-width: 768px)");
    const largeMedia = useMediaQuery("(min-width: 992px)");
    const xlMedia = useMediaQuery("(min-width: 1200px)");

    // useEffect(() => {
    //     switch (true) {
    //         case xlMedia:
    //             setSlideCount(videoSlidesCount.xlarge[type]);
    //             break;
    //         case largeMedia:
    //             setSlideCount(videoSlidesCount.large[type]);
    //             break;
    //         case mediumMedia:
    //             setSlideCount(videoSlidesCount.medium[type]);
    //             break;
    //         case smallMedia:
    //             setSlideCount(videoSlidesCount.small[type]);
    //             break;
    //     }
    // }, [smallMedia, mediumMedia, largeMedia, xlMedia]);

    return (
        <>
            <div className={styles.movieVideos}>
                <div className={styles.trailerBtn} onClick={() => setOpen(true)}>
                    <FontAwesomeIcon icon={faVideoCamera} />
                    &nbsp;Trailer
                </div>
            </div>
            <Modal
                classNames={{ modal: styles.movieModal }}
                open={open}
                onClose={() => setOpen(false)}
                showCloseIcon={false}
                center
            >
                <div className={styles.coverImage}>
                    <Image
                        src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                        alt={movieDetails.title}
                        fill
                        style={{
                            objectFit: "cover"
                        }}
                    />
                </div>
                <div className={styles.movieDescription}></div>
                <div className={styles.videosList}>
                    {videosList.results.filter((v: Video) => v.type === "Trailer").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videosList.results.filter(
                                        (v: Video) => v.type === "Trailer"
                                    )}
                                    title="Trailers"
                                    type="Trailer"
                                />
                            </Suspense>
                        </div>
                    ) : null}
                    {videosList.results.filter((v: Video) => v.type === "Clip").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videosList.results.filter(
                                        (v: Video) => v.type === "Clip"
                                    )}
                                    title="Clips"
                                    type="Clip"
                                />
                            </Suspense>
                        </div>
                    ) : null}
                    {videosList.results.filter((v: Video) => v.type === "Teaser").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videosList.results.filter(
                                        (v: Video) => v.type === "Teaser"
                                    )}
                                    title="Teasers"
                                    type="Teaser"
                                />
                            </Suspense>
                        </div>
                    ) : null}
                    {videosList.results.filter((v: Video) => v.type === "Featurette").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videosList.results.filter(
                                        (v: Video) => v.type === "Featurette"
                                    )}
                                    title="Featurettes"
                                    type="Featurette"
                                />
                            </Suspense>
                        </div>
                    ) : null}
                    <div className={styles.movieBehindTheScenes}></div>
                </div>
            </Modal>
        </>
    );
};

export default MovieVideos;
