import { Movie, Video } from "@/interfaces/movie";
import _ from "lodash";

export const parseMovieIdQuery = (id: number, title: string) => {
    console.log(id, title);
    return _.toLower(
        `${title
            .replace(/:/g, "")
            .replace(/\s\s?/g, "-")
            .replace(/\&/g, "and")
            .replace(/\W^\-/g, "")}-${id}`
    );
};

export const videoSlidesCount = {
    small: {
        Trailer: 1,
        Clip: 1,
        Featurette: 1,
        BehindTheScenes: 1,
        Teaser: 1,
    },
    medium: {
        Trailer: 2,
        Clip: 2,
        Featurette: 2,
        BehindTheScenes: 2,
        Teaser: 2,
    },
    large: {
        Trailer: 2,
        Clip: 2,
        Featurette: 3,
        BehindTheScenes: 3,
        Teaser: 3,
    },
    xlarge: {
        Trailer: 2,
        Clip: 2,
        Featurette: 3,
        BehindTheScenes: 3,
        Teaser: 3,
    },
};

export const addPlaceholderImagesMovieDetails = async (data: Movie) => {
    if (data.backdrop_path) {
        const src = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
        const buffer = await fetch(src).then(async (res) =>
            Buffer.from(await res.arrayBuffer())
        );
        const base64String = buffer.toString('base64');
        data.backdrop_path_blur = base64String;
    }
    if (data.poster_path) {
        const src = `https://image.tmdb.org/t/p/original${data.poster_path}`;
        const buffer = await fetch(src).then(async (res) =>
            Buffer.from(await res.arrayBuffer())
        );
        const base64String = buffer.toString('base64');
        data.poster_path_blur = base64String;
    }
    return data;
}

export const addPlaceholderImagesVideos = async (data: Video[]): Promise<Video[]> => {
    return (
        await Promise.all(
            data.map(async (video: Video) => {
                if (video.key) {
                    const src = `https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`;
                    const buffer = await fetch(src).then(async (res) =>
                        Buffer.from(await res.arrayBuffer())
                    );
                    const base64String = buffer.toString('base64');
                    return {
                        ...video,
                        blurImage: base64String,
                    };
                }
                return video;
            })
        )
    );
};