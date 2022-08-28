import { Challenge } from "components/Challenge";
import { IChallenge } from "interfaces/challenges.interface";
import { ChallengesContainer } from "./styles";

interface ChallengesProps {
  title: string;
  challenges: IChallenge[];
}

export function Challenges({ title, challenges }: ChallengesProps) {
  return (
    <ChallengesContainer>
      <h2>{title}</h2>
      <div>
        {challenges.map((challenge) => (
          <Challenge key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </ChallengesContainer>
  );
}
