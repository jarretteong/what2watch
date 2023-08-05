import {
    fetchTMDBMovieCredits,
    fetchTMDBMovieImages,
    fetchTMDBMovieVideos,
    fetchTMDBMoviesByGenreId,
} from "@/app/utils/tmdbApi";
import { Credits } from "@/interfaces/credits";
import { Movie, MovieCustom, Video } from "@/interfaces/movie";
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPlaiceholder } from "plaiceholder";

type BlurImageData = {
    blurDataURL: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<BlurImageData>) => {
    try {
      console.log(req.query)
        if (req.query.id) {
            const imageId = req.query.id;
            const src = `https://image.tmdb.org/t/p/w342/${imageId}`;
            const buffer = await fetch(src).then(async (res) =>
                Buffer.from(await res.arrayBuffer())
            );
            // const base64String = buffer.toString('base64');
            const { base64 } = await getPlaiceholder(buffer);

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({
                blurDataURL: base64,
            });
        }
    } catch (err) {
      console.log(err)
    }
};

export default handler;
