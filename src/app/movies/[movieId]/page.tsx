import styles from "./page.module.scss";

type MovieProps = {
    movie: any;
};

export default async function Movie({ movie }: MovieProps) {
    // const latestData = fetch(
    //     `${process.env.TMDB_V3_URL}/movie/latest?api_key=${process.env.TMDB_APIKEY}`
    // );
    // const popularMovies = await data.json();

    return (
        <div className={styles.movie}>
        </div>
    );
}
