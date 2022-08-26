import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  switch (req.method) {
    case "GET":
      if (!slug || typeof slug !== "string") {
        return res.status(400).send("Invalid challenge slug");
      }

      const challenge = await prisma.challenge.findUnique({
        where: {
          slug,
        },
        include: {
          tags: true,
        },
      });

      return res.status(200).json(challenge);
    default:
      return res.status(405).send("Method not allowed");
  }
}
