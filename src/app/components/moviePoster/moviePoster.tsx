import { Genre, Movie, MovieCustom } from "@/interfaces/movie";
import styles from "./styles/moviePoster.module.scss";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import BlurImage from "../BlurImage/BlurImage";
import MovieVideosClient from "../movieVideos/MovieVideosClient";
import _ from "lodash";

type GenreProps = {
    genre: Genre;
    movieList: Movie[];
    setSelectedMovie: any;
    setOpen: any;
    setActiveSlide: any;
    hasNextPage: boolean | undefined;
    isFetching: boolean;
    fetchNextPage: any;
    selectedMovie: MovieCustom | undefined;
    open: boolean;
    setSlidesPerView: any;
};

const MoviePoster: React.FunctionComponent<GenreProps> = ({
    genre,
    movieList,
    setSelectedMovie,
    selectedMovie,
    open,
    setOpen,
    setActiveSlide,
    hasNextPage,
    isFetching,
    fetchNextPage,
    setSlidesPerView,
}: GenreProps) => {
    return (
        <div className={styles.genrePosterContainer}>
            <div className={styles.genreTypeWrapper}>
                <h3 className={styles.genre}>
                    {genre.name}{" "}
                    <svg width="10px" height="10px" viewBox="0 0 10 16" aria-hidden="true">
                        <path
                            d="m2.6 15.6c-.3.3-.6.4-1 .4-.9 0-1.6-.7-1.6-1.5 0-.4.2-.8.5-1.1l5.9-5.4-5.9-5.4c-.3-.3-.5-.7-.5-1.1 0-.9.7-1.5 1.6-1.5.4 0 .7.1 1 .4l6.8 6.4c.4.4.6.7.6 1.2s-.2.8-.6 1.2z"
                            opacity="0.95"
                        ></path>
                    </svg>
                </h3>
            </div>
            <ReactSwiper
                className={styles.genreSwiper}
                breakpoints={{
                    1: {
                        slidesPerView: 2.2,
                        spaceBetween: 18,
                    },
                    480: {
                        slidesPerView: 3.2,
                        spaceBetween: 18,
                    },
                    768: {
                        slidesPerView: 4.3,
                        spaceBetween: 24,
                    },
                    1200: {
                        slidesPerView: 5.3,
                        spaceBetween: 30,
                    },
                    1440: {
                        slidesPerView: 6.3,
                        spaceBetween: 30,
                    },
                }}
                onClick={(swiper) => {
                    setSelectedMovie(movieList?.[swiper.clickedIndex] || _.first(movieList));
                    setOpen(true);
                }}
                onSlideChange={async (swiper) => {
                    setActiveSlide(swiper.activeIndex);
                    if (movieList.length - swiper.activeIndex <= 20 && hasNextPage && !isFetching) {
                        await fetchNextPage();
                    }
                }}
                onSwiper={(s) => {
                    setSlidesPerView(
                        _.isNumber(s.params.slidesPerView) ? s.params.slidesPerView : 1
                    );
                    setActiveSlide(s.activeIndex);
                    setSelectedMovie(movieList?.[s.activeIndex] || _.first(movieList));
                }}
            >
                {movieList.length > 0
                    ? movieList.map((movie: any, index: number) => {
                          return (
                              <SwiperSlide key={movie.id} className={styles.slide}>
                                  <div className={styles.backdropImageWrapper}>
                                      <BlurImage
                                          className={styles.slideImage}
                                          id={movie.poster_path}
                                          alt={movie.title}
                                          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                          onClick={() => setActiveSlide(index)}
                                          placeholder="blur"
                                      />
                                  </div>
                                  {/* <img
                        className={styles.slideImage}
                        alt={movie.title}
                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                        onClick={() => setActiveSlide(index)}
                    /> */}
                              </SwiperSlide>
                          );
                      })
                    : null}
            </ReactSwiper>
            {selectedMovie ? (
                <MovieVideosClient movieDetails={selectedMovie} open={open} setOpen={setOpen} />
            ) : null}
            <div className={styles.divider}></div>
        </div>
    );
};

export default MoviePoster;
