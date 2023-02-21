import { Inter } from "@next/font/google";
import styles from "./page.module.scss";
import Popular from "./components/popular/Popular";
import { Suspense } from "react";
import Trending from "./components/trending/Trending";
import Landing from "./components/landing/Landing";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
    // const latestData = fetch(
    //     `${process.env.TMDB_V3_URL}/movie/latest?api_key=${process.env.TMDB_APIKEY}`
    // );
    // const popularMovies = await data.json();

    return (
        <main className={styles.main}>
          <div className={styles["landing-container"]}>
            {/* @ts-ignore */}
            <Landing />
          </div>
          <div className={styles["popular-container"]}>
            <Suspense fallback={<p>Loading...</p>}>
                {/* @ts-ignore */}
                <Popular />
            </Suspense>
          </div>
          <div className={styles["trending-container"]}>
            <Suspense fallback={<p>Loading Latest...</p>}>
                {/* @ts-ignore */}
                <Trending />
            </Suspense>
          </div>
        </main>
    );
}
