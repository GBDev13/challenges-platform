import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { IChallenge } from "interfaces/challenges.interface";
import { ChallengeSidebar } from "components/ChallengeSidebar";
import { ChallengePageContainer } from "styles/pages/challengePage";
import { prisma } from "lib/prisma";
import { CodeEditor } from "components/CodeEditor";

interface ChallengeProps {
  challenge: IChallenge;
}

const Challenge: NextPage<ChallengeProps> = ({ challenge }) => {
  const [instructions, setInstructions] = useState("");

  return (
    <ChallengePageContainer>
      <Head>
        <title>{`${challenge.title} | upskill.code`}</title>
      </Head>

      <CodeEditor
        embedId={challenge.embedId}
        setInstructions={setInstructions}
      />
      <ChallengeSidebar
        challengeTitle={challenge.title}
        instructions={instructions}
      />
    </ChallengePageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { slug } = context.params as { slug: string };

  const challenge = await prisma.challenge.findUnique({
    where: {
      slug,
    },
  });

  if (!challenge) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      challenge,
    },
  };
};

export default Challenge;
