import { ChallengeContainer, DifficultyTag, TagsContainer } from "./styles";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";
import { IChallenge } from "interfaces/challenges.interface";

interface ChallengeProps {
  challenge: IChallenge;
}

export function Challenge({ challenge }: ChallengeProps) {
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
            <li key={tag.slug}>{tag.name}</li>
          ))}
        </TagsContainer>
      </ChallengeContainer>
    </Link>
  );
}
