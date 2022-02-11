import Head from "next/head";
import Image from "next/image";
import NewsletterSignUpForm from "../components/NewsletterSignUpForm";
import PageWrapper from "../components/PageWrapper";
import { getGetLatestPosts, getPoplularPosts, Post } from "../utils/mdxUtils";
import PopularPosts from "../components/PopularPosts";
import RecentPosts from "../components/RecentPosts";

interface HomeProps {
  newPosts: Post[];
  popularPosts: Post[];
}

export default function Home({ newPosts, popularPosts }: HomeProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Head>
        <title>Home - Brock Herion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <section className="md:grid md:grid-cols-2 md:gap-x-6 flex flex-col justify-items-stretch text-white">
          <div className="">
            <Image src="/code.svg" width={700} height={850} />
          </div>
          <div className="height-full flex flex-col md:items-end justify-center">
            <div className=" flex flex-col md:items-end">
              <h1 className="text-5xl ">Hey there 👋</h1>
              <div className="w-16 h-2 mt-4 bg-emerald-500"></div>
            </div>

            <h2 className="text-4xl mt-6 mb-3 md:text-right ">
              I'm Brock and I'm a software developer
            </h2>
            <h3 className="text-2xl mt-4 mb-3 md:text-right ">
              On this site, you&apos;ll find content relating to programming and
              full-stack development. You&apos;ll also get to know a little bit
              more about me and get to see some of the cool things I&apos;ve
              worked on
            </h3>
          </div>
        </section>
      </PageWrapper>

      <section className="relative z-10 mb-6 text-gray-800">
        <div
          className="
						before:absolute 
						before:bg-emerald-500 
						before:left-0 before:top-0 
						before:h-full before:right-0
						before:-z-10"
        >
          <div className="2xl:px-96 xl:px-72 lg:px-36 md:px-16 px-4 py-12">
            <div>
              <h3 className="text-3xl mb-3 font-bold tracking-wider">
                Subscribe to my newsletter 💌
              </h3>
              <div className="bg-gray-800 w-12 h-1 mb-6"></div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-6 flex flex-col">
              <div>
                <p className="text-xl mb-3">
                  In Brock&apos;s Bytes - my weekly newsletter - I share tips
                  related to full-stack software development and give advice on
                  managing a healthy, productive life while having a career in
                  programming. Whether you&apos;re a senior developer,
                  freelancer, or you&apos;re just getting started, there's
                  something here for everyone!
                </p>
              </div>
              <div>
                <p className="text-2xl mb-3 md:text-center">
                  Sign up now to join a growing community of friendly readers!
                </p>
                <NewsletterSignUpForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageWrapper>
        <section>
          <h3 className="text-white text-3xl mb-3 font-bold tracking-wider">
            Check out my blog ✍️
          </h3>
          <div className="bg-emerald-500 w-12 h-1 mb-6"></div>
          <PopularPosts popularPosts={popularPosts} />
          <RecentPosts newPosts={newPosts} />
        </section>
      </PageWrapper>
    </div>
  );
}

export async function getStaticProps() {
  const newPosts = getGetLatestPosts(5);
  const popularPosts = getPoplularPosts(3);

  return {
    props: {
      newPosts,
      popularPosts,
    },
  };
}
