import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;
  const shortUrl = Math.random().toString(36).substring(2, 7);

  res.status(200).json({ shortUrl, url });
};
