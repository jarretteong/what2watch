import _ from "lodash";

export const parseMovieIdQuery = (id: number, title: string) => {
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

export const getPlaceholderImageURL = (url: string) => {
    return `/_next/image?url=${encodeURIComponent(url)}&q=70&w=8`
}

export const fetchNewMovies = async (genreId: number, page: number = 1) => {
    const data = await fetch(
        `/api/movies/genre?id=${genreId}&page=${page}`,
        { next: { revalidate: 60 } }
    );
    return await data.json();
}