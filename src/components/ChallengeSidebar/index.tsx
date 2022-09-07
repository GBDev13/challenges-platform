import { IChallenge } from "interfaces/challenges.interface";
import { useState } from "react";
import {
  ChallengeSidebarContainer,
  Content,
  InstructionsContainer,
} from "./styles";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";

interface ChallengeSidebarProps {
  challengeTitle: string;
  instructions: string;
}

export function ChallengeSidebar({
  challengeTitle,
  instructions,
}: ChallengeSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();

  function goToHome() {
    router.push("/");
  }

  return (
    <ChallengeSidebarContainer isOpen={isOpen}>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)}>
          <BsFillArrowLeftSquareFill />
        </button>
      )}
      <Content>
        <header>
          <div>
            <button onClick={goToHome}>back to home</button>
            <button onClick={() => setIsOpen(false)}>hide panel</button>
          </div>
          <h1>{challengeTitle}</h1>
        </header>

        <InstructionsContainer
          children={instructions}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={dracula as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </Content>
    </ChallengeSidebarContainer>
  );
}
