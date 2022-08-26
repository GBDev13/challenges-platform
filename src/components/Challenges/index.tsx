import { Challenge } from "components/Challenge";
import { IChallenge } from "interfaces/challenges.interface";
import { ChallengesContainer } from "./styles";

interface ChallengesProps {
  challenges: IChallenge[];
}

export function Challenges({ challenges }: ChallengesProps) {
  return (
    <ChallengesContainer>
      {challenges.map((challenge) => (
        <Challenge key={challenge.id} challenge={challenge} />
      ))}
    </ChallengesContainer>
  );
}
