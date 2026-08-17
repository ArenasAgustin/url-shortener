import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";

const prisma = new PrismaClient();
const SHORT_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

const isHttpUrl = (value: unknown): value is string => {
  if (typeof value !== "string" || value.length === 0 || value.length > 2048) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export default function ShortIdPage() {
  return (
    <div>
      <h1>ShortId</h1>
      <p>ShortId</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const shortId = params?.shortId;

  if (typeof shortId !== "string" || !SHORT_ID_PATTERN.test(shortId)) {
    return { redirect: { destination: "/", permanent: false } };
  }

  try {
    const data = await prisma.link.findUnique({
      where: {
        shortUrl: shortId,
      },
    });

    if (!data || !isHttpUrl(data.url)) {
      return { redirect: { destination: "/", permanent: false } };
    }

    return {
      redirect: {
        destination: data.url,
        permanent: false,
      },
    };
  } catch {
    return { redirect: { destination: "/", permanent: false } };
  }
};
