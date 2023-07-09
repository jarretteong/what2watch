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
import { MovieCustom, Video, VideoRes } from "@/interfaces/movie";
import classNames from "classnames";
import { Cast, Credits, Crew } from "@/interfaces/credits";
import { getPlaceholderImageURL } from "@/app/utils";

type MovieVideosProps = {
    movieDetails: MovieCustom;
    open: boolean;
    setOpen: any;
};

const MovieVideos: React.FunctionComponent<MovieVideosProps> = ({
    movieDetails,
    open,
    setOpen,
}: MovieVideosProps) => {
    // const smallMedia = useMediaQuery("(min-width: 480px)");
    const mediumMedia = useMediaQuery("(min-width: 768px)");
    // const largeMedia = useMediaQuery("(min-width: 992px)");
    // const xlMedia = useMediaQuery("(min-width: 1200px)");
    const { videos, credits } = movieDetails;
    const [starring, setStarring] = useState<Cast[]>([]);
    const [producers, setProducers] = useState<Crew[]>([]);
    const [directors, setDirectors] = useState<Crew[]>([]);
    const [backdropMedia, setBackdropMedia] = useState<boolean>(true);
    // const crewJobs = ["Director", "Producer"];

    useEffect(() => {
        if (credits && credits.cast.length > 0) {
            setStarring(_.orderBy(credits.cast, "popularity", "desc").slice(0, 4));
        }
        if (credits && credits.crew.length > 0) {
            setProducers(
                _.chain(_.orderBy(_.uniqBy(credits.crew, "id"), "popularity", "desc"))
                    .filter((crew: Crew) => _.toLower(crew.job) === "producer")
                    .value()
            );
            setDirectors(
                _.chain(_.orderBy(_.uniqBy(credits.crew, "id"), "popularity", "desc"))
                    .filter((crew: Crew) => _.toLower(crew.job) === "director")
                    .value()
            );
        }
    }, [movieDetails.credits]);

    useEffect(() => {
        setBackdropMedia(!mediumMedia);
    }, [mediumMedia]);

    return (
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
                    src={`https://image.tmdb.org/t/p/w1280${
                        !backdropMedia ? movieDetails.backdrop_path : movieDetails.poster_path
                    }`}
                    alt={movieDetails.title}
                    fill
                    placeholder="blur"
                    blurDataURL={getPlaceholderImageURL(`https://image.tmdb.org/t/p/w342${
                        !backdropMedia ? movieDetails.backdrop_path : movieDetails.poster_path
                    }`)}
                />
            </div>
            <div className={styles.movieDescription}>
                <h2>{movieDetails.title}</h2>
                <h4 className={styles.movieOverview}>{movieDetails.overview}</h4>
                <div className={styles.movieCast}>
                    <h4>
                        Starring:{" "}
                        {starring.map((cast: Cast, i: number) => (
                            <span className={styles.cast} key={cast.name}>
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
                                <span className={styles.cast} key={cast.name}>
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
                                <span className={styles.cast} key={cast.name}>
                                    {cast.name}
                                    {i === producers.length - 1 ? "" : ", "}
                                </span>
                            ))}
                        </h4>
                    </div>
                ) : null}
                <h4 className={styles.movieMeta}></h4>
            </div>
            {videos ? (
                <div className={styles.videosList}>
                    {videos.filter((v: Video) => v.type === "Trailer").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videos.filter((v: Video) => v.type === "Trailer")}
                                    title="Trailers"
                                    type="Trailer"
                                />
                            </Suspense>
                        </div>
                    ) : null}
                    {videos.filter((v: Video) => v.type === "Clip").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videos.filter((v: Video) => v.type === "Clip")}
                                    title="Clips"
                                    type="Clip"
                                />
                            </Suspense>
                        </div>
                    ) : null}
                    {videos.filter((v: Video) => v.type === "Teaser").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videos.filter((v: Video) => v.type === "Teaser")}
                                    title="Teasers"
                                    type="Teaser"
                                />
                            </Suspense>
                        </div>
                    ) : null}
                    {videos.filter((v: Video) => v.type === "Featurette").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videos.filter((v: Video) => v.type === "Featurette")}
                                    title="Featurettes"
                                    type="Featurette"
                                />
                            </Suspense>
                        </div>
                    ) : null}
                    {videos.filter((v: Video) => v.type === "BehindTheScenes").length > 0 ? (
                        <div className={styles.movieVids}>
                            <Suspense>
                                <Videos
                                    videos={videos.filter(
                                        (v: Video) => v.type === "BehindTheScenes"
                                    )}
                                    title="Behind the Scenes"
                                    type="BehindTheScenes"
                                />
                            </Suspense>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </Modal>
    );
};

export default MovieVideos;
