import Head from "next/head";
import { FC, ReactNode } from "react";
import { Navbar } from "../ui";

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<LayoutProps> = ({
  children,
  title = "Pokemon App",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Emilio Velasco" />
        <meta
          name="description"
          content={`Information about pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`Information about ${title}`} />
        <meta
          property="og:description"
          content={`This is the page about ${title}`}
        />
        <meta property="og:image" content={`${origin}/images/banner.png`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
