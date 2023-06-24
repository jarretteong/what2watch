import styles from "./page.module.scss";
import Popular from "../components/popular/Popular";
import Trending from "../components/trending/Trending";
import Landing from "../components/landing/Landing";
import { Suspense } from "react";
import MovieGenre from "../components/movieGenre/MovieGenre";
import Image from "next/image";
import { fetchTMDBTrendingMovies } from "../utils/tmdbApi";
import _ from "lodash";
import { getPlaiceholder } from "plaiceholder";

const addPlaceholderImagesMovieDetails = async (data: any) => {
    if (data.backdrop_path) {
        const src = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
        const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
        // const base64String = buffer.toString('base64');
        const { base64 } = await getPlaiceholder(buffer);
        data.backdrop_path_blur = base64;
    }
    if (data.poster_path) {
        const src = `https://image.tmdb.org/t/p/original${data.poster_path}`;
        const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
        // const base64String = buffer.toString('base64');
        const { base64 } = await getPlaiceholder(buffer);
        data.poster_path_blur = base64;
    }
    return data;
};

export default async function Movies() {
    const movies = await fetchTMDBTrendingMovies();
    let movie: any = _.first(movies.results);
    // const latestData = fetch(
    //     `${process.env.TMDB_V3_URL}/movie/latest?api_key=${process.env.TMDB_APIKEY}`
    // );
    // const popularMovies = await data.json();
    // const horrorGenre = await MovieGenre({ genre: "horror", type: "full" });
    console.log(movie)
    movie = await addPlaceholderImagesMovieDetails(movie);

    return (
        <div className={styles.movies}>
            <Suspense
                fallback={
                    <div className={styles.backdropImageWrapper}>
                        <Image
                            className={styles.backdropImage}
                            alt={movie?.title || ""}
                            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                            fill
                            placeholder="blur"
                            blurDataURL={movie?.backdrop_path_blur}
                        />
                    </div>
                }
            >
                {/* @ts-expect-error Async Server Components */}
                <Landing />
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <MovieGenre genre="horror" type="poster" />
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <MovieGenre genre="action" />
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <MovieGenre genre="mystery" type="backdrop" />
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <MovieGenre genre="thriller" type="poster" />
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <MovieGenre genre="adventure" type="poster" />
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <MovieGenre genre="comedy" />
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <MovieGenre genre="science fiction" />
            </Suspense>
        </div>
    );
}
