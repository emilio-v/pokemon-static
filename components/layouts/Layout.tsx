import Head from "next/head";
import { FC, ReactNode } from "react";
import { Navbar } from "../ui";

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

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
