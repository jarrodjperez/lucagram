import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
