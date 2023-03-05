import { parseMovieIdQuery } from "@/app/utils";
import {
    fetchTMDBMovieCredits,
    fetchTMDBMovieDetails,
    fetchTMDBMovieVideos,
} from "@/app/utils/tmdbApi";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";
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
    const movieCredits = await fetchTMDBMovieCredits(validId);

    return (
        <div className={styles.movie}>
            <div
                className={styles.coverImage}
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.55)), url('https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}')`,
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
                    width="250"
                    height="400"
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
                    <div className={styles.movieExtras}>
                        {/* Genres: {movieDetails.genres.map((genre: MovieGenre) => {
                            return genre.name;
                        }).join(", ")} */}
                        <div className={styles.movieExtrasItem}>
                            <strong>Released:</strong> {movieDetails.release_date}
                        </div>
                        <div className={styles.movieExtrasItem}>
                            <strong>Genres:</strong>{" "}
                            {movieDetails.genres
                                .map((genre: MovieGenre) => {
                                    return genre.name;
                                })
                                .join(", ")}
                        </div>
                        <div className={styles.movieExtrasItem}>
                            <strong>Duration:</strong> {movieDetails.runtime}m
                        </div>
                        <div className={styles.movieExtrasItem}>
                            <strong>Cast:</strong>{" "}
                            {movieCredits.cast
                                .slice(0, 5)
                                .map((cast: any) => {
                                    return cast.name;
                                })
                                .join(", ")}
                        </div>
                        <div className={styles.movieExtrasItem}>
                            <strong>Country:</strong>{" "}
                            {movieDetails.genres
                                .map((genre: MovieGenre) => {
                                    return genre.name;
                                })
                                .join(", ")}
                        </div>
                        <div className={styles.movieExtrasItem}>
                            <strong>Country:</strong>{" "}
                            {movieDetails.production_countries
                                .map((country: any) => {
                                    return country.name;
                                })
                                .join(", ")}
                        </div>
                        <div className={styles.movieExtrasItem}>
                            <strong>Languages:</strong>{" "}
                            {movieDetails.spoken_languages
                                .map((lang: any) => {
                                    return lang.english_name;
                                })
                                .join(", ")}
                        </div>
                        {movieDetails.homepage ? (
                            <div className={styles.movieExtrasItem}>
                                <strong>Website:</strong>{" "}
                                <a rel="noopener" href={movieDetails.homepage} target="_blank">
                                    {movieDetails.homepage}
                                </a>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
