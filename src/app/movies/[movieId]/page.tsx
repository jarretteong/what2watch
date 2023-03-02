import Videos from "@/app/components/videos/Videos";
import { Video } from "@/app/components/videos/Videos";
import { parseMovieIdQuery } from "@/app/utils";
import { fetchTMDBMovieDetails, fetchTMDBMovieVideos } from "@/app/utils/tmdbApi";
import _ from "lodash";
import Image from "next/image";
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
    const movieDetails = await fetchTMDBMovieDetails(validId);
    console.log({ movieDetails });
    return (
        <div className={styles.movie}>
            {/* {videosList.results.filter((v: Video) => v.type === "Trailer").length > 0 ? (
                <Suspense>
                    <Videos
                        videos={videosList.results.filter((v: Video) => v.type === "Trailer")}
                    />
                </Suspense>
            ) : null} */}
            <div className={styles.coverImage}>
                <Image
                    src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                    alt={movieDetails.original_title}
                    fill
                />
            </div>
            <div className={styles.movieOverview}>
                <Image
                    src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                    alt={movieDetails.original_title}
                    width="200"
                    height="300"
                />
            </div>
        </div>
    );
}
