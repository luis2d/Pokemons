import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface Props extends PropsWithChildren {
  title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  
  const origin = (typeof window === "undefined") ? "" : window.location.origin

  return (
    <>
      <Head>
        <title>{title || "PokemonApp"} </title>
        <meta name="Author" content="Luis Salgado" />
        <meta name="Description" content={`Información sobre el pokemon ${title}`}/>
        <meta name="keywords" content={`${title}, pokemon , pokedex`} />
        <meta name="og:title" content={`Información sobre ${title}`} />
        <meta name="og:description" content={`Esta es la página sobre ${title}`}/>
        <meta name="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: "10 10",
        }}
      >
        {children}
      </main>
    </>
  );
};
