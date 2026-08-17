import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();
const MAX_URL_LENGTH = 2048;

const isHttpUrl = (value: unknown): value is string => {
  if (typeof value !== "string" || value.length === 0 || value.length > MAX_URL_LENGTH) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const url = req.body && typeof req.body === "object" ? req.body.url : undefined;

  if (!isHttpUrl(url)) {
    return res.status(400).json({ message: "A valid http or https URL is required" });
  }

  const shortUrl = randomBytes(6).toString("base64url");

  try {
    const data = await prisma.link.create({
      data: { shortUrl, url },
    });

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
