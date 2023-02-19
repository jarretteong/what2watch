import Image from "next/image";
import { Inter } from "@next/font/google";
import "./page.scss";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
    const data = await fetch(`${process.env.API_URL}/api/movies/popular`);
    const popularMovies = await data.json();
    
    return (
        <main className="main">
            {/* <Popular movies={popularMovies.results} /> */}
            <div>
                {popularMovies.results?.map((movie: any) => {
                    return (
                        <div>
                            <h2>{movie.title}</h2>
                            <h3>{movie.overview}</h3>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
