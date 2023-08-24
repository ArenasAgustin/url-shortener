import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;
  const shortUrl = Math.random().toString(36).substring(2, 7);

  try {
    const data = await prisma.link.create({
      data: { shortUrl, url },
    });

    return res.status(200).json(data);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};
