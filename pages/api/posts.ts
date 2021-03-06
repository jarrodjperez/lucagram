import type { NextApiRequest, NextApiResponse } from "next";
import { Post, Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const post: Prisma.PostCreateInput = JSON.parse(req.body);
      const savedPost = await prisma.post.create({
        data: post,
      });
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(400).json({ message: "Something went wrong" });
    }
  } else if (req.method === "GET") {
    try {
      const posts: Post[] = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { media: true, author: true },
      });
      res.status(200).json(posts);
    } catch (err) {
      res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
