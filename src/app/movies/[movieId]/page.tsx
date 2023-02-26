import Trailer, { Video } from "@/app/components/trailer/Trailer";
import { parseMovieIdQuery } from "@/app/utils";
import { fetchTMDBMovieDetails, fetchTMDBMovieVideos } from "@/app/utils/tmdbApi";
import _ from "lodash";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import styles from "./page.module.scss";

const checkValidParams = async (movieId: string): Promise<number | null> => {
    const id = _.last(movieId.split("-"));
    if (id) {
        try {
            const movieData = await fetchTMDBMovieDetails(+id);
            return movieId === parseMovieIdQuery(+id, movieData.title) ? +id : null;
        } catch (err) {
            return null;
        }
    }
    return null;
};

export default async function Movie(request: any) {
    const { movieId } = request.params;
    const validId = await checkValidParams(movieId);

    if (!validId) {
        return notFound();
    }

    const videosList = await fetchTMDBMovieVideos(validId);
    console.log(videosList.results);

    return (
        <div className={styles.movie}>
            {videosList.results.filter((v: Video) => v.type === "Trailer").length > 0 ? (
                <Suspense>
                    <Trailer
                        videos={videosList.results.filter((v: Video) => v.type === "Trailer")}
                    />
                </Suspense>
            ) : null}
        </div>
    );
}
