"use client";

import React, { Suspense, useEffect, useState } from "react";
import "swiper/swiper.css";
import "swiper/scss/grid";
import "node_modules/swiper/modules/navigation/navigation.scss";
import _ from "lodash";
import styles from "./movieTrailer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-modal/styles.css";

const MovieVideos: React.FunctionComponent = () => {
    return (
        <div className={styles.movieTrailer}>
            <div className={styles.trailerBtn}>
                <FontAwesomeIcon icon={faVideoCamera} />
                &nbsp;Trailer
            </div>
        </div>
    );
};

export default MovieVideos;
