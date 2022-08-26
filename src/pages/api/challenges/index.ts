import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const challenges = await prisma.challenge.findMany({
        include: {
          tags: true,
        },
      });

      return res.status(200).json(challenges);
    default:
      return res.status(405).send("Method not allowed");
  }
}
