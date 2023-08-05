// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
    fetchTMDBMovieCredits,
    fetchTMDBMovieImages,
    fetchTMDBMovieVideos,
    fetchTMDBMoviesByGenreId,
} from "@/app/utils/tmdbApi";
import { Credits } from "@/interfaces/credits";
import { ImageData, MovieCustom, Video } from "@/interfaces/movie";
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

type GenreMovieData = {
    data: MovieCustom[];
    page: number;
    nextPage: number | null;
    prevPage: number | null;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

type GenreMovieError = {
    error: string;
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<GenreMovieData | GenreMovieError>
) => {
    if (req.query.id) {
        const genreId =
            _.isArray(req.query.id) && req.query.id.length > 0
                ? _.first(req.query.id)
                : req.query.id;
        const page = +req.query.page!;
        const movies = await fetchTMDBMoviesByGenreId(+genreId!, page);
        const genreMovies = await Promise.all(
            movies.results.map(async (movie: any, index: number) => {
                const videos = await fetchTMDBMovieVideos(movie.id);
                const images = await fetchTMDBMovieImages(movie.id);
                const movieCredits: Credits = await fetchTMDBMovieCredits(movie.id);

                // if (index <= 5) {
                //     // videos.results = await addPlaceholderImagesVideos(videos.results);
                //     movie = await addPlaceholderImagesMovieDetails(movie);
                // }

                let filteredImages: any = {};
                if (images) {
                    _.keys(images)
                        .filter((key) => key === "id" || key === "backdrops" || key === "posters")
                        .forEach((key) => {
                            if (_.isArray(images[key])) {
                                filteredImages[key] = images[key].filter(
                                    (image: ImageData) => image.iso_639_1 === "en"
                                );
                            } else if (key === "id") {
                                filteredImages[key] = images[key];
                            }
                            return null;
                        });
                }
                const officialTrailer = _.first(
                    videos.results.filter((video: Video) => video.type === "Trailer")
                );
                return {
                    ...movie,
                    ...filteredImages,
                    images: {
                        ...filteredImages,
                    },
                    videos: videos.results,
                    trailer: officialTrailer,
                    credits: movieCredits,
                };
            })
        );

        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.status(200).json({
            data: genreMovies,
            page: movies.page,
            nextPage: movies.page === movies.total_pages ? null : movies.page + 1,
            prevPage: page - 1 > 0 ? page - 1 : null,
            hasNextPage: movies.page !== movies.total_pages,
            hasPrevPage: movies.page !== 1,
        });
    }
    return res.status(500).json({
        error: "Genre ID required.",
    });
};

export default handler;
