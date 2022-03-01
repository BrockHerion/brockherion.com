import { useRouter } from "next/dist/client/router";
import Head from "next/head";

interface PageHeadProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export default function PageHead({
  title,
  description,
  imageUrl,
}: PageHeadProps) {
  const router = useRouter();

  const meta = {
    title,
    description,
    imageUrl: "/default-og-image.png",
    siteName: "Brock Herion",
    type: "article",
    twitterHandle: "https://twitter.com/brockherion",
    canonicalUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`,
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content="follow, index" />
      <link rel="canonical" href={meta.canonicalUrl} />
      {/* Twitter meta data */}
      <meta name="twitter:card" content="summary" key="twcard" />
      <meta
        name="twitter:creator"
        content={meta.twitterHandle}
        key="twhandle"
      />
      <meta name="twitter:card" content="summary" key="twcard" />
      <meta name="twitter:site" content={meta.canonicalUrl} />
      {/* OpenGraph meta data */}
      <meta name="og:title" content={meta.title} key="ogtitle" />
      <meta name="og:description" content={meta.description} key="ogdesc" />
      <meta name="og:site_name" content={meta.siteName} key="ogsitename" />
      <meta name="og:type" content={meta.type} key="ogtype" />
      <meta
        name="og:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}${meta.imageUrl}`}
        key="ogimage"
      />
      <meta property="og:url" content={meta.canonicalUrl} key="ogurl" />
    </Head>
  );
}
