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
  SiPrisma,
  SiVercel,
  SiMysql,
} from "react-icons/si";
import { BsCodeSlash, BsServer, BsFillGearFill } from "react-icons/bs";
import PageHeader from "../components/PageHeader";
import PageWrapper from "../components/PageWrapper";

export default function Tech() {
  return (
    <>
      <Head>
        <title>Tech - Brock Herion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageWrapper>
        <PageHeader headingText="Technology 👨‍💻" />
        <div className="flex flex-col mt-6 space-y-6">
          <div className="text-white">
            <h2 className="text-4xl mb-8">
              These are the technologies that I use on a regular basis, either
              for work or for fun
            </h2>
            <div className="md:grid md:grid-cols-3 md:space-y-0 flex flex-col space-y-12 md:gap-x-6 my-6 mx-6 md:mx-0">
              <div className="flex flex-col">
                <h3 className="text-3xl flex items-center mb-3">
                  <BsCodeSlash className="mr-2" />
                  Frontend
                </h3>
                <div className="space-y-3">
                  <div className="bg-emerald-500 w-12 h-1 mb-4"></div>
                  <h4 className="text-3xl flex items-center">
                    <SiReact className="mr-2" />
                    React.JS
                  </h4>
                  <h4 className="text-3xl flex items-center">
                    <SiNextdotjs className="mr-2" />
                    Next.JS
                  </h4>
                  <h4 className="text-3xl flex items-center">
                    <SiTailwindcss className="mr-2" />
                    TailwindCSS
                  </h4>

                  <h4 className="text-3xl flex items-center">
                    <SiTypescript className="mr-2" />
                    TypeScript
                  </h4>

                  <h4 className="text-3xl flex items-center">
                    <SiEslint className="mr-2" />
                    ESLint
                  </h4>

                  <h4 className="text-3xl flex items-center">
                    <SiPrettier className="mr-2" />
                    Prettier
                  </h4>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-3xl flex items-center mb-3">
                  <BsServer className="mr-2" />
                  Backend
                </h3>
                <div className="space-y-3">
                  <div className="bg-emerald-500 w-12 h-1 mb-4"></div>
                  <h4 className="text-3xl flex items-center">
                    <SiCsharp className="mr-2" />
                    C#
                  </h4>
                  <h4 className="text-3xl flex items-center">
                    <SiPython className="mr-2" />
                    Python
                  </h4>
                  <h4 className="text-3xl flex items-center">
                    <SiNodedotjs className="mr-2" />
                    Node.JS
                  </h4>

                  <h4 className="text-3xl flex items-center">
                    <SiJava className="mr-2" />
                    Java
                  </h4>
                  <h4 className="text-3xl flex items-center">
                    <SiPostgresql className="mr-2" />
                    Postgres
                  </h4>
                  <h4 className="text-3xl flex items-center">
                    <SiMysql className="mr-2" />
                    MySQL
                  </h4>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-3xl flex items-center mb-3">
                  <BsFillGearFill className="mr-2" />
                  Other Tools
                </h3>
                <div className="space-y-3">
                  <div className="bg-emerald-500 w-12 h-1 mb-4"></div>
                  <h4 className="text-3xl flex items-center">
                    <SiVercel className="mr-2" />
                    Vercel
                  </h4>
                  <h4 className="text-3xl flex items-center">
                    <SiDocker className="mr-2" />
                    Docker
                  </h4>
                  <h4 className="text-3xl flex items-center">
                    <SiGit className="mr-2" />
                    Git
                  </h4>

                  <h4 className="text-3xl flex items-center">
                    <SiAmazonaws className="mr-2" />
                    AWS
                  </h4>
                  <h4 className="text-3xl flex items-center">
                    <SiGnubash className="mr-2" />
                    BASH
                  </h4>
                  <h4 className="text-3xl flex items-center">
                    <SiPrisma className="mr-2" />
                    Prisma
                  </h4>
                </div>
              </div>
            </div>

            <p className="text-2xl mb-3">
              And of course I wouldn't be able to get anything done without my
              favorite development tool of all, a delicous, fresh cup of coffee
              ☕
            </p>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
