import styles from "./page.module.scss";
import Movies from "./movies/page";

export default async function Home() {
    // const latestData = fetch(
    //     `${process.env.TMDB_V3_URL}/movie/latest?api_key=${process.env.TMDB_APIKEY}`
    // );
    // const popularMovies = await data.json();

    return (
            <main className={styles.main}>
                {/* @ts-expect-error Async Server Component */}
                <Movies />
            </main>
    );
}
