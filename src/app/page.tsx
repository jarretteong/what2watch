import Image from "next/image";
import { Inter } from "@next/font/google";
import "./page.scss";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
    const apiUrl = `http://${process.env.API_URL}` || `https://${process.env.VERCEL_URL}`
    const data = await fetch(`${apiUrl}/api/movies/popular`);
    const popularMovies = await data?.json();
    
    return (
        <main className="main">
            {/* <Popular movies={popularMovies.results} /> */}
            <div>
                {popularMovies?.results?.map((movie: any) => {
                    return (
                        <div key={movie.id}>
                            <h2>{movie.title}</h2>
                            <h3>{movie.overview}</h3>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
