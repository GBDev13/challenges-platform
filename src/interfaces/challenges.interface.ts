import { Challenge, Tag } from "@prisma/client";

export type ITag = Tag;

export type IChallenge = Challenge & {
  tags: ITag[];
};
