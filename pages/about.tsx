import React from "react";
import { BiCodeCurly, BiCoffeeTogo } from "react-icons/bi";
import PageWrapper from "../components/PageWrapper";
import PageHeader from "../components/PageHeader";
import PageHead from "../components/PageHead";

export default function About() {
  return (
    <>
      <PageHead
        title="About - Brock Herion"
        description="Come and get to know me a little bit better! See my journey so far as a software developer and get a peek into my life outside of programming."
      />

      <PageWrapper>
        <PageHeader headingText="About Me 💡" />
        <div className="mt-6 text-white">
          <h2 className="text-4xl mb-8">
            My name is Brock and I'm a full-stack software developer from the
            Chicagoland area.
          </h2>
          <div>
            <h3 className="text-3xl flex items-center mb-3">
              Programming Life <BiCodeCurly className="ml-2" />
            </h3>
            <div className="bg-emerald-500 w-12 h-1 mb-4"></div>
            <p className="text-xl mb-4">
              I've been interested in computers and programming for as long as I
              can remember. A large part of that was growing up playing games
              like Star Wars: Battlefront, Minecraft, and Skyrim. One of my
              earliest memories was looking up a tutorial on how to build a blog
              and watching a video on Ruby on Rails. I was probably about nine
              or ten at the time.
            </p>
            <p className="text-xl mb-4">
              My first project I ever did was eigth grade, where I made a
              top-down shooter in Scratch. It was all drag and drop, but it was
              my first exposure to logic and conditionals. After that, I grew an
              interest in iOS but never did anything with it. I instead pursued
              hardware and building my own PC's.
            </p>
            <p className="text-xl mb-4">
              I took in Java high school. I then pursued game development,
              learning Unity and C#. Still itching to build websites, I took a
              Web Design and JavaScript course in college. Disatissfied with it,
              I taught myself modern JavaScript, TypeScript, and picked up
              Angular for building web apps. I also focused on Java, C#, and
              Python for building backends for my applications.
            </p>
            <p className="text-xl mb-4">
              My current stack revolves around building applications to be fast,
              robust, and scalable. I use C# on the backend for work, but use
              Next.JS for pretty much everything else. I deploy my apps to
              Vercel. For databases, I tend to lean on Supabase or Planetscale
              depending on what kind of application I'm building. I enjoy
              solving problems, not fighting with the tools and technology that
              are supposed to help me solve them.
            </p>
          </div>
          <div>
            <h3 className="text-3xl flex items-center mb-3">
              Personal Life <BiCoffeeTogo className="ml-2" />
            </h3>
            <div className="bg-emerald-500 w-12 h-1 mb-4"></div>
            <p className="text-xl mb-4">
              I'm currently living in the Chicago suburbs with my fiance and our
              three cats. Together, we share our love of Disney, coffee, and
              over-the-top dramatic TV shows. We love taking trips and getting
              to travel with each other. Our wedding is June 4th, 2022 and we
              couldn't be more excited!
            </p>
            <p className="text-xl mb-4">
              Besides programming, my own hobbies include reading and writing I
              love writing in my journal, studying various technologies, writing
              blog posts, and crafting short stories. I enjoy reading science
              fiction books like Dune and Foundation, but also like books on
              startups, finance, and personal growth.
            </p>
            <p className="text-xl mb-4">
              When I have time, I still really enjoy gaming, specifically
              Minecraft. I love getting servers setup to play with my friends
              and just letting my creativity flow. I was also into creating
              texture packs and mods, but haven't done that in a long time.
              Sometimes, I'll play on modded servers, which lets me push the
              boundaries of creativity even further.
            </p>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
