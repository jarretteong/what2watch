import { Movie } from "@/interfaces/movie";

export const fetchTMDBTrendingMovies = async () => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/trending/movie/week?api_key=${process.env.TMDB_APIKEY}`
    );
    return await data.json();
};

export const fetchTMDBPopularMovies = async () => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/movie/popular?api_key=${process.env.TMDB_APIKEY}`
    );
    return await data.json();
};

export const fetchTMDBMovieDetails = async (id: number): Promise<Movie> => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/movie/${id}?api_key=${process.env.TMDB_APIKEY}`
    );
    return await data.json();
};

export const fetchTMDBMovieVideos = async (id: number) => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/movie/${id}/videos?api_key=${process.env.TMDB_APIKEY}`
    );
    return await data.json();
};

export const fetchTMDBMovieCredits = async (id: number) => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/movie/${id}/credits?api_key=${process.env.TMDB_APIKEY}`
    );
    return await data.json();
};

export const fetchTMDBMovieImages = async (id: number, language?: string) => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/movie/${id}/images?api_key=${process.env.TMDB_APIKEY}${language ? '&language=' + language : ''}`
    );
    return await data.json();
}