import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const user: Prisma.UserUpdateInput = JSON.parse(req.body);
    const savedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: user,
    });
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
