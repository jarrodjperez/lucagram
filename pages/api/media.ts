import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const media: Prisma.MediaCreateInput[] = JSON.parse(req.body);

    const savedIds = await Promise.all(
      media.map(async (file) => {
        const savedMedia = await prisma.media.create({ data: file });
        return { id: savedMedia.id };
      })
    );
    res.status(200).json(savedIds);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
