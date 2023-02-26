import styles from "./page.module.scss";
import Popular from "../components/popular/Popular";
import Trending from "../components/trending/Trending";
import Landing from "../components/landing/Landing";
import { Suspense } from "react";

export default async function Movies() {
    // const latestData = fetch(
    //     `${process.env.TMDB_V3_URL}/movie/latest?api_key=${process.env.TMDB_APIKEY}`
    // );
    // const popularMovies = await data.json();

    return (
        <div className={styles.movies}>
            <div className={styles.landingContainer}>
                <Suspense fallback="Loading...">
                    {/* @ts-expect-error Async Server Components */}
                    <Landing />
                </Suspense>
            </div>
            <div className={styles.popularContainer}>
                <Suspense>
                    {/* @ts-expect-error Async Server Components */}
                    <Popular />
                </Suspense>
            </div>
            <div className={styles.trendingContainer}>
                <Suspense>
                    {/* @ts-expect-error Async Server Components */}
                    <Trending />
                </Suspense>
            </div>
        </div>
    );
}
