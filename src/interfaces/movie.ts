import { Credits } from "./credits";

export interface MovieRes {
    page: number;
    results: MovieCustom[];
    total_pages: number;
    total_results: number;
}

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    backdrop_path_blur?: string;
    belongs_to_collection: any;
    budget: number;
    genres: MovieGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    poster_path_blur?: string;
    production_companies: any[];
    production_countries: any[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: any[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieGenre {
    id: number;
    name: string;
}

export interface MovieCustom extends Movie {
    trailer?: Video;
    images?: any[];
    videos?: Video[];
    credits?: Credits;
}

export interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: Date;
    id: string;
    blurImage?: string;
}

export interface VideoRes {
    id: number,
    results: Video[],
}

export interface ImageData {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
    blur_file_path?: string;
}

export interface Genre {
    id: number;
    name: string;
}