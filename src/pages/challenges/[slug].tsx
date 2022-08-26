import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { api } from "lib/axios";
import { IChallenge } from "interfaces/challenges.interface";
import { ChallengeSidebar } from "components/ChallengeSidebar";
import { ChallengePageContainer } from "styles/pages/challengePage";

const CodeEditor = dynamic(() => import("../../components/CodeEditor"), {
  suspense: true,
});

interface ChallengeProps {
  challenge: IChallenge;
}

const Challenge: NextPage<ChallengeProps> = ({ challenge }) => {
  return (
    <ChallengePageContainer>
      <Head>
        <title>{challenge.title} | upskill.code</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={`Loading...`}>
        <CodeEditor challenge={challenge} />
      </Suspense>
      <ChallengeSidebar challenge={challenge} />
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

  const { data } = await api.get(`/challenges/${slug}`);

  return {
    props: {
      session,
      challenge: data,
    },
  };
};

export default Challenge;
