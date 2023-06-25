import styles from "./page.module.scss";
import Popular from "../components/popular/Popular";
import Trending from "../components/trending/Trending";
import Landing from "../components/landing/Landing";
import { Suspense } from "react";
import MovieGenre from "../components/movieGenre/MovieGenre";
import Image from "next/image";
import {
    fetchTMDBMovieGenres,
    fetchTMDBMoviesByGenreId,
    fetchTMDBTrendingMovies,
} from "../utils/tmdbApi";
import _ from "lodash";
import { getPlaiceholder } from "plaiceholder";

// const addPlaceholderImagesMovieDetails = async (data: any) => {
//     if (data.backdrop_path) {
//         const src = `https://image.tmdb.org/t/p/w342${data.backdrop_path}`;
//         const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
//         // const base64String = buffer.toString('base64');
//         const { base64 } = await getPlaiceholder(buffer);
//         data.backdrop_path_blur = base64;
//     }
//     if (data.poster_path) {
//         const src = `https://image.tmdb.org/t/p/w342${data.poster_path}`;
//         const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
//         // const base64String = buffer.toString('base64');
//         const { base64 } = await getPlaiceholder(buffer);
//         data.poster_path_blur = base64;
//     }
//     return data;
// };

export default async function Movies() {
    // const horrorGenre = await MovieGenre({ genre: "horror", type: "full" });
    // const landingMovies = await fetchTMDBTrendingMovies();
    // let movie: any = _.first(landingMovies.results);
    // movie = await addPlaceholderImagesMovieDetails(movie);

    // const horrorData = await fetchTMDBMovieGenres("horror");
    // const actionData = await fetchTMDBMovieGenres("action");
    // const thrillerData = await fetchTMDBMovieGenres("thriller");
    // const adventureData = await fetchTMDBMovieGenres("adventure");
    // const comedyData = await fetchTMDBMovieGenres("comedy");
    // const scifiData = await fetchTMDBMovieGenres("science fiction");
    // const mysteryData = await fetchTMDBMovieGenres("mystery");
    // const romanceData = await fetchTMDBMovieGenres("romance");
    // let horrorMovies = null;
    // let actionMovies = null;
    // let thrillerMovies = null;
    // let adventureMovies = null;
    // let comedyMovies = null;
    // let scifiMovies = null;
    // let mysteryMovies = null;
    // let romanceMovies = null;

    // horrorMovies = await fetchTMDBMoviesByGenreId(horrorData.id);
    // actionMovies = await fetchTMDBMoviesByGenreId(actionData.id);
    // thrillerMovies = await fetchTMDBMoviesByGenreId(thrillerData.id);
    // adventureMovies = await fetchTMDBMoviesByGenreId(adventureData.id);
    // comedyMovies = await fetchTMDBMoviesByGenreId(comedyData.id);
    // scifiMovies = await fetchTMDBMoviesByGenreId(scifiData.id);
    // mysteryMovies = await fetchTMDBMoviesByGenreId(mysteryData.id);
    // romanceMovies = await fetchTMDBMoviesByGenreId(romanceData.id);

    return (
        <div className={styles.movies}>
            <Suspense
            // fallback={
            //     <div className={styles.backdropImageWrapper}>
            //         <Image
            //             className={styles.backdropImage}
            //             alt={movie?.title || ""}
            //             src={movie?.backdrop_path_blur}
            //             fill
            //         />
            //     </div>
            // }
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
                <MovieGenre genre="science fiction" type="backdrop" />
            </Suspense>
            <Suspense>
                {/* @ts-expect-error Async Server Components */}
                <MovieGenre genre="romance" />
            </Suspense>
        </div>
    );
}
