// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
    console.log(req)
    const data = await fetch(`${process.env.TMDB_V3_URL}/movie/popular?api_key=${process.env.TMDB_APIKEY}`);
    const popularMovies = await data.json();
    res.status(200).json(popularMovies);
}

export default handler;