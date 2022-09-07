import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { HomePageContainer } from "../../../styles/pages/homePage";
import { Header } from "components/Header";
import { Challenges } from "components/Challenges";
import { IChallenge } from "interfaces/challenges.interface";
import { Tag as ITag } from "@prisma/client";
import { useRouter } from "next/router";
import { Spinner } from "components/Spinner";
import { prisma } from "lib/prisma";

interface TagProps {
  challenges: IChallenge[];
  tag: ITag;
}

const Tag: NextPage<TagProps> = ({ challenges, tag }) => {
  const { isFallback } = useRouter();

  if (isFallback) return <Spinner />;

  return (
    <HomePageContainer>
      <Head>
        <title>{`${tag.name} Challenges | upskill.code`}</title>
        <meta
          name="description"
          content={`${tag.name} online challenges. Train for your job interviews for free!`}
        />
        <meta
          property="og:description"
          content={`${tag.name} online challenges. Train for your job interviews for free!`}
        />
      </Head>

      <Header />
      <Challenges title={`${tag.name} Challenges`} challenges={challenges} />
    </HomePageContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await prisma.tag.findMany();

  const paths = tags.map((tag) => ({
    params: { slug: tag.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };

  const tag = await prisma.tag.findUnique({
    where: {
      slug,
    },
  });

  if (!tag) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const challenges = await prisma.challenge.findMany({
    where: {
      tags: {
        some: {
          tagId: tag.id,
        },
      },
    },
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
      tag,
    },

    revalidate: 86400,
  };
};

export default Tag;
