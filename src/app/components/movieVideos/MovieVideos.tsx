"use client";

import React, { Suspense, useEffect, useState } from "react";
import "swiper/swiper.css";
import "swiper/scss/grid";
import "node_modules/swiper/modules/navigation/navigation.scss";
import Image from "next/image";
import _ from "lodash";
import { useMediaQuery } from "usehooks-ts";
import Modal from "react-responsive-modal";
import styles from "./movieVideos.module.scss";
import Videos from "../videos/Videos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-modal/styles.css";
import { Movie, Video, VideoRes } from "@/interfaces/movie";
import classNames from "classnames";
import { Cast, Credits, Crew } from "@/interfaces/credits";

type MovieVideosProps = {
    videosList: Video[];
    movieDetails: Movie;
    movieCredits: Credits;
};

const MovieVideos: React.FunctionComponent<MovieVideosProps> = ({
    videosList,
    movieDetails,
    movieCredits,
}: MovieVideosProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const smallMedia = useMediaQuery("(min-width: 480px)");
    const mediumMedia = useMediaQuery("(min-width: 768px)");
    const largeMedia = useMediaQuery("(min-width: 992px)");
    const xlMedia = useMediaQuery("(min-width: 1200px)");
    const [starring, setStarring] = useState<Cast[]>([]);
    const [producers, setProducers] = useState<Crew[]>([]);
    const [directors, setDirectors] = useState<Crew[]>([]);
    const crewJobs = ["Director", "Producer"];
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

    useEffect(() => {
        if (movieCredits.cast.length > 0) {
            setStarring(_.orderBy(movieCredits.cast, "popularity", "desc").slice(0, 4));
        }
        if (movieCredits.crew.length > 0) {
            setProducers(
                _.chain(_.orderBy(_.uniqBy(movieCredits.crew, "id"), "popularity", "desc"))
                    .filter((crew: Crew) => _.toLower(crew.job) === "producer")
                    .value()
            );
            setDirectors(
                _.chain(_.orderBy(_.uniqBy(movieCredits.crew, "id"), "popularity", "desc"))
                    .filter((crew: Crew) => _.toLower(crew.job) === "director")
                    .value()
            );
        }
    }, [movieCredits]);

    return (
        <>
            {console.log(starring)}
            <div className={styles.movieVideos}>
                <div className={styles.trailerBtn} onClick={() => setOpen(true)}>
                    <FontAwesomeIcon icon={faVideoCamera} />
                    &nbsp;Trailer
                </div>
            </div>
            <Modal
                classNames={{
                    modal: styles.movieModal,
                    modalContainer: styles.movieModalContainer,
                    overlay: styles.movieModalOverlay,
                }}
                open={open}
                onClose={() => setOpen(false)}
                showCloseIcon={false}
                center
            >
                <div
                    className={classNames({
                        [styles.coverImage]: true,
                    })}
                >
                    <Image
                        src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                        alt={movieDetails.title}
                        fill
                        placeholder="blur"
                        blurDataURL={movieDetails.backdrop_path_blur}
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div className={styles.movieDescription}>
                    <h2>{movieDetails.title}</h2>
                    <h4 className={styles.movieOverview}>{movieDetails.overview}</h4>
                    <div className={styles.movieCast}>
                        <h4>
                            Starring:{" "}
                            {starring.map((cast: Cast, i: number) => (
                                <span className={styles.cast}>
                                    {cast.name} as {cast.character}
                                    {i === starring.length - 1 ? "" : ", "}
                                </span>
                            ))}
                        </h4>
                    </div>
                    {directors.length > 0 ? (
                        <div className={styles.movieCast}>
                            <h4>
                                Directed by:{" "}
                                {directors.map((cast: Crew, i: number) => (
                                    <span className={styles.cast}>
                                        {cast.name}
                                        {i === directors.length - 1 ? "" : ", "}
                                    </span>
                                ))}
                            </h4>
                        </div>
                    ) : null}
                    {producers.length > 0 ? (
                        <div className={styles.movieCast}>
                            <h4>
                                Produced by:{" "}
                                {producers.map((cast: Crew, i: number) => (
                                    <span className={styles.cast}>
                                        {cast.name}
                                        {i === producers.length - 1 ? "" : ", "}
                                    </span>
                                ))}
                            </h4>
                        </div>
                    ) : null}
                    <h4 className={styles.movieMeta}></h4>
                </div>
                <div className={styles.videosList}>
                    {videosList.filter((v: Video) => v.type === "Trailer").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videosList.filter((v: Video) => v.type === "Trailer")}
                                    title="Trailers"
                                    type="Trailer"
                                />
                            </Suspense>
                        </div>
                    ) : null}
                    {videosList.filter((v: Video) => v.type === "Clip").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videosList.filter((v: Video) => v.type === "Clip")}
                                    title="Clips"
                                    type="Clip"
                                />
                            </Suspense>
                        </div>
                    ) : null}
                    {videosList.filter((v: Video) => v.type === "Teaser").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videosList.filter((v: Video) => v.type === "Teaser")}
                                    title="Teasers"
                                    type="Teaser"
                                />
                            </Suspense>
                        </div>
                    ) : null}
                    {videosList.filter((v: Video) => v.type === "Featurette").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videosList.filter(
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
