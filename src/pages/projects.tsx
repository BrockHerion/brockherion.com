import Head from "next/head";
import Image from "next/image";
import {
  SiGithub,
  SiNextdotjs,
  SiReact,
  SiReplit,
  SiRust,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import PageHeader from "../components/PageHeader";
import PageWrapper from "../components/PageWrapper";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Brock Herion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <PageHeader headingText="Projects 🔨" />
        <section className="mt-8">
          <h2 className="text-4xl mb-8">
            Just a few neat things I&apos;ve built
          </h2>
        </section>
        <section className="mt-8 flex flex-col space-y-4">
          <div className="bg-slate-600 p-4 rounded-lg flex flex-col md:flex-row md:items-center">
            <div
              style={{ width: "200px", height: "200px" }}
              className="flex items-center justify-center"
            >
              <Image src="/wordle_rs.png" width={189} height={150} />
            </div>
            <div className="md:ml-4 flex flex-col flex-1">
              <h3 className="text-2xl mb-1">Wordle.rs</h3>
              <span className="mb-2 flex items-center">
                <SiRust size="1.4em" color="orange" />
              </span>
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
          <div className="bg-slate-600 p-4 rounded-lg flex flex-col md:flex-row md:items-center">
            <div
              style={{ width: "200px", height: "200px" }}
              className="flex items-center justify-center"
            >
              <Image src="/brockherion_com.png" width={150} height={150} />
            </div>
            <div className="md:ml-4 flex flex-col flex-1">
              <h3 className="text-2xl mb-1">brockherion.com</h3>
              <span className="mb-2 flex items-center space-x-2">
                <SiReact size="1.4em" color="#61DBFB" />
                <SiNextdotjs size="1.4em" color="black" />
                <SiTypescript size="1.4em" color="#358EF1" />
                <SiTailwindcss size="1.4em" color="#0ea4e9" />
              </span>
              <p>
                brockherion.com is my personal website that you happen to be
                looking at right now! This site was built with some of my
                favorite technologies, like Next.JS, Typescript, and
                TailwindCSS. It&apos;s currently being hosted on Vercel. This
                site also contains integrations with Revue for Brock&apos;s
                Bytes, my weekly newsletter, and Hashnode for fetching my
                featured blog posts.
              </p>
              <div className="mt-2 flex space-x-3">
                <a
                  href="https://github.com/BrockHerion/wordle_rs"
                  rel="noreferrer"
                  target="_blank"
                >
                  <SiGithub size="2em" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </>
  );
}
