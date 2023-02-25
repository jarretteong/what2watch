import _ from "lodash";

export const parseMovieIdQuery = (id: number, title: string) => {
    return _.toLower(
        `${title.replace(/:/g, "").replace(/\s\s?/g, "-").replace(/\W^\-/g, "")}-${id}`
    );
};
