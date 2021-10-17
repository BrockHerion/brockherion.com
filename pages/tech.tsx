import Head from "next/head";
import React from "react";
import { BsCodeSlash, BsServer } from "react-icons/bs";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
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
        <PageHeader headingText="Technology" />
        <div className="flex flex-col mx-6 mt-6 space-y-4">
          <div className="text-white">
            <h2 className="flex items-center text-4xl">
              <BsCodeSlash className="mr-1" />
              Frontend
            </h2>
            <div className="grid grid-cols-3 mt-4">
              <div>
                <h3 className="text-3xl flex items-center justify-center">
                  <SiNextdotjs className="mr-1" />
                  Next.JS
                </h3>
                <p className="mt-2">
                  I'm a huge fan of React for building web applications. 
                  After spending some time in both Angular and Vue, I settled on React because 
                  I love how easy it is to setup and how quickly it let's you build web apps.
                </p>
                <p className="mt-2">
                  I chose Next as my framework because it's everything I love about React with much more.
                  I provides me with some amazing built in tools and features that let me build apps even faster.
                </p>
              </div>
              <div>
                <h3 className="text-3xl flex items-center justify-center">
                  <SiTailwindcss className="mr-1" />
                  TailwindCSS
                </h3>
              </div>
              <div>
                <h3 className="text-3xl flex items-center justify-center">
                  <SiTypescript className="mr-1" />
                  TypeScript
                </h3>
              </div>
            </div>
          </div>
          <h2 className="flex items-center text-white text-4xl">
            <BsServer className="mr-1" />
            Backend
          </h2>
        </div>
      </PageWrapper>
    </>
  );
}
