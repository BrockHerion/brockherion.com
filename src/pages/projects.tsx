import Head from "next/head";
import Image from "next/image";
import { SiGithub, SiReplit } from "react-icons/si";
import PageHeader from "../components/PageHeader";
import PageWrapper from "../components/PageWrapper";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects | Brock Herion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <PageHeader headingText="Projects 🔨" />
        <section className="mt-8">
          <h2 className="text-4xl mb-8">
            Just a few neat things I&apos;ve built!
          </h2>
        </section>
        <section className="mt-8">
          <div className="bg-gray-700 p-4 rounded-lg flex flex-col md:flex-row">
            <Image src="/wordle_rs.png" width={189} height={150} />
            <div className="ml-4 flex flex-col flex-1">
              <h3 className="text-2xl">Wordle.rs - Rust</h3>
              <p>
                Wordle.rs is a CLI version of the game Wordle, written in Rust.
                I build this project as a way to start learning and building
                apps in Rust. It plays similar to the web version, with a few
                minor differences. Still a WIP, I have a few more features to
                add to make this version its own, unique thing!
              </p>
              <div className="mt-2 flex space-x-3">
                <a
                  href="https://github.com/BrockHerion/wordle_rs"
                  rel="noreferrer"
                  target="_blank"
                >
                  <SiGithub size="2em" />
                </a>
                <a
                  href="https://replit.com/@BrockHerion/wordlers?v=1"
                  rel="noreferrer"
                  target="_blank"
                >
                  <SiReplit size="2em" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </>
  );
}
