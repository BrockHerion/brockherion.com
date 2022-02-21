import Image from "next/image";
import {
  SiGithub,
  SiMysql,
  SiNextdotjs,
  SiReact,
  SiReplit,
  SiRust,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { IoNavigateSharp } from "react-icons/io5";
import PageHeader from "../components/PageHeader";
import PageWrapper from "../components/PageWrapper";
import PageHead from "../components/PageHead";

export default function Projects() {
  return (
    <>
      <PageHead
        title="Project - Brock Herion"
        description="Check out what projects I've built or am currently working on, and the technology that's currently driving them."
      />
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
                Bytes [my weekly newsletter] and Hashnode for fetching my
                featured blog posts.
              </p>
              <div className="mt-2 flex space-x-3">
                <a
                  href="https://github.com/BrockHerion/brockherion.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <SiGithub size="2em" />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-slate-600 p-4 rounded-lg flex flex-col md:flex-row md:items-center">
            <div
              style={{ width: "200px", height: "200px" }}
              className="flex items-center justify-center"
            >
              <Image src="/completeat-logo.png" width={150} height={150} />
            </div>
            <div className="md:ml-4 flex flex-col flex-1">
              <h3 className="text-2xl mb-1">
                Complete Athlete Tracking [Coming soon]
              </h3>
              <span className="mb-2 flex items-center space-x-2">
                <SiReact size="1.4em" color="#61DBFB" />
                <SiNextdotjs size="1.4em" color="black" />
                <SiTypescript size="1.4em" color="#358EF1" />
                <SiTailwindcss size="1.4em" color="#0ea4e9" />
                <SiMysql size="2em" color="#F29111" />
              </span>
              <p>
                Complete Athlete Tracking is a freelance application I've been
                working on to better track athelete physical and mental health.
                Athletes take a survey before and after their practice. Coaches
                get notified if any of their athletes have any unusual values
                (like getting less than 7 hours of sleep for example). This
                project was intially built by me in Java, Angular, and Postgres.
                Unhappy with how that was going, we piovted to using NextJS,
                Typescript, and setup a MySQL database on Planetscale. We will
                be deploying to Vercel and integrating with AWS for some
                background jobs and services. We also have plans to port this to
                React Native and launch on iOS and Android.
              </p>
            </div>
          </div>
          <div className="bg-slate-600 p-4 rounded-lg flex flex-col md:flex-row md:items-center">
            <div
              style={{ width: "200px", height: "200px" }}
              className="flex items-center justify-center"
            >
              <Image src="/ihsggca-logo.png" width={150} height={150} />
            </div>
            <div className="md:ml-4 flex flex-col flex-1">
              <h3 className="text-2xl mb-1">ihsggca.com</h3>
              <span className="mb-2 flex items-center space-x-2">
                <SiReact size="1.4em" color="#61DBFB" />
                <SiNextdotjs size="1.4em" color="black" />
                <SiTypescript size="1.4em" color="#358EF1" />
                <SiTailwindcss size="1.4em" color="#0ea4e9" />
                <SiSupabase size="1.4em" color="#3ECF8E" />
              </span>
              <p>
                ihsggca.com is freelance website I have been working on for the
                Illinois High School Girls Gymnastics Coaches Association. The
                site allows users to setup and renew memberships, view coaching
                clinic information and resources, and find job listings for
                coaching positions. I have also been integrating an admin portal
                for board members to log into to manage members and page
                content. This site is live and we've had great user feedback on
                it! It was built with NextJS and Typescript, hosted on Vercel,
                integrates with Mux video, and uses Supabase Postgres for our
                database.
              </p>
              <div className="mt-2 flex space-x-3">
                <a href="https://ihsggca.com" rel="noreferrer" target="_blank">
                  <IoNavigateSharp size="2em" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </>
  );
}
