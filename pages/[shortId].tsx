import { PrismaClient } from "@prisma/client";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

export default function ShortIdPage() {
  return (
    <div>
      <h1>ShortId</h1>
      <p>ShortId</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();
  const { shortId }: any = params;

  const data = await prisma.link.findUnique({
    where: {
      shortUrl: shortId,
    },
  });

  if (!data) return { redirect: { destination: "/", permanent: false } };

  return {
    redirect: {
      destination: data.url,
      permanent: false,
    },
  };
};
