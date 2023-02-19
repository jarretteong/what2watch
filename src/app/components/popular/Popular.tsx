import React from "react";
import PropTypes from "prop-types";

const Popular = ({ movies }: any) => {
    return (
        <div>
            {movies.map((movie: any) => {
                <div>
                    <h2>{movie.title}</h2>
                    <h3>{movie.overview}</h3>
                </div>;
            })}
        </div>
    );
};

Popular.propTypes = {
    movies: PropTypes.array,
};

export default Popular;
