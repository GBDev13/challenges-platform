import styled, { css } from "styled-components";
import ReactMarkdown from "react-markdown";

interface ChallengeSidebarProps {
  isOpen: boolean;
}

export const ChallengeSidebarContainer = styled.aside<ChallengeSidebarProps>`
  height: 100%;
  width: 2rem;
  transition: 0.4s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme["shape-dark"]};
  padding: 1rem;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.shape};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme["shape-light"]};
  }

  > button {
    background: none;
    color: ${({ theme }) => theme.title};
    border: none;
    font-size: 1.2rem;
    transition: 0.4s;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      overflow-x: hidden;
      overflow-y: auto;
      width: 30rem;
      > section {
        opacity: 1;
      }
    `}
`;

export const Content = styled.section`
  flex: 1;
  opacity: 0;
  transition: 0.2s;
  width: 100%;

  header {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
      align-self: flex-end;
      border-bottom: 1px solid ${({ theme }) => theme["shape-light"]};
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      width: 100%;
    }

    h1 {
      color: ${({ theme }) => theme.title};
    }

    button {
      background: ${({ theme }) => theme["shape-light"]};
      border: none;
      color: ${({ theme }) => theme.title};
      font-family: "Fira Code";
      padding: 0.3rem 0.5rem;
      transition: 0.4s;

      &:hover {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme["shape-light"]};
      }
    }
  }
`;

export const InstructionsContainer = styled(ReactMarkdown)`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  img {
    width: 100%;
    object-fit: cover;
  }

  a {
    color: ${({ theme }) => theme.primary};
  }

  ul,
  ol {
    padding-left: 1rem;
  }

  font-size: 0.95rem;
`;
