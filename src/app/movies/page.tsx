import styles from "./page.module.scss";
import Popular from "../components/popular/Popular";
import Trending from "../components/trending/Trending";
import Landing from "../components/landing/Landing";

export default async function Movies() {
    // const latestData = fetch(
    //     `${process.env.TMDB_V3_URL}/movie/latest?api_key=${process.env.TMDB_APIKEY}`
    // );
    // const popularMovies = await data.json();

    return (
        <div className={styles.movies}>
            <div className={styles.landingContainer}>
                {/* @ts-expect-error Async Server Components */}
                <Landing />
            </div>
            <div className={styles.popularContainer}>
                {/* @ts-expect-error Async Server Components */}
                <Popular />
            </div>
            <div className={styles.trendingContainer}>
                {/* @ts-expect-error Async Server Components */}
                <Trending />
            </div>
        </div>
    );
}
