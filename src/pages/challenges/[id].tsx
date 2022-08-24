import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { HomePageContainer } from "../../styles/pages/homePage";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

const CodeEditor = dynamic(() => import("../../components/CodeEditor"), {
  suspense: true,
});

const Challenge: NextPage = () => {
  return (
    <HomePageContainer>
      <Head>
        <title>Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={`Loading...`}>
        <CodeEditor />
      </Suspense>
    </HomePageContainer>
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

  return {
    props: {
      session,
    },
  };
};

export default Challenge;
