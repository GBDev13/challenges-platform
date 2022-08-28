import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { HomePageContainer } from "../styles/pages/homePage";
import { Header } from "components/Header";
import { Challenges } from "components/Challenges";
import { IChallenge } from "interfaces/challenges.interface";
import { prisma } from "lib/prisma";

interface HomeProps {
  challenges: IChallenge[];
}

const Home: NextPage<HomeProps> = ({ challenges }) => {
  return (
    <HomePageContainer>
      <Head>
        <title>Challenges | upskill.code</title>
        <meta
          name="description"
          content="Simple Code Challenge Platform with integrated code editor. Train for your job interviews for free!"
        />
        <meta
          property="og:description"
          content="Simple Code Challenge Platform with integrated code editor. Train for your job interviews for free!"
        />
      </Head>

      <Header />
      <Challenges title="All Challenges" challenges={challenges} />
    </HomePageContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const challenges = await prisma.challenge.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  const parsedChallenges = challenges.map((challenge) => ({
    ...challenge,
    tags: [...challenge.tags.map((tag) => tag.tag)],
  }));

  return {
    props: {
      challenges: parsedChallenges,
    },

    revalidate: 86400,
  };
};

export default Home;
