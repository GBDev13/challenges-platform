import styled from "styled-components";
import { rgba } from "polished";

interface DifficultyTagProps {
  difficulty: "Easy" | "Medium" | "Hard";
}

const difficultyColors = {
  Easy: "primary",
  Medium: "orange",
  Hard: "red",
} as const;

export const ChallengeContainer = styled.a`
  width: 100%;
  background: ${({ theme }) => theme.shape};
  padding: 2rem 1.5rem;
  border-radius: 5px;
  transition: 0.4s;
  border: 0.5px solid transparent;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      font-size: 1.5rem;
      transition: 0.4s;
    }
  }

  h3 {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.title};
    margin-top: 1.2rem;
  }

  p {
    margin-top: 0.5rem;
    font-size: 0.95rem;
  }

  &:hover {
    transform: translateY(-0.5rem);
    border-color: ${({ theme }) => rgba(theme.primary, 0.5)};
    box-shadow: 0px 3px 9px 3px ${({ theme }) => rgba(theme.primary, 0.05)};

    li,
    svg {
      color: ${({ theme }) => theme.primary};
      opacity: 1;
    }
  }
`;

export const TagsContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;

  li {
    font-size: 0.9rem;
    opacity: 0.7;
    font-family: "Fira Code";
    transition: 0.4s;
  }
`;

export const DifficultyTag = styled.span<DifficultyTagProps>`
  background: ${({ theme, difficulty }) => theme[difficultyColors[difficulty]]};
  color: ${({ theme }) => theme.background};
  font-family: "Fira Code";
  padding: 0.15rem 0.8rem;
  border-radius: 3px;
`;
