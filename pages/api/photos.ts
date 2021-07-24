import type { NextApiRequest, NextApiResponse } from "next";
import { Media } from "@prisma/client";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const photos: Media[] = await prisma.media.findMany({
        orderBy: { createdAt: "desc" },
        where: { type: "image/jpeg" },
      });
      res.status(200).json(photos);
    } catch (err) {
      res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
