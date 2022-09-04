import {
  ChallengeContainer,
  DifficultyTag,
  TagItem,
  TagsContainer,
} from "./styles";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";
import { IChallenge } from "interfaces/challenges.interface";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

interface ChallengeProps {
  challenge: IChallenge;
}

export function Challenge({ challenge }: ChallengeProps) {
  const router = useRouter();

  function navigateToTag(e: MouseEvent, tag: string) {
    e.preventDefault();
    router.push(`/challenges/tag/${tag}`);
  }

  return (
    <Link href={`/challenges/${challenge.slug}`} passHref>
      <ChallengeContainer>
        <header>
          <DifficultyTag difficulty={challenge.difficulty}>
            {challenge.difficulty}
          </DifficultyTag>
          <BiLinkExternal />
        </header>

        <h3>{challenge.title}</h3>
        <p>{challenge.description}</p>
        <TagsContainer>
          {challenge.tags.map((tag) => (
            <TagItem key={tag.slug} onClick={(e) => navigateToTag(e, tag.slug)}>
              {tag.name}
            </TagItem>
          ))}
        </TagsContainer>
      </ChallengeContainer>
    </Link>
  );
}
