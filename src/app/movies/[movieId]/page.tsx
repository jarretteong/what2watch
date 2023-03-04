import { parseMovieIdQuery } from "@/app/utils";
import { fetchTMDBMovieDetails, fetchTMDBMovieVideos } from "@/app/utils/tmdbApi";
import { faStar, faVideo, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { MovieGenre } from "@/interfaces/movie";

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
            <div
                className={styles.coverImage}
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.65)), url('https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}')`,
                }}
            ></div>
            {/* {videosList.results.filter((v: Video) => v.type === "Trailer").length > 0 ? (
                <Suspense>
                    <Videos
                        videos={videosList.results.filter((v: Video) => v.type === "Trailer")}
                    />
                </Suspense>
            ) : null} */}
            <div className={styles.movieSummary}>
                <Image
                    className={styles.moviePoster}
                    src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                    width="200"
                    height="300"
                />
                <div className={styles.movieInfo}>
                    <p className={styles.movieTitle}>{movieDetails.title}</p>
                    <div className={styles.movieMainMetadata}>
                        <div className={styles.trailerBtn}>
                            <FontAwesomeIcon icon={faVideoCamera} />
                            &nbsp;Trailer
                        </div>
                        <div className={styles.avgRating}>
                            IMDB: {Math.round(movieDetails.vote_average * 10) / 10}
                        </div>
                        <div className={styles.runtime}>
                            {Math.floor(movieDetails.runtime / 60) > 0
                                ? `${Math.floor(movieDetails.runtime / 60)}h `
                                : ""}
                            {Math.floor(movieDetails.runtime % 60) > 0
                                ? `${Math.floor(movieDetails.runtime % 60)}m`
                                : ""}
                        </div>
                    </div>
                    <div className={styles.movieInfoOverview}>{movieDetails.overview}</div>
                    <div className={styles.movieMoreMetadata}>
                        {/* Genres: {movieDetails.genres.map((genre: MovieGenre) => {
                            return genre.name;
                        }).join(", ")} */}
                    </div>
                </div>
            </div>
        </div>
    );
}
