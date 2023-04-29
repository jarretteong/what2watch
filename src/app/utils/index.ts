import _ from "lodash";

export const parseMovieIdQuery = (id: number, title: string) => {
    return _.toLower(
        `${title.replace(/:/g, "").replace(/\s\s?/g, "-").replace(/\W^\-/g, "")}-${id}`
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
}