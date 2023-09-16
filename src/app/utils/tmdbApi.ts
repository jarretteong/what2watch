import { Credits } from "@/interfaces/credits";
import { Movie, MovieRes, Video, VideoRes } from "@/interfaces/movie";
import _ from "lodash";

export const fetchTMDBTrendingMovies = async (): Promise<MovieRes> => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/trending/movie/week?api_key=${process.env.TMDB_APIKEY}`,
        { next: { revalidate: 60 } }
    );
    return await data.json();
};

export const fetchTMDBPopularMovies = async (): Promise<MovieRes> => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/movie/popular?api_key=${process.env.TMDB_APIKEY}`,
        { next: { revalidate: 60 } }
    );
    return await data.json();
};

export const fetchTMDBMovieDetails = async (id: number): Promise<Movie> => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/movie/${id}?api_key=${process.env.TMDB_APIKEY}`,
        { next: { revalidate: 60 } }
    );
    return await data.json();
};

export const fetchTMDBMovieVideos = async (id: number): Promise<VideoRes> => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/movie/${id}/videos?api_key=${process.env.TMDB_APIKEY}`,
        { next: { revalidate: 60 } }
    );
    return await data.json();
};

export const fetchTMDBMovieCredits = async (id: number): Promise<Credits> => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/movie/${id}/credits?api_key=${process.env.TMDB_APIKEY}`,
        { next: { revalidate: 60 } }
    );
    return await data.json();
};

export const fetchTMDBMovieImages = async (id: number, language?: string) => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/movie/${id}/images?api_key=${process.env.TMDB_APIKEY}${
            language ? "&language=" + language : ""
        }`,
        { next: { revalidate: 60 } }
    );
    return await data.json();
};

export const fetchTMDBMovieGenres = async (type?: string) => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/genre/movie/list?api_key=${process.env.TMDB_APIKEY}`,
        { next: { revalidate: 60 } }
    );
    const genresData = await data.json();
    if (type) {
        const genreData = genresData.genres.find(
            (genre: { id: number; name: string }) => _.startCase(genre.name) === _.startCase(type)
        );
        return genreData || genresData.genres;
    }
    return genresData.genres;
};

export const fetchTMDBMoviesByGenreId = async (
    genreId: number,
    page: number = 1
): Promise<MovieRes> => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/discover/movie?api_key=${process.env.TMDB_APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genreId}`,
        { next: { revalidate: 60 } }
    );
    return await data.json();
};

export const fetchTMDBRecommendedMovies = async (
    movieId: number,
    page: number = 1
): Promise<MovieRes> => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/movie/${movieId}/recommendations?api_key=${process.env.TMDB_APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}`,
        { next: { revalidate: 60 } }
    );
    return await data.json();
};

export const fetchTMDBSimilarMovies = async (
    movieId: number,
    page: number = 1
): Promise<MovieRes> => {
    const data = await fetch(
        `${process.env.TMDB_V3_URL}/movie/${movieId}/similar?api_key=${process.env.TMDB_APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}`,
        { next: { revalidate: 60 } }
    );
    return await data.json();
};
