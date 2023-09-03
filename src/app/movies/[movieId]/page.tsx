import { parseMovieIdQuery } from "@/app/utils";
import {
    fetchTMDBMovieCredits,
    fetchTMDBMovieDetails,
    fetchTMDBMovieImages,
    fetchTMDBMovieVideos,
    fetchTMDBRecommendedMovies,
    fetchTMDBTrendingMovies,
} from "@/app/utils/tmdbApi";
import _ from "lodash";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { ImageData, Movie, MovieCustom, MovieGenre, MovieRes, Video, VideoRes } from "@/interfaces/movie";
import MovieVideos from "@/app/components/movieVideos/MovieVideos";
import { getPlaiceholder } from "plaiceholder";
import { Credits } from "@/interfaces/credits";
import { Metadata } from "next";
import MovieTrailer from "@/app/components/movieTrailer/MovieTrailer";
import MoviePoster from "@/app/components/moviePoster/moviePoster";

export type MovieMetadataParams = {
    params: { movieId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

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

export async function generateMetadata({
    params,
    searchParams,
}: MovieMetadataParams): Promise<Metadata> {
    const { movieId } = params;
    const validId = await checkValidParams(movieId);

    if (!validId) {
        return notFound();
    }

    const movieDetails: Movie = await fetchTMDBMovieDetails(validId);
    return {
        title: movieDetails.title,
        openGraph: {
            title: movieDetails.title,
        },
    };
}
const addPlaceholderImagesMovieDetails = async (data: Movie) => {
    if (data.backdrop_path) {
        const src = `https://image.tmdb.org/t/p/w342${data.backdrop_path}`;
        const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
        // const base64String = buffer.toString('base64');
        const { base64 } = await getPlaiceholder(buffer);
        data.backdrop_path_blur = base64;
    }
    if (data.poster_path) {
        const src = `https://image.tmdb.org/t/p/w342${data.poster_path}`;
        const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
        // const base64String = buffer.toString('base64');
        const { base64 } = await getPlaiceholder(buffer);
        data.poster_path_blur = base64;
    }
    return data;
};

const addPlaceholderImagesVideos = async (data: Video[]): Promise<Video[]> => {
    return await Promise.all(
        data.map(async (video: Video) => {
            if (video.key) {
                const src = `https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`;
                const buffer = await fetch(src).then(async (res) =>
                    Buffer.from(await res.arrayBuffer())
                );
                // const base64String = buffer.toString('base64');
                const { base64 } = await getPlaiceholder(buffer);
                return {
                    ...video,
                    blurImage: base64,
                };
            }
            return video;
        })
    );
};

export default async function MovieComponent(request: any) {
    const { movieId } = request.params;
    const validId = await checkValidParams(movieId);

    if (!validId) {
        return notFound();
    }

    // const videosList: VideoRes = await fetchTMDBMovieVideos(validId);
    const movieDetails: Movie = await fetchTMDBMovieDetails(validId);
    const movieCredits: Credits = await fetchTMDBMovieCredits(validId);
    console.log(validId)
    const movies: MovieRes = await fetchTMDBRecommendedMovies(validId, 1);

    const recommendedMovies: MovieCustom[] = await Promise.all(
        movies.results.map(async (movie: any, index: number) => {
            const videos = await fetchTMDBMovieVideos(movie.id);
            const images = await fetchTMDBMovieImages(movie.id);
            const movieCredits: Credits = await fetchTMDBMovieCredits(movie.id);

            // if (index <= 5) {
            //     // videos.results = await addPlaceholderImagesVideos(videos.results);
            //     movie = await addPlaceholderImagesMovieDetails(movie);
            // }

            let filteredImages: any = {};
            if (images) {
                _.keys(images)
                    .filter((key) => key === "id" || key === "backdrops" || key === "posters")
                    .forEach((key) => {
                        if (_.isArray(images[key])) {
                            filteredImages[key] = images[key].filter(
                                (image: ImageData) => image.iso_639_1 === "en"
                            );
                        } else if (key === "id") {
                            filteredImages[key] = images[key];
                        }
                        return null;
                    });
            }
            const officialTrailer = _.first(
                videos.results.filter((video: Video) => video.type === "Trailer")
            );
            return {
                ...movie,
                ...filteredImages,
                images: {
                    ...filteredImages,
                },
                videos: videos.results,
                trailer: officialTrailer,
                credits: movieCredits,
            };
        })
    );

    // videosList.results = await addPlaceholderImagesVideos(videosList.results);
    // await addPlaceholderImagesMovieDetails(movieDetails);

    return (
        <div className={styles.movie}>
            <div
                className={styles.coverImage}
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.55)), url('https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}')`,
                }}
            ></div>
            <div className={styles.movieSummary}>
                <section className={styles.movieFullDetails}>
                    <div className={styles.moviePosterWrapper}>
                        <Image
                            className={styles.moviePoster}
                            src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                            alt={movieDetails.title}
                            fill
                        />
                    </div>
                    <div className={styles.movieInfo}>
                        <div className={styles.movieMain}>
                            <h2 className={styles.movieTitle}>{movieDetails.title}</h2>
                            <div className={styles.movieMainMetadata}>
                                <MovieTrailer />
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
                        </div>
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
                                    <a
                                        rel="noreferrer"
                                        href={movieDetails.homepage}
                                        target="_blank"
                                    >
                                        {movieDetails.homepage}
                                    </a>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </section>
            </div>
            <div className={styles.movieRecommendation}>
                <MoviePoster
                    type="recommendations"
                    movieList={recommendedMovies}
                    movieId={validId}
                />
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
