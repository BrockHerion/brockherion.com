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
    imageUrl: imageUrl ? imageUrl : "/default-og-image.png",
    siteName: "Brock Herion",
    type: "article",
    twitterHandle: "@brockherion",
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
      <meta name="twitter:site" content={meta.twitterHandle} />
      <meta name="twitter:creator" content={meta.twitterHandle} />
      {/* OpenGraph meta data */}
      <meta property="og:title" content={meta.title} key="ogtitle" />
      <meta property="og:description" content={meta.description} key="ogdesc" />
      <meta property="og:site_name" content={meta.siteName} key="ogsitename" />
      <meta property="og:type" content={meta.type} key="ogtype" />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}${meta.imageUrl}`}
        key="ogimage"
      />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="840" />
      <meta property="og:url" content={meta.canonicalUrl} key="ogurl" />
    </Head>
  );
}
