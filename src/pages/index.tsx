import Head from "next/head";
import Image from "next/image";
import NewsletterSignUpForm from "../components/NewsletterSignUpForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen py-2 bg-gray-800">
      <Head>
        <title>Home | Brock Herion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="md:grid md:grid-cols-2 flex flex-col justify-items-stretch bg-green-400 text-gray-900">
        <div
          className="bg-gray-800 2xl:pl-96 xl:pl-72 lg:pl-36 pr-6 md:pl-16 pl-4 py-2"
          style={{ borderRadius: "0 0 80px 0" }}
        >
          <Image src="/code.svg" width={700} height={850} />
        </div>
        <div className="relative">
          <div
            className="bg-gray-800 top-0 left-0 absolute"
            style={{ width: "80px", height: "80px" }}
          ></div>
          <div
            className="2xl:pr-96 xl:pr-72 lg:pr-36 md:pr-16 pr-6 md:pl-14 pl-6 pt-6 bg-green-400 height-full top-0 left-0 relative flex flex-col md:items-end justify-center"
            style={{ borderRadius: "80px 0 0 0" }}
          >
            <h1 className="2xl:text-5xl xl:text-4xl text-3xl mb-3 md:text-right font-source-code-pro">
              Hi 👋
              <br />
              I’m Brock!
            </h1>
            <h2 className="text-2xl mb-3 md:text-right font-source-code-pro">
              I'm a full-stack developer and content creator
            </h2>
            <h3 className="text-lg mb-3 md:text-right font-open-sans">
              On this site, you'll find content relating to the software
              development, along with other areas of a developers life, like
              health and productivity
            </h3>
            <h3 className="text-lg mb-3 md:text-right font-open-sans">
              In <i>The Weekly Retrospective</i>, my weekly newsletter, we
              reflect on the week and share other helpful and interesting
              content. Enter your email below and join a friendly, growing
              community of readers!
            </h3>
            <NewsletterSignUpForm />
          </div>
        </div>
      </div>

      <div
        className="bg-green-400 text-gray-800 pb-2 pt-6 2xl:ml-96 xl:ml-72 lg:ml-36 md:ml-16 ml-6 2xl:pr-96 xl:pr-72 lg:pr-36 md:pr-16 pr-6"
        style={{ borderTopLeftRadius: "80px", borderBottomLeftRadius: "80px" }}
      >
        <div className="ml-6">
          <h2 className="text-2xl mb-3 font-source-code-pro">
            Check out these recent articles 📰
          </h2>
        </div>
        <div className="grid grid-cols-2 ml-6">
          <div>
            <h3 className="text-xl mb-3 font-source-code-pro">
              Popular Catagories
            </h3>
          </div>
          <div>
            <h3 className="text-xl mb-3 font-source-code-pro">
              Featured Articles
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}