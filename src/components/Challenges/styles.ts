import styled from "styled-components";

export const ChallengesContainer = styled.section`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 3rem;
  padding: 0 1rem;

  h2 {
    font-size: 2rem;
    color: ${({ theme }) => theme.title};
    margin-bottom: 2rem;
  }

  > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
    gap: 1rem;
  }
`;
