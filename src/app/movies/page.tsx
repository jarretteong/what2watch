import styles from "./page.module.scss";
import Popular from "../components/popular/Popular";
import Trending from "../components/trending/Trending";
import Landing from "../components/landing/Landing";
import { Suspense } from "react";
import MovieGenre from "../components/movieGenre/MovieGenre";

export default async function Movies() {
    // const latestData = fetch(
    //     `${process.env.TMDB_V3_URL}/movie/latest?api_key=${process.env.TMDB_APIKEY}`
    // );
    // const popularMovies = await data.json();
    const horrorGenre = await MovieGenre({ genre: "horror", type: "full" })

    return (
        <div className={styles.movies}>
            <Suspense>
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
