import Head from "next/head";
import React from "react";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiPostgresql, SiCsharp, SiDocker } from "react-icons/si";
import PageHeader from "../components/PageHeader";
import PageWrapper from "../components/PageWrapper";

export default function Tech() {
  return (
    <>
      <Head>
        <title>Tech | Brock Herion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageWrapper>
        <PageHeader headingText="Technology 👨‍💻" />
        <div className="flex flex-col mx-6 mt-6 space-y-4">
          <div className="text-white">
            <h2 className="text-4xl text-center">These are the technologies that I use on a daily basis, either for work or for fun!</h2>
            <div className="grid grid-cols-3 gap-x-6 gap-y-6 mt-6">
              <div>
                <h3 className="text-3xl flex items-center justify-center">
                  <SiNextdotjs className="mr-2" />
                  Next.JS
                </h3>
                <p className="mt-2">
                  After spending some time in React, Angular, and Vue, I settled on React because 
                  I love how easy it is to setup and how quickly it lets you build web apps.
                  Next is my favorite React framework because it's everything I love about React with much more.
                  It provides me with some amazing features that let me build apps even faster.
                </p>
              </div>
              <div>
                <h3 className="text-3xl flex items-center justify-center">
                  <SiTailwindcss className="mr-2" />
                  TailwindCSS
                </h3>
                <p className="mt-2">
                  Before Tailwind any CSS I did was either in Bootstrap, which ended up being heavily modified,
                  or using CSS/SASS stylesheets. Tailwind lets me create beautiful, responsive websites without needing to write a ton
                  of custom CSS. It's my go-to for styling!
                </p>
              </div>
              <div>
                <h3 className="text-3xl flex items-center justify-center">
                  <SiTypescript className="mr-2" />
                  TypeScript
                </h3>
                <p className="mt-2">
                  I never start a web project without TypeScript! Having static type checking in JavaScript is game changing.
                  By being able to catch type errors at compile time rather than run time, we can catch and correct any
                  issues that may arise!
                </p>
              </div>
              <div>
                <h3 className="text-3xl flex items-center justify-center">
                  <SiCsharp className="mr-2" />
                  .NET
                </h3>
                <p className="mt-2">
                  .NET has come a long way since it's conception. Now that it's open source and cross-platform,
                  building applications in .NET has never been easier. .NET is one of my favorite platforms
                  to build backends in and C# is one of my favorite languages to work with.
                </p>
              </div>
              <div>
                <h3 className="text-3xl flex items-center justify-center">
                  <SiPostgresql className="mr-2" />
                  Postgres
                </h3>
                <p className="mt-2">
                  Tried and true, Postgres has been my go-to database since I started building applications.
                  It's fast, reliable, open source, and incredibly powerful. Postgres offers so much in terms of
                  a database and has handled every usecase I've throw at it with ease.
                </p>
              </div>
              <div>
                <h3 className="text-3xl flex items-center justify-center">
                  <SiDocker className="mr-2" />
                  Docker
                </h3>
                <p className="mt-2">
                  Docker is one of my favorite tools for development. It's incredibly easy
                  to spin up and isolate database instances, message brokers, and all kinds of software
                  on my local machine without having to actually install anything. It's an invaluable tool
                  for development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
