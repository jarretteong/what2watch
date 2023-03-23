import { parseMovieIdQuery } from "@/app/utils";
import {
    fetchTMDBMovieCredits,
    fetchTMDBMovieDetails,
    fetchTMDBMovieVideos,
    fetchTMDBTrendingMovies,
} from "@/app/utils/tmdbApi";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Movie, MovieGenre, Video } from "@/interfaces/movie";
import { Suspense } from "react";
import Videos from "@/app/components/videos/Videos";

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

export default async function MovieComponent(request: any) {
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
            <div className={styles.movieSummary}>
                <Image
                    className={styles.moviePoster}
                    src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                    width="250"
                    height="400"
                />
                <div className={styles.movieInfo}>
                    <h2 className={styles.movieTitle}>{movieDetails.title}</h2>
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
                            <strong>Production:</strong>{" "}
                            {movieDetails.production_companies
                                .slice(0, 5)
                                .map((production: any) => {
                                    return production.name;
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
                            <strong>Audio:</strong>{" "}
                            {movieDetails.spoken_languages
                                .map((lang: any) => {
                                    return lang.english_name;
                                })
                                .join(", ")}
                        </div>
                        {movieDetails.homepage ? (
                            <div className={styles.movieExtrasItem}>
                                <strong>Website:</strong>{" "}
                                <a rel="noreferrer" href={movieDetails.homepage} target="_blank">
                                    {movieDetails.homepage}
                                </a>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className={styles.movieOthers}>
                {videosList.results.filter((v: Video) => v.type === "Clip").length > 0 ? (
                    <div className={styles.movieVids}>
                        <Suspense>
                            <Videos
                                videos={videosList.results.filter((v: Video) => v.type === "Clip")}
                                slidesPerView={2}
                                title="Clips"
                            />
                        </Suspense>
                    </div>
                ) : null}
                {videosList.results.filter((v: Video) => v.type === "Trailer").length > 0 ? (
                    <div className={styles.movieVids}>
                        <Suspense>
                            <Videos
                                videos={videosList.results.filter((v: Video) => v.type === "Trailer")}
                                slidesPerView={2}
                                title="Trailers"
                            />
                        </Suspense>
                    </div>
                ) : null}
                {videosList.results.filter((v: Video) => v.type === "Teaser").length > 0 ? (
                    <div className={styles.movieVids}>
                        <Suspense>
                            <Videos
                                videos={videosList.results.filter((v: Video) => v.type === "Teaser")}
                                slidesPerView={3}
                                title="Teasers"
                            />
                        </Suspense>
                    </div>
                ) : null}
                {videosList.results.filter((v: Video) => v.type === "Featurette").length > 0 ? (
                    <div className={styles.movieVids}>
                        <Suspense>
                            <Videos
                                videos={videosList.results.filter((v: Video) => v.type === "Featurette")}
                                slidesPerView={3}
                                title="Featurettes"
                            />
                        </Suspense>
                    </div>
                ) : null}
                <div className={styles.movieBehindTheScenes}></div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const movies = await fetchTMDBTrendingMovies();

    return movies.results.map((movie: Movie) => ({
        movieId: parseMovieIdQuery(movie.id, movie.title),
    }));
}
