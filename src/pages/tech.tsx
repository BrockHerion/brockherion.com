import Head from "next/head";
import React from "react";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPostgresql,
  SiCsharp,
  SiDocker,
  SiPython,
  SiNodedotjs,
  SiGit,
  SiReact,
  SiAmazonaws,
  SiGnubash,
  SiJava,
  SiPrettier,
  SiEslint,
} from "react-icons/si";
import { BsCodeSlash, BsServer, BsFillGearFill } from "react-icons/bs";
import { GiCoffeeCup } from "react-icons/gi";
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
        <div className="flex flex-col mx-6 mt-6 space-y-6">
          <div className="text-white">
            <h2 className="text-4xl mb-8">
              These are the technologies that I use on a regular basis, either
              for work or for fun!
            </h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-4 my-6">
              <div className="flex flex-col items-center">
                <h3 className="text-3xl flex items-center justify-center mb-3">
                  <BsCodeSlash className="mr-2" />
                  Frontend
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-400 w-12 h-1 mb-4"></div>
                  <h4 className="text-2xl flex items-center">
                    <SiReact className="mr-2" />
                    React.JS
                  </h4>
                  <h4 className="text-2xl flex items-center">
                    <SiNextdotjs className="mr-2" />
                    Next.JS
                  </h4>

                  <h4 className="text-2xl flex items-center">
                    <SiTailwindcss className="mr-2" />
                    TailwindCSS
                  </h4>

                  <h4 className="text-2xl flex items-center">
                    <SiTypescript className="mr-2" />
                    TypeScript
                  </h4>

                  <h4 className="text-2xl flex items-center">
                    <SiEslint className="mr-2" />
                    ESLint
                  </h4>

                  <h4 className="text-2xl flex items-center">
                    <SiPrettier className="mr-2" />
                    Prettier
                  </h4>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-3xl flex items-center justify-center mb-3">
                  <BsServer className="mr-2" />
                  Backend
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-400 w-12 h-1 mb-4"></div>
                  <h4 className="text-2xl flex items-center">
                    <SiCsharp className="mr-2" />
                    C#
                  </h4>
                  <h4 className="text-2xl flex items-center">
                    <SiPython className="mr-2" />
                    Python
                  </h4>

                  <h4 className="text-2xl flex items-center">
                    <SiNodedotjs className="mr-2" />
                    Node.JS
                  </h4>

                  <h4 className="text-2xl flex items-center">
                    <SiJava className="mr-2" />
                    Java
                  </h4>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-3xl flex items-center justify-center mb-3">
                  <BsFillGearFill className="mr-2" />
                  Other Tools
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-400 w-12 h-1 mb-4"></div>
                  <h4 className="text-2xl flex items-center">
                    <SiPostgresql className="mr-2" />
                    Postgres
                  </h4>

                  <h4 className="text-2xl flex items-center">
                    <SiDocker className="mr-2" />
                    Docker
                  </h4>

                  <h4 className="text-2xl flex items-center">
                    <SiGit className="mr-2" />
                    Git
                  </h4>

                  <h4 className="text-2xl flex items-center">
                    <SiAmazonaws className="mr-2" />
                    AWS
                  </h4>
                  <h4 className="text-2xl flex items-center">
                    <SiGnubash className="mr-2" />
                    BASH
                  </h4>
                </div>
              </div>
            </div>

            <p className="text-3xl mb-3">
              And of course, I wouldn't be able to get anything done without my favorite
              development tool of all:
            </p>

              <p className="text-3xl flex items-center">
                A delicous, fresh cup of coffee <GiCoffeeCup className="ml-2" />
              </p>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
