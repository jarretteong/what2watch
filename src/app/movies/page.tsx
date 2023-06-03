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

    return (
        <div className={styles.movies}>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <Landing />
            </Suspense>
            <Suspense>
                {/* <MovieGenre genre="Horror" imageType="backdrops"/> */}
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <Popular />
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <Trending />
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <MovieGenre genre="horror" imageType="backdrops" />
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <MovieGenre genre="action" imageType="backdrops" />
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <MovieGenre genre="mystery" imageType="backdrops" />
            </Suspense>
        </div>
    );
}
