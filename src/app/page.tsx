import styles from "./page.module.scss";
import Movies from "./movies/page";
import RootLayout from "./layout";

export default async function Home() {
    // const latestData = fetch(
    //     `${process.env.TMDB_V3_URL}/movie/latest?api_key=${process.env.TMDB_APIKEY}`
    // );
    // const popularMovies = await data.json();

    return (
        <RootLayout>
            <main className={styles.main}>
                {/* @ts-expect-error Async Server Component */}
                <Movies />
            </main>
        </RootLayout>
    );
}
