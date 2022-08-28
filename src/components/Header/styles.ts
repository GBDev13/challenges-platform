import styled from "styled-components";

export const HeaderContainer = styled.header`
  height: 6rem;
  box-shadow: 0 10px 30px -10px ${({ theme }) => theme.shadow};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;

  > a {
    color: ${({ theme }) => theme.primary};
    font-family: "Fira Code";
    font-weight: 400;
    font-size: 1.5rem;
  }
`;
