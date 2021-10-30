import Head from "next/head";
import Image from "next/image";
import NewsletterSignUpForm from "../components/NewsletterSignUpForm";
import PageWrapper from "../components/PageWrapper";
import client from "../utils/apollo-client";
import { gql } from "@apollo/client";
import { SiHashnode } from "react-icons/si";
import { BsServer } from "react-icons/bs";
import ArticleCard from "../components/ArticleCard";

interface HomeProps {
  featuredArticle: HashnodeArticle;
}

export default function Home({ featuredArticle }: HomeProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Head>
        <title>Home | Brock Herion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <div className="md:grid md:grid-cols-2 md:gap-x-6 flex flex-col justify-items-stretch text-white">
          <div className="">
            <Image src="/code.svg" width={700} height={850} />
          </div>
          <div className="height-full flex flex-col md:items-end justify-center">
            <div className=" flex flex-col md:items-end">
              <h1 className="text-5xl font-source-code-pro">Hey there 👋</h1>
              <div className="w-16 h-2 mt-4 bg-green-400"></div>
            </div>

            <h2 className="text-4xl mt-6 mb-3 md:text-right font-source-code-pro">
              I'm Brock! I'm a software developer and I'm sharing my journey
              with others
            </h2>
          </div>
        </div>
      </PageWrapper>
      <div
        className="
          bg-green-400 
          text-gray-800 
          py-6
          2xl:ml-90 2xl:pl-16
          xl:ml-56 xl:pl-16 
          lg:ml-28 lg:pl-8 
          md:ml-10 md:pl-6
          pl-4
          2xl:pr-96 
          xl:pr-72 
          lg:pr-36 
          md:pr-16 
          pr-6"
        style={{ borderTopLeftRadius: "80px", borderBottomLeftRadius: "80px" }}
      >
        <div>
          <h3 className="text-3xl mb-3 font-source-code-pro">
            Subcribe to my newsletter 📰
          </h3>
          <div className="bg-gray-800 w-12 h-1 mb-4"></div>
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-x-6 flex flex-col">
          <div>
            <p className="text-2xl mb-3">
              The Weekly Retrospective is a newsletter about taking what
              happened durning the week and reflecting on it. In it, we discuss
              things related to technology, challenges that were overcome, and
              more!
            </p>
          </div>
          <div>
            <p className="text-2xl mb-3 text-center">
              Sign up now to join a growing community of friendly readers!
            </p>
            <NewsletterSignUpForm />
          </div>
        </div>
      </div>
      <PageWrapper>
        <h3 className="text-white text-2xl mb-3 font-source-code-pro">
          Check out my blog ✍️
        </h3>
        <div className="bg-green-400 w-12 h-1 mb-6"></div>
        <div className="md:grid md:grid-cols-2 md:gap-x-10 flex flex-col space-y-6">
          <div>
            <h4 className="text-white text-xl mb-3 font-source-code-pro">
              Popular Series 📚
            </h4>
            <div className="flex flex-col">
              <a
                href="https://blog.brockherion.dev/series/backend-development"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg ring-4 ring-green-400 ring-opacity-50 text-white p-3 text-lg flex items-center justify-between"
              >
                Backend Development
                <BsServer />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white text-xl mb-3 font-source-code-pro">
              Featured Post 🌟
            </h4>
            <ArticleCard article={featuredArticle} />
          </div>
        </div>
        <h4 className="text-white text-lg mt-6 font-source-code-pro flex items-center justify-center">
          Proud member of&nbsp;
          <a
            className="underline"
            href="https://hashnode.com/@brockherion"
            target="_blank"
            rel="noreferrer"
          >
            Hashnode
          </a>
          <SiHashnode className="ml-2" />
        </h4>
      </PageWrapper>
    </div>
  );
}

const FEATURED_QUERY = gql`
  query {
    post(
      slug: "designing-and-building-rest-apis-for-other-humans"
      hostname: ""
    ) {
      cuid
      slug
      title
      brief
      reactions {
        reaction {
          name
          image
        }
        count
      }
    }
  }
`;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: FEATURED_QUERY,
  });

  return {
    props: {
      featuredArticle: data.post,
    },
  };
}
