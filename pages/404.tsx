import PageHead from "../components/PageHead";
import PageWrapper from "../components/PageWrapper";

export default function Custom404() {
  return (
    <>
      <PageHead title="404 Not Found - Brock Herion" description="" />
      <PageWrapper>
        <h1 className="text-5xl md:pt-36 pt-12 m-auto text-center">
          404 - Not found
        </h1>
        <h2 className="text-4xl pt-6 m-auto text-center">
          Apologies, it looks like this page doesn&apos;t exist 🙁
        </h2>
      </PageWrapper>
    </>
  );
}
